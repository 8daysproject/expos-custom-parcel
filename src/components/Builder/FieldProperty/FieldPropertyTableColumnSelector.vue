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
                <button
                  @click="setColumnProperties(column)"
                  :class="{
                    'bg-primary': column.checked,
                    'bg-tertiary': !column.checked
                  }"
                  :disabled="!column.checked"
                  class="px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
                >
                  Properties
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            typeof additionalFields !== 'undefined' &&
            typeof additionalFields.length !== 'undefined' &&
            additionalFields.length > 0
          "
        >
          <div class="pr-1 py-0.5">
            <b>Column Options</b>
          </div>

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

    <transition
      name="show-column-setting-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showColumnProperties"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div class="flex-grow">
          <div
            v-for="property in columnProperties"
            :key="property.name"
            class="grid grid-cols-2"
          >
            <div class="pr-1 py-0.5">{{ property.label }}</div>
            <div class="pr-1 py-0.5">
              <select
                v-if="property.options"
                v-model="currentColumn[property.name]"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              >
                <option
                  v-for="option in property.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <input
                v-else
                v-model="currentColumn[property.name]"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="pt-2 text-center">
          <button
            @click="showColumnProperties = false"
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
  emits: {
    change: null
  },
  props: {
    configuration: {
      type: Object,
      default: function () {
        return {
          additionalFields: [],
          additionalColumnAttributes: []
        };
      }
    },
    fieldProperty: String,
    properties: Object,
    table: String
  },
  data: function () {
    return {
      columnProperties: [
        {
          label: "Alias",
          name: "alias"
        }
      ],
      currentColumn: null,
      showAdd: false,

      showColumnProperties: false,

      sourceDatabase: {
        tables: [],
        table: "",
        columns: [],
        labelColumn: "",
        valueColumn: ""
      }
    };
  },
  computed: {
    additionalColumnAttributes: function () {
      const self = this;
      let addditional_column_attributes = [];

      if (
        typeof self.configuration.additionalColumnAttributes !== "undefined"
      ) {
        addditional_column_attributes =
          self.configuration.additionalColumnAttributes;
      }

      return addditional_column_attributes;
    },
    additionalFields: function () {
      const self = this;
      let addditional_items = [];

      if (typeof self.configuration.additionalFields !== "undefined") {
        addditional_items = self.configuration.additionalFields;
      }

      return addditional_items;
    }
  },
  mounted: function () {
    this.initializeItems(true);
  },
  methods: {
    changeSource: function () {
      this.initializeItems(false);
      this.add();
    },
    setColumnProperties: function (column) {
      const self = this;

      for (const key in self.columnProperties) {
        if (Object.hasOwnProperty.call(self.columnProperties, key)) {
          const attribute = self.columnProperties[key];

          if (
            typeof column[attribute.name] === "undefined" &&
            typeof attribute.value !== "undefined"
          ) {
            column[attribute.name] = attribute.value;
          }
        }
      }

      self.showColumnProperties = true;
      self.currentColumn = column;
    },
    initializeItems: function (is_check_source) {
      const self = this;

      if (is_check_source) {
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

            // TODO Why we have this checking?
            // if (table != self.table) {
            self.sourceDatabase.tables.push(table);
            // }
          }

          if (self.sourceDatabase.table === "") {
            self.sourceDatabase.table = self.sourceDatabase.tables[0];
          }

          self.changeTableColumns();
        });

        for (let index = 0; index < self.additionalFields.length; index++) {
          const field = self.additionalFields[index];

          if (
            typeof self.properties[self.fieldProperty] !== "undefined" &&
            typeof self.properties[self.fieldProperty][field.name] !==
              "undefined"
          ) {
            field.value = self.properties[self.fieldProperty][field.name];
          }
        }

        self.columnProperties.splice(1);

        for (
          let index = 0;
          index < self.additionalColumnAttributes.length;
          index++
        ) {
          const attribute = self.additionalColumnAttributes[index];

          self.columnProperties.push(attribute);
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
          columns.push(Object.assign({}, column));
        }
      }

      value.table = self.sourceDatabase.table;
      value.columns = columns;

      for (let index = 0; index < self.additionalFields.length; index++) {
        const field = self.additionalFields[index];

        value[field.name] = field.value;
      }

      self.$emit("change", self.fieldProperty, value);
    }
  }
};
</script>
