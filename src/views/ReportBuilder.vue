<template>
  <div class="mx-4 mb-4 overflow-hidden relative">
    <div class="flex">
      <div class="flex-grow pr-2">
        <option-drop-down
          @option-change="tableChange"
          :items="tables"
          :value="selectedTable"
          label="Table"
        ></option-drop-down>
      </div>
      <div class="mt-auto">
        <button
          @click="save"
          class="bg-primary px-3 py-1.5 rounded-sm text-white w-full"
        >
          Save
        </button>
      </div>
    </div>
    <hr class="border-top border-gray-300 my-4" />
    <div class="pb-2">
      <div class="flex">
        <div class="flex-grow">
          <input
            v-model="report.name"
            class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-2xl w-full"
            placeholder="Report Name"
            type="text"
          />
        </div>
        <div class="pl-2"></div>
      </div>
    </div>
    <div class="flex pb-2">
      <div v-for="(container, index) in containers" :key="container.name">
        <div class="pr-2">
          <button
            @click="
              selectedContainer = index;
              setSelect();
            "
            class="bg-primary px-3 py-1.5 rounded-sm text-white text-base w-full"
          >
            {{ container.label }}
          </button>
        </div>
      </div>
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
                    @remove="
                      removeItem(
                        index,
                        row_index,
                        column_index,
                        column.db_column_index
                      )
                    "
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
      </template>
      <!-- Is table attribute needed? -->
      <div class="flex-grow-0 flex-shrink-0 text-sm w-60 overflow-hidden">
        <field-properties-panel
          @change="changeFieldProperties"
          @close="setSelect"
          :table="selectedTable"
          :properties="selectedColumn"
        ></field-properties-panel>
        <filter-element-panel
          @dragstart="startDragElement"
          :columns="columns"
          :hidden="selectedContainer !== 0"
        ></filter-element-panel>
        <div>
          <report-element-panel
            @dragstart="startDragElement"
          ></report-element-panel>
        </div>
      </div>
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
import ReportElementPanel from "@/components/Builder/Panel/ReportElementPanel.vue";
import FilterElementPanel from "@/components/Builder/Panel/FilterElementPanel.vue";

import EmptyColumnPlaceholder from "@/components/AppBuilder/EmptyColumnPlaceholder.vue";
import Field from "@/components/ReportBuilder/Field.vue";

import OptionDropDown from "@/components/AppBuilder/OptionDropDown.vue";

import AppPreview from "@/components/AppBuilder/AppPreview.vue";

import ReportBuilder from "@/assets/js/ReportBuilder";
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  components: {
    // TopPanel,
    EmptyColumnPlaceholder,
    Field,
    FieldPropertiesPanel,
    ReportElementPanel,
    AppPreview,
    OptionDropDown,
    FilterElementPanel
  },
  // name: "Report",
  data: function () {
    return {
      report: { name: "", table: "" },

      tables: [],

      isEdit: false,
      selectedTable: null,
      columns: [],
      // selectedPrimaryKey: "-",
      containers: [],
      selectedContainer: 0,
      selectedColumn: {},
      dragColumn: {},
      isPreviewShown: false
    };
  },
  props: {},
  mounted: function () {
    const self = this;

    AppBuilder.getTables().then(function (data) {
      self.tables.splice(0);

      console.log("TAB", data);

      for (let i = 0; i < data.length; i++) {
        const table = data[i];
        self.tables.push(table);
      }

      if (data.length > 0) {
        self.selectedTable = data[0];
        AppBuilder.getTableColumns(self.selectedTable).then(function (data) {
          self.columns.splice(0);

          for (let i = 0; i < data.length; i++) {
            const element = data[i];

            self.columns.push({ name: element, is_added: false });
          }
        });
      }

      // self.getTableColumns();

      // self.$emit("tablesChange", self.tables);
    });

    if (self.$route.params.name !== "") {
      ReportBuilder.get(self.$route.params.name, true).then(function (report) {
        console.log("REPORT", report);
        self.report = report;
        self.isEdit = true; // Not working
        // self.selectedTable = report.table;
        // self.selectedPrimaryKey = report.pk;

        self.clearItems();
      });
    } else {
      self.clearItems();
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
          // element.element = this.dragColumn.element;
          // element.content = this.dragColumn.content;
          // element.contenteditable = "true";

          for (const key in this.dragColumn) {
            if (Object.hasOwnProperty.call(this.dragColumn, key)) {
              const property = this.dragColumn[key];

              element[key] = property;
            }
          }

          console.log("NEW EL", this.dragColumn);
        } else {
          console.log("SAVED EL", saved_element);
          element = saved_element;
        }
      }

      if (typeof row !== "undefined" && typeof column !== "undefined") {
        /* Insert into current row and column */

        container.rows[row].columns.splice(column, 0, element);

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
          columns: [element],
          showEmptyColumn: false
        });

        container.showEmptyRowPlaceholder = false;
      }

      this.removeEmptyPlaceholder();

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
    removeItem: function (container, row, column, db_column_index) {
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

      if (typeof db_column_index !== "undefined") {
        this.columns.splice(db_column_index, 1, {
          name: this.columns[db_column_index].name,
          is_added: false
        });
      }
    },
    clearItems: function () {
      const self = this;

      console.log("ITEM CLEAR", self.isEdit);

      // TODO Optimize this
      if (!this.isEdit) {
        this.selectedColumn = {};

        this.containers.splice(
          0,
          2,
          {
            label: "Filters",
            name: "filters",
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
          },
          {
            label: "Report",
            name: "report",
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
          }
        );
      } else {
        for (let index = 0; index < self.report.columns.length; index++) {
          const column = self.report.columns[index];

          if (typeof self.containers[column.container] === "undefined") {
            self.containers[column.container] = {
              label: self.report.containers[column.container].label,
              name: self.report.containers[column.container].name,
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

                // TODO Move selectedContainer to addElement
                self.selectedContainer = column.container;
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

            // TODO Move selectedContainer to addElement
            self.selectedContainer = column.container;
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

      console.log("TC", table_name);

      self.selectedTable = table_name;

      AppBuilder.getTableColumns(self.selectedTable).then(function (data) {
        self.columns.splice(0);

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          self.columns.push({ name: element, is_added: false });
        }
      });

      if (!self.isEdit) {
        self.report.name = result.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    },
    save: function () {
      const self = this;

      let containers = [];
      let rows = [];
      let columns = [];

      let report = {
        name: self.report.name,
        slug: slugify(self.report.name, { lower: true })
        // table: self.selectedTable,
        // pk: self.selectedPrimaryKey
        // containers: []
      };

      for (
        let container_index = 0;
        container_index < self.containers.length;
        container_index++
      ) {
        const container = self.containers[container_index];

        console.log("CONT", container, self.containers);

        containers.push({
          label: container.label,
          name: container.name
        });

        for (
          let row_index = 0;
          row_index < container.rows.length;
          row_index++
        ) {
          const row = container.rows[row_index];

          rows.push({
            name: row.name
          });

          for (let index = 0; index < row.columns.length - 1; index++) {
            const column = row.columns[index];

            let saved_column = ReportBuilder.stripFieldProperties(column);

            saved_column.container = container_index;
            saved_column.row = row_index;
            saved_column.column = index;

            columns.push(saved_column);
          }
        }
      }

      report.containers = containers;
      report.rows = rows;
      report.columns = columns;

      ReportBuilder.save(report).then(function () {
        self.$router.push("/reportbuilder/view");
      });
    }
  }
};
</script>
