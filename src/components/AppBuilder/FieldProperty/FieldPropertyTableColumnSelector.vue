<template>
  <div :class="{ 'h-28': showAdd }">
    <button
      @click="add"
      class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
      href="javascript:;"
    >
      <i class="fas fa-plus"></i> Select
    </button>
    <transition
      name="show-add-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showAdd"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div class="flex-grow">
          <!-- <div class="grid grid-cols-2"> -->
          <div class="pr-1 py-0.5"><b>Table</b></div>
          <div class="py-0.5">
            <select
              v-model="sourceDatabase.table"
              @change="changeTableColumns"
              class="bg-white border border-primary outline-none rounded-sm w-full"
            >
              <option
                v-for="table in sourceDatabase.tables"
                :key="table"
                :value="table"
              >
                {{ table }}
              </option>
            </select>
          </div>
          <!-- </div> -->
          <div>
            <div class="pr-1 py-0.5"><b>Columns</b></div>
            <div
              v-for="column in sourceDatabase.columns"
              :key="column"
              class="grid grid-cols-2"
            >
              <div class="pr-1 py-0.5">
                <label class="block truncate">
                  <input
                    v-model="column.checked"
                    type="checkbox"
                    :value="column"
                  />
                  {{ column.name }}
                </label>
              </div>
              <div class="py-0.5">
                <input
                  v-if="column.checked"
                  v-model="column.alias"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                  placeholder="Alias"
                  type="text"
                />
                <input
                  v-else
                  class="border border-tertiary outline-none px-1 py-0.5 rounded-sm w-full"
                  disabled
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="pr-1 py-0.5"><b>Column Options</b></div>

          <div
            v-for="field in configuration.additionalFields"
            :key="field.name"
            class="grid grid-cols-2"
          >
            <div class="pr-1 py-0.5">{{ field.label }}</div>
            <div class="pr-1 py-0.5">
              <select
                v-model="field.value"
                class="bg-white border border-primary outline-none rounded-sm w-full"
              >
                <option
                  v-for="column in sourceDatabase.columns"
                  :key="column.name"
                  :value="column.name"
                >
                  {{ column.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="pt-2 text-center">
          <button
            @click="showAdd = false"
            class="bg-red-600 mr-2 rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-times"></i> Cancel
          </button>
          <button
            @click="save"
            class="bg-primary rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-check"></i> Save
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "FieldPropertyTableColumnSelector",
  data: function () {
    return {
      showAdd: false,
      // sourceTypes: [
      //   {
      //     label: "Static",
      //     value: "static"
      //   },
      //   {
      //     label: "From Database",
      //     value: "db"
      //   }
      // ],

      sourceDatabase: {
        tables: [],
        table: "",
        columns: [],
        labelColumn: "",
        valueColumn: ""
      }
    };
  },
  props: {
    configuration: {
      type: Object,
      default: function () {
        return { fields: [] };
      }
    },
    fieldProperty: String,
    properties: Object,
    table: String
  },
  mounted: function () {
    this.initializeItems(true);
  },
  unmounted: function () {
    console.log("UNMOUNTED");
  },
  watch: {
    properties: function () {
      this.showAdd = false;

      this.initializeItems(true);
    }
  },
  // computed: {
  //   items: function () {
  //     return false;
  //   }
  // },
  methods: {
    changeSource: function () {
      this.initializeItems(false);
      this.add();
    },
    initializeItems: function (is_check_source) {
      if (is_check_source) {
        const self = this;

        if (
          typeof this.properties[self.fieldProperty] !== "undefined" &&
          typeof this.properties[self.fieldProperty].table !== "undefined"
        ) {
          this.sourceDatabase.table =
            this.properties[this.fieldProperty]["table"];
        }

        AppBuilder.getTables().then(function (data) {
          self.sourceDatabase.tables.splice(0);

          for (let i = 0; i < data.length; i++) {
            const table = data[i];

            if (table != self.table) {
              self.sourceDatabase.tables.push(table);
            }
          }

          if (self.sourceDatabase.table === "") {
            self.sourceDatabase.table = self.sourceDatabase.tables[0];
          }

          self.changeTableColumns();
        });

        for (
          let index = 0;
          index < self.configuration.additionalFields.length;
          index++
        ) {
          const field = self.configuration.additionalFields[index];

          if (
            typeof self.properties[self.fieldProperty] !== "undefined" &&
            typeof self.properties[self.fieldProperty][field.name] !==
              "undefined"
          ) {
            field.value = self.properties[self.fieldProperty][field.name];
          }
        }
      }
    },
    changeTableColumns: function () {
      const self = this;

      AppBuilder.getTableColumns(self.sourceDatabase.table).then(function (
        data
      ) {
        self.sourceDatabase.columns.splice(0);

        for (let i = 0; i < data.length; i++) {
          let current_column = [];

          if (typeof self.properties[self.fieldProperty] !== "undefined") {
            current_column = self.properties[self.fieldProperty].columns.filter(
              function (item) {
                return item.name == data[i];
              }
            );
          }

          if (current_column.length === 1) {
            self.sourceDatabase.columns.push({
              alias: current_column[0].alias,
              checked: true,
              name: current_column[0].name
            });
          } else {
            self.sourceDatabase.columns.push({
              alias: data[i],
              checked: false,
              name: data[i]
            });
          }
        }
      });
    },
    add: function () {
      this.showAdd = true;
    },
    save: function () {
      const self = this;

      let columns = [];
      let value = {};

      self.showAdd = false;

      for (let index = 0; index < self.sourceDatabase.columns.length; index++) {
        const column = self.sourceDatabase.columns[index];

        if (column.checked) {
          columns.push({
            alias: column.alias,
            name: column.name,
            searchable: true // TODO Add checkbox later for this option
          });
        }
      }

      value.table = self.sourceDatabase.table;
      value.columns = columns;

      for (
        let index = 0;
        index < self.configuration.additionalFields.length;
        index++
      ) {
        const field = self.configuration.additionalFields[index];

        value[field.name] = field.value;
      }

      self.$emit("change", self.fieldProperty, value);
    }
  }
};
</script>
