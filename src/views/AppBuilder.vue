<template>
  <div class="mx-4 mb-4 overflow-hidden relative">
    <top-panel
      @columns-change="
        columns = $event;
        clearItems();
      "
      @primary-key-change="selectedPrimaryKey = $event"
      @preview="showPreview"
      @save="save"
      @selected-table-change="tableChange"
      :table="selectedTable"
      :pk="selectedPrimaryKey"
      :edit="isEdit"
    ></top-panel>
    <hr class="border-top border-gray-300 my-4" />
    <div class="pb-2">
      <!-- <div class="text-2xl">
        {{ app }}
        <a class="text-sm"><i class="fa fa-pencil"></i> Change App Name</a>
      </div> -->
      <input
        v-model="app.name"
        class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-2xl w-full"
        type="text"
      />
    </div>
    <div class="flex">
      <template v-for="(container, index) in containers" :key="container.name">
        <div
          v-if="index == selectedContainer"
          class="flex-grow flex-shrink mr-4"
        >
          <div
            @dragenter.self="containerDragEnter(container)"
            class="border border-gray-300 px-2 py-4 rounded"
          >
            <div
              v-for="(row, row_index) in container.rows"
              @dragenter="rowDragEnter($event, row)"
              @dragleave="rowDragLeave($event, row)"
              @dragover.prevent
              :class="'grid-cols-' + row.grid"
              :key="row_index"
              class="grid gap-0"
            >
              <template
                v-for="(column, column_index) in row.columns"
                :key="column_index"
              >
                <div
                  v-if="column.type == 'empty' && row.showEmptyColumn"
                  class="content-center flex items-center px-2 py-1 rounded-sm text-primary"
                >
                  <empty-column-placeholder
                    @add-element="addElement"
                    :column="column_index"
                    :element="dragColumn.name"
                    :row="row_index"
                  ></empty-column-placeholder>
                </div>
                <div v-if="column.type != 'empty'">
                  <field
                    @blur="setFocus()"
                    @focus="setFocus(index, row_index, column_index)"
                    @remove="removeItem(index, row_index, column_index, column)"
                    @select="setSelect(index, row_index, column_index)"
                    @switch-column="switchColumn"
                    :builder="true"
                    :column="column_index"
                    :focus="column.is_focused"
                    :label="column.label"
                    :properties="column"
                    :row="row_index"
                    :select="column.is_selected"
                  ></field>
                </div>
              </template>
            </div>
            <div>
              <div
                v-if="
                  (container.rows.length == 1 &&
                    container.rows[0].columns.length == 1) ||
                  (container.rows[container.rows.length - 1].grid > 0 &&
                    container.showEmptyRowPlaceholder)
                "
                class="content-center flex items-center px-2 py-3 rounded-sm text-primary"
              >
                <empty-column-placeholder
                  @add-element="addElement"
                  :element="dragColumn.name"
                ></empty-column-placeholder>
              </div>
            </div>
          </div>
        </div>
        <!-- Is table attribute needed? -->
        <div class="flex-grow-0 flex-shrink-0 text-sm w-60 overflow-hidden">
          <field-properties-panel
            @change="changeFieldProperties"
            @close="setSelect"
            :containers="containers"
            :table="selectedTable"
            :properties="selectedColumn"
          ></field-properties-panel>
          <div class="mb-2">
            <div class="bg-primary p-1.5 font-bold text-white rounded-t">
              Database Fields
            </div>
            <div class="border border-primary">
              <div
                v-for="(column, index) in columns"
                @dragend.self="endDrag"
                @dragstart.self="startDrag($event, index)"
                :class="{ 'select-none': column.is_added }"
                :draggable="column.is_added ? 'false' : 'true'"
                :key="column.name"
                class="cursor-move px-2 py-0.5"
              >
                <div
                  :class="{
                    'text-gray-200': column.is_added
                  }"
                >
                  <i class="fas fa-database"></i> {{ column.name }}
                  <span v-if="column.name == selectedPrimaryKey">
                    <i class="fas fa-key text-xs"></i>
                  </span>
                </div>
              </div>
            </div>
            <!-- <database-field-element-panel
              :table="selectedTable"
            ></database-field-element-panel> -->
          </div>
          <div>
            <html-element-panel
              @dragstart="startDragElement"
            ></html-element-panel>
          </div>
        </div>
      </template>
    </div>
    <app-preview
      @close="isPreviewShown = false"
      :containers="containers"
      :show="isPreviewShown"
    ></app-preview>
  </div>
</template>

<script>
import slugify from "slugify";

import FieldPropertiesPanel from "@/components/Builder/Panel/FieldPropertiesPanel.vue";
import HtmlElementPanel from "@/components/Builder/Panel/HtmlElementPanel.vue";

import TopPanel from "@/components/AppBuilder/TopPanel.vue";
import EmptyColumnPlaceholder from "@/components/AppBuilder/EmptyColumnPlaceholder.vue";
import Field from "@/components/AppBuilder/Field.vue";

import AppPreview from "@/components/AppBuilder/AppPreview.vue";
import AppBuilder from "@/assets/js/AppBuilder";

export default {
  components: {
    TopPanel,
    EmptyColumnPlaceholder,
    Field,
    FieldPropertiesPanel,
    HtmlElementPanel,
    AppPreview
  },
  name: "App",
  data: function () {
    return {
      app: { name: "App Name" },
      isEdit: false,
      // tables: [],
      selectedTable: null,
      columns: [],
      selectedPrimaryKey: "-",
      // containerTypes: ["Single Container", "Tabs", "Accordion"],
      // selectedContainerType: "Single Container",
      containers: [],
      selectedContainer: 0,
      // selectedDatabaseColumn: null,
      selectedColumn: {},
      dragColumn: {},
      isPreviewShown: false
    };
  },
  props: {},
  mounted: function () {
    const self = this;

    if (self.$route.params.name !== "") {
      AppBuilder.get(self.$route.params.name, true).then(function (app) {
        self.app = app;
        self.isEdit = true; // Not working
        self.selectedTable = app.table;
        self.selectedPrimaryKey = app.pk;

        // for (let index = 0; index < app.columns.length; index++) {
        //   const column = app.columns[index];

        //   self.dragColumn.type = "db";

        //   // self.addElement(column.row, column.column);

        //   console.log(column.row, column.column);

        //   // self.addElement(column.row, column.column);

        //   for (
        //     let current_column_index = 0;
        //     current_column_index < self.columns.length;
        //     current_column_index++
        //   ) {
        //     const current_column = self.columns[current_column_index];

        //     console.log(column.name, current_column.name);

        //     // if
        //   }
        // }

        // self.containers.splice(0);

        // for (let index = 0; index < app.containers.length; index++) {
        //   const container = app.containers[index];

        //   self.containers.push(container);
        // }
      });
    } else {
      self.isEdit = false; // Not working
      self.selectedTable = "";
    }
  },
  computed: {},
  methods: {
    startDrag: function ($event, index) {
      // $event.dataTransfer.setData("index", index);

      this.dragColumn = {
        index: index,
        name: this.columns[index].name,
        type: "db"
      };

      // remove later
      // this.selectedDatabaseColumn = this.columns[index].name;
    },
    endDrag: function () {
      this.dragColumn = {};

      this.removeEmptyPlaceholder();

      // check later
      this.containers[this.selectedContainer].showEmptyRowPlaceholder = false;

      // remove later
      // this.selectedDatabaseColumn = null;
    },
    startDragElement: function ($event, element) {
      // console.log(element);
      this.dragColumn = element;
    },
    // onDrop: function (row, column) {
    //   console.log("ON DROP", row, column);
    //   // const index = $event.dataTransfer.getData("index");
    //   const container = this.containers[this.selectedContainer];

    //   let element = {
    //     is_focused: false,
    //     is_selected: false
    //   };

    //   if (this.dragColumn.type == "db") {
    //     const index = this.dragColumn.index;

    //     element.db_column_index = index;
    //     element.label = this.columns[index].name;
    //     element.name = this.columns[index].name;
    //     element.placeholder = "";
    //     element.type = "text";

    //     this.columns.splice(index, 1, {
    //       name: this.columns[index].name,
    //       is_added: true
    //     });
    //   } else {
    //     element.tag = this.dragColumn.tag;
    //   }

    //   if (typeof row !== "undefined" && typeof column !== "undefined") {
    //     /* Insert into current row and column */
    //     // container.rows[row].columns.splice(column, 0, {
    //     //   db_column_index: index,
    //     //   is_focused: false,
    //     //   is_selected: false,
    //     //   label: this.columns[index].name,
    //     //   name: this.columns[index].name,
    //     //   placeholder: "",
    //     //   type: "text"
    //     // });

    //     container.rows[row].columns.splice(column, 0, element);

    //     container.rows[row].showEmptyColumn = false;
    //   } else {
    //     console.log(container);
    //     /* Remove first row if first row is empty  */
    //     if (container.rows[0].grid == 0) {
    //       container.rows.pop();
    //     }

    //     /* Create new row and add element */
    //     container.rows.push({
    //       name: "default",
    //       index: container.rows.length,
    //       grid: 0,
    //       columns: [
    //         // {
    //         //   db_column_index: index,
    //         //   is_focused: false,
    //         //   is_selected: false,
    //         //   label: this.columns[index].name,
    //         //   name: this.columns[index].name,
    //         //   placeholder: "",
    //         //   type: "text"
    //         // }
    //         element
    //       ],
    //       showEmptyColumn: false
    //     });

    //     container.showEmptyRowPlaceholder = false;
    //   }

    //   this.removeEmptyPlaceholder();

    //   // this.columns.splice(index, 1, {
    //   //   name: this.columns[index].name,
    //   //   is_added: true
    //   // });

    //   console.log("drop end", this.containers);
    // },
    containerDragEnter: function (container) {
      container.showEmptyRowPlaceholder = true;
      this.removeEmptyPlaceholder();
    },
    containerDragLeave: function (container) {
      container.showEmptyRowPlaceholder = false;
    },
    rowDragEnter: function ($event, row) {
      console.log("row enter", row.grid);
    },
    rowDragLeave: function ($event, row) {
      console.log("row leave", row);
      row.showEmptyRowPlaceholder = false;
    },
    addElement: function (row, column, saved_element) {
      console.log("ADD ELEMENT", this.dragColumn.type);

      const container = this.containers[this.selectedContainer];
      // const index = this.dragColumn.index;

      let element = {
        is_focused: false,
        is_selected: false
      };

      if (this.dragColumn.type == "db") {
        const index = this.dragColumn.index;

        if (typeof saved_element === "undefined") {
          element.db_column_index = index;
          element.element = "input";
          element.label = this.columns[index].name;
          element.name = this.columns[index].name;
          element.placeholder = "";
          element.type = "text";
        } else {
          element = saved_element;
        }

        this.columns.splice(index, 1, {
          name: this.columns[index].name,
          is_added: true
        });
      } else {
        if (typeof saved_element === "undefined") {
          element.element = this.dragColumn.element;
          element.content = this.dragColumn.content;
          element.contenteditable = "true";
        } else {
          console.log("SAVED EL", saved_element);
          element = saved_element;
        }
      }

      if (typeof row !== "undefined" && typeof column !== "undefined") {
        /* Insert into current row and column */

        // console.log("CONTAINER ROWS", container);
        // console.log("ROWS", container.rows);
        // console.log("ROWS[ROW]", row, container.rows[row]);

        // if (typeof container.rows[row] === "undefined") {
        //   container.rows.push({
        //     name: "default",
        //     grid: 0,
        //     columns: [
        //       {
        //         type: "empty"
        //       }
        //     ],
        //     showEmptyColumn: false
        //   });
        // }

        container.rows[row].columns.splice(
          column,
          0,
          element
          // {
          //   db_column_index: index,
          //   is_focused: false,
          //   is_selected: false,
          //   label: this.columns[index].name,
          //   name: this.columns[index].name,
          //   placeholder: "",
          //   type: "text"
          // }
        );

        container.rows[row].showEmptyColumn = false;
      } else {
        /* Remove first row if first row is empty  */
        if (container.rows[0].grid == 0) {
          container.rows.pop();
        }

        /* Create new row and add element */
        container.rows.push({
          name: "default",
          index: container.rows.length,
          grid: 0,
          columns: [
            element
            // {
            //   db_column_index: index,
            //   is_focused: false,
            //   is_selected: false,
            //   label: this.columns[index].name,
            //   name: this.columns[index].name,
            //   placeholder: "",
            //   type: "text"
            // }
          ],
          showEmptyColumn: false
        });

        container.showEmptyRowPlaceholder = false;
      }

      this.removeEmptyPlaceholder();

      // this.columns.splice(index, 1, {
      //   name: this.columns[index].name,
      //   is_added: true
      // });

      console.log("drop end", this.containers);
    },
    switchColumn: function (row_index, column_index) {
      const container = this.containers[this.selectedContainer];
      const row = this.containers[this.selectedContainer].rows[row_index];
      const column = row.columns[column_index];

      if (typeof this.dragColumn.name === "undefined") {
        return;
      }

      this.setFocus();

      row.showEmptyColumn = true;
      row.grid = row.columns.length;

      if (column.type !== "empty") {
        container.showEmptyRowPlaceholder = false;

        /* Remove empty column placeholder */
        this.removeEmptyPlaceholder(row_index);

        /* Move empty column placeholder */
        row.columns.splice(column_index, 0, {
          type: "empty"
        });
      }
    },
    columnDragLeave: function ($event, row, column) {
      this.removeEmptyPlaceholder();

      console.log("leaved", column, $event, row.columns.length);
    },
    removeItem: function (container, row, column, item) {
      // console.log("REM", db_column_index);

      if (
        this.selectedColumn ===
        this.containers[container].rows[row].columns[column]
      ) {
        this.selectedColumn = {};
      }

      this.containers[container].rows[row].columns.splice(column, 1);

      /* Remove row if no column */
      if (
        this.containers[container].rows[row].columns.length === 1 &&
        this.containers[container].rows.length != 1
      ) {
        this.containers[container].rows.splice(row, 1);
        this.containers[container].showEmptyRowPlaceholder = false;
        console.log(this.containers[container]);
      } else {
        this.containers[container].rows[row].grid =
          this.containers[container].rows[row].columns.length - 1;
      }

      if (typeof item.db_column_index !== "undefined") {
        for (let index = 0; index < this.columns.length; index++) {
          const current_item = this.columns[index];

          if (current_item.name === item.name) {
            this.columns.splice(index, 1, {
              name: this.columns[index].name,
              is_added: false
            });

            break;
          }
        }
      }
    },
    clearItems: function () {
      const self = this;

      console.log("ITEM CLEAR", self.isEdit);

      // Optimize this
      if (!this.isEdit) {
        this.selectedColumn = {};

        this.containers.splice(0, 1, {
          name: "default",
          rows: [
            {
              name: "default",
              grid: 0,
              columns: [
                {
                  type: "empty"
                }
              ],
              showEmptyColumn: false
            }
          ]
        });
      } else {
        // console.log("EDIR", self.app.columns);

        // console.log("app.columns", self.app.columns);

        for (let index = 0; index < self.app.columns.length; index++) {
          const column = self.app.columns[index];

          if (typeof self.containers[column.container] === "undefined") {
            self.containers[column.container] = {
              rows: []
            };
          }

          if (
            typeof self.containers[column.container].rows[column.row] ==
            "undefined"
          ) {
            self.containers[column.container].rows[column.row] = {
              name: "default",
              index: 1,
              grid: 0,
              columns: [],
              showEmptyColumn: false
            };
          }

          if (typeof column.db_column_index !== "undefined") {
            self.dragColumn.type = "db";

            for (
              let current_column_index = 0;
              current_column_index < self.columns.length;
              current_column_index++
            ) {
              const current_column = self.columns[current_column_index];

              if (column.name === current_column.name) {
                self.dragColumn = {
                  index: current_column_index,
                  name: column.name,
                  type: "db"
                };

                // if (typeof self.containers[column.container] === "undefined") {
                //   self.containers[column.container] = {
                //     rows: []
                //   };
                // }

                // if (
                //   typeof self.containers[column.container].rows[column.row] ==
                //   "undefined"
                // ) {
                //   self.containers[column.container].rows[column.row] = {
                //     name: "default",
                //     index: 1,
                //     grid: 0,
                //     columns: [],
                //     showEmptyColumn: false
                //   };
                // }

                self.addElement(column.row, column.column, column);

                break;
              }
            }
          } else {
            console.log("ELSE", column);

            self.dragColumn = {
              content: column.content, //  TODO Is this needed?
              element: column.element,
              name: column.name,
              type: "html" //  TODO Is this needed?
            };

            // self.dragColumn.content = "Grid";
            // self.dragColumn.element = "grid-input";
            // self.dragColumn.name = "Grid";
            // self.dragColumn.type = "html";

            self.addElement(column.row, column.column, column);
          }
        }
      }
    },
    removeEmptyPlaceholder: function (skip_row_index) {
      let self = this;

      self.containers.forEach(function (container) {
        container.rows.forEach(function (row, row_index) {
          row.columns.forEach(function (column, column_index) {
            if (column.type == "empty") {
              row.columns.splice(column_index, 1);
            }
          });

          if (row_index != skip_row_index) {
            row.columns.push({
              type: "empty"
            });

            row.grid = row.columns.length - 1;
            row.showEmptyColumn = false;
          }

          // console.log(
          //   "REMOVE EMPTY PLACEHOLDER",
          //   skip_row_index,
          //   self.containers
          // );
        });

        // container.showEmptyRowPlaceholder = false;
      });
    },
    setSelect: function (set_container, set_row, set_column) {
      let self = this;

      set_container = typeof set_container === "undefined" ? -1 : set_container;
      set_row = typeof set_row === "undefined" ? -1 : set_row;
      set_column = typeof set_column === "undefined" ? -1 : set_column;

      if (set_container == -1 && set_row == -1 && set_column == -1) {
        self.selectedColumn = {};
      }

      this.containers.forEach(function (container, container_index) {
        container.rows.forEach(function (row, row_index) {
          row.columns.forEach(function (column, column_index) {
            if (
              container_index == set_container &&
              row_index == set_row &&
              column_index == set_column
            ) {
              column.is_selected = !column.is_selected;

              if (column.is_selected) {
                self.selectedColumn = column;
              } else {
                self.selectedColumn = {};
              }
            } else {
              column.is_selected = false;
            }
          });
        });
      });
    },
    setFocus: function (set_container, set_row, set_column) {
      set_container = typeof set_container === "undefined" ? -1 : set_container;
      set_row = typeof set_row === "undefined" ? -1 : set_row;
      set_column = typeof set_column === "undefined" ? -1 : set_column;

      this.containers.forEach(function (container, container_index) {
        container.rows.forEach(function (row, row_index) {
          row.columns.forEach(function (column, column_index) {
            if (
              container_index == set_container &&
              row_index == set_row &&
              column_index == set_column
            ) {
              column.is_focused = true;
            } else {
              column.is_focused = false;
            }
          });
        });
      });
    },
    changeFieldProperties: function (property, value) {
      console.log("SET PROP", property, value);

      this.selectedColumn[property] = value;
    },
    showPreview: function () {
      this.isPreviewShown = true;
    },
    tableChange: function (table_name) {
      const self = this;
      const result = table_name.replace(/[-, _]/g, " ");

      self.selectedTable = table_name;

      if (!self.isEdit) {
        self.app.name = result.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    },
    save: function () {
      const self = this;
      // const skipped_attributes = [
      //   // "db_column_index",
      //   "is_focused",
      //   "is_selected"
      // ];

      let containers = [];
      let rows = [];
      let columns = [];

      // console.log(self.selectedTable);

      let app = {
        name: self.app.name,
        slug: slugify(self.app.name, { lower: true }),
        table: self.selectedTable,
        pk: self.selectedPrimaryKey
        // containers: []
      };

      for (
        let container_index = 0;
        container_index < self.containers.length;
        container_index++
      ) {
        const container = self.containers[container_index];

        containers.push({
          name: container.name
        });

        // app.containers[container_index] = {
        //   name: container.name,
        //   rows: []
        // };

        for (
          let row_index = 0;
          row_index < container.rows.length;
          row_index++
        ) {
          const row = container.rows[row_index];

          rows.push({
            name: row.name
          });

          // app.containers[container_index]["rows"][row_index] = {
          //   name: row.name,
          //   grid: row.grid,
          //   columns: []
          // };

          for (let index = 0; index < row.columns.length - 1; index++) {
            const column = row.columns[index];

            // let saved_column = {};
            let saved_column = AppBuilder.stripFieldProperties(column);

            // for (const key in column) {
            //   if (!skipped_attributes.includes(key)) {
            //     console.log("attr", key);
            //     saved_column[key] = column[key];
            //   }
            // }

            // AppBuilder.stripFieldProperties(column);

            saved_column.container = container_index;
            saved_column.row = row_index;
            saved_column.column = index;
            // saved_column.visible = true;
            // saved_column.grid = row.grid;

            // app.containers[container_index]["rows"][row_index].columns.push(
            //   saved_column
            // );

            columns.push(saved_column);
          }
        }
      }

      app.containers = containers;
      app.rows = rows;
      app.columns = columns;

      AppBuilder.save(app).then(function () {
        self.$router.push("/appbuilder/view");
      });
    }
  }
};
</script>
