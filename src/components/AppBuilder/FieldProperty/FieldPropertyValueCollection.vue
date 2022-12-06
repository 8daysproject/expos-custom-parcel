<template>
  <div :class="{ 'h-28': showAdd }">
    <button
      @click="add"
      class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
      href="javascript:;"
    >
      <i class="fas fa-plus"></i> Add Items
    </button>
    <transition
      name="show-add-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showAdd"
        class="absolute bg-white flex flex-col h-full left-0 p-2 top-0 w-full"
      >
        <div class="py-1">
          <select
            v-model="source"
            @change="changeSource"
            class="bg-white border border-primary outline-none rounded-sm w-full"
          >
            <option
              v-for="source_type in sourceTypes"
              :key="source_type.value"
              :value="source_type.value"
            >
              {{ source_type.label }}
            </option>
          </select>
        </div>
        <div v-if="source == 'static'" class="flex-grow">
          <textarea
            v-model="sourceStatic"
            class="border border-primary h-full outline-none p-1 rounded-sm w-full"
            placeholder="Add Items (One Per Line)"
          ></textarea>
        </div>
        <div v-else-if="source == 'static-label-value'" class="flex-grow">
          <div
            v-for="(item, item_index) in sourceStaticLabelValue"
            :key="item"
            class="flex"
          >
            <div class="grid grid-cols-2">
              <div class="pr-1 py-0.5">
                <input
                  v-model="item.label"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                  placeholder="Label"
                  type="text"
                />
              </div>
              <div class="pr-1 py-0.5">
                <input
                  v-model="item.value"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                  placeholder="Value"
                  type="text"
                />
              </div>
            </div>
            <div>
              <button
                @click="removeStaticLabelValueItem(item_index)"
                class="rounded-full text-white px-2 py-1"
                :class="{
                  'bg-primary': item_index !== 0,
                  'bg-tertiary': item_index === 0
                }"
                :disabled="item_index === 0"
              >
                <i class="mdi mdi-minus"></i>
              </button>
            </div>
          </div>

          <div class="py-2 text-center">
            <!-- <button class="bg-primary rounded-sm text-white px-2 py-1">
              <i class="mdi mdi-plus"></i> Add
            </button> -->
            <button
              @click="addStaticLabelValueItem"
              class="rounded-full text-white px-2 py-1"
              :class="{
                'bg-primary': isAbleToAddStaticLabelValueItem,
                'bg-tertiary': !isAbleToAddStaticLabelValueItem
              }"
              :disabled="!isAbleToAddStaticLabelValueItem"
            >
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
        <div v-else-if="source == 'db'" class="flex-grow">
          <div class="grid grid-cols-2">
            <div class="pr-1 py-0.5">Table</div>
            <div class="pl-1 py-0.5">
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
            <div v-if="configuration.hideLabel !== true" class="pr-1 py-0.5">
              Label
            </div>
            <div v-if="configuration.hideLabel !== true" class="pl-1 py-0.5">
              <select
                v-model="sourceDatabase.labelColumn"
                class="bg-white border border-primary outline-none rounded-sm w-full"
              >
                <option
                  v-for="column in sourceDatabase.columns"
                  :key="column"
                  :value="column"
                >
                  {{ column }}
                </option>
              </select>
            </div>
            <div class="pr-1 py-0.5">Value</div>
            <div class="pl-1 py-0.5">
              <select
                v-model="sourceDatabase.valueColumn"
                class="bg-white border border-primary outline-none rounded-sm w-full"
              >
                <option
                  v-for="column in sourceDatabase.columns"
                  :key="column"
                  :value="column"
                >
                  {{ column }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-else class="flex-grow">
          <input type="text" class="border border-primary rounded-sm w-full" />
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
  name: "FieldPropertyValueCollection",
  data: function () {
    return {
      showAdd: false,
      sourceTypes: [
        {
          label: "Static",
          value: "static"
        },
        {
          label: "Static Label Value Pair",
          value: "static-label-value"
        },
        {
          label: "From Database",
          value: "db"
        }
      ],
      source: "static",
      sourceStatic: "",
      sourceStaticLabelValue: [{ label: "", value: "" }],
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
        return { hideLabel: false };
      },
      validator: function (value) {
        console.log("VALIDATION", value);

        if (typeof value.hideLabel === "undefined") {
          return false;
        }

        return true;
      }
    },
    fieldProperty: String,
    properties: Object,
    table: String
  },
  mounted: function () {
    this.initializeItems(true);
  },
  watch: {
    properties: function () {
      this.showAdd = false;

      this.initializeItems(true);
    }
  },
  computed: {
    isAbleToAddStaticLabelValueItem: function () {
      const self = this;

      if (
        self.sourceStaticLabelValue[self.sourceStaticLabelValue.length - 1]
          .label !== "" &&
        self.sourceStaticLabelValue[self.sourceStaticLabelValue.length - 1]
          .value !== ""
      ) {
        return true;
      }

      return false;
    }
  },
  methods: {
    addStaticLabelValueItem: function () {
      const self = this;

      if (
        self.sourceStaticLabelValue[self.sourceStaticLabelValue.length - 1]
          .label !== "" &&
        self.sourceStaticLabelValue[self.sourceStaticLabelValue.length - 1]
          .value !== ""
      ) {
        self.sourceStaticLabelValue.push({ label: "", value: "" });
      }
    },
    changeSource: function () {
      this.initializeItems(false);
      this.add();
    },
    initializeItems: function (is_check_source) {
      const self = this;

      if (is_check_source) {
        this.source =
          typeof this.properties[self.fieldProperty] === "undefined" ||
          typeof this.properties[self.fieldProperty].source === "undefined"
            ? "static"
            : this.properties[self.fieldProperty].source;
      }

      switch (this.source) {
        case "db":
          if (
            typeof this.properties[self.fieldProperty] !== "undefined" &&
            typeof this.properties[self.fieldProperty].table !== "undefined"
          ) {
            this.sourceDatabase.table =
              this.properties[this.fieldProperty]["table"];
            this.sourceDatabase.labelColumn =
              this.properties[self.fieldProperty].label_column;
            this.sourceDatabase.valueColumn =
              this.properties[self.fieldProperty].value_column;
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

          break;
        case "static-label-value":
          if (
            typeof this.properties[self.fieldProperty] !== "undefined" &&
            typeof this.properties[self.fieldProperty].value !== "undefined"
          ) {
            self.sourceStaticLabelValue.splice(0);

            for (
              let index = 0;
              index < self.properties[self.fieldProperty].value.length;
              index++
            ) {
              const item = self.properties[self.fieldProperty].value[index];

              this.sourceStaticLabelValue.push({
                label: item.label,
                value: item.value
              });
            }
          }

          break;
        case "static":
        default:
          if (
            typeof this.properties[self.fieldProperty] !== "undefined" &&
            typeof this.properties[self.fieldProperty].value !== "undefined"
          ) {
            this.sourceStatic = this.properties[self.fieldProperty].value
              .map(function (item) {
                return item.value;
              })
              .join("\r\n");
          }

          break;
      }
    },
    changeTableColumns: function () {
      const self = this;

      AppBuilder.getTableColumns(self.sourceDatabase.table).then(function (
        data
      ) {
        self.sourceDatabase.columns.splice(0);

        for (let i = 0; i < data.length; i++) {
          self.sourceDatabase.columns.push(data[i]);
        }

        if (
          !self.sourceDatabase.columns.includes(self.sourceDatabase.labelColumn)
        ) {
          self.sourceDatabase.labelColumn = self.sourceDatabase.columns[0];
        }

        if (
          !self.sourceDatabase.columns.includes(self.sourceDatabase.valueColumn)
        ) {
          self.sourceDatabase.valueColumn = self.sourceDatabase.columns[0];
        }
      });
    },
    add: function () {
      this.showAdd = true;
    },
    removeStaticLabelValueItem: function (index) {
      const self = this;

      if (index !== 0) {
        self.sourceStaticLabelValue.splice(index, 1);
      }
    },
    save: function () {
      const self = this;
      let value = null;

      self.showAdd = false;

      switch (this.source) {
        case "db":
          AppBuilder.data(self.sourceDatabase.table, [
            self.sourceDatabase.labelColumn,
            self.sourceDatabase.valueColumn
          ]).then(function (data) {
            value = [];

            for (let index = 0; index < data.records.length; index++) {
              value.push({
                element: "option",
                label: data.records[index][self.sourceDatabase.labelColumn],
                value: data.records[index][self.sourceDatabase.valueColumn]
              });
            }

            self.$emit("change", self.fieldProperty, {
              label_column: self.sourceDatabase.labelColumn,
              source: self.source,
              table: self.sourceDatabase.table,
              value: value,
              value_column: self.sourceDatabase.valueColumn
            });
          });

          break;
        case "static-label-value":
          value = [];

          for (
            let index = 0;
            index < self.sourceStaticLabelValue.length;
            index++
          ) {
            const item = self.sourceStaticLabelValue[index];

            if (item.label !== "" && item.value !== "") {
              value.push({
                label: item.label,
                value: item.value
              });
            }
          }

          self.$emit("change", self.fieldProperty, {
            source: self.source,
            value: value
          });

          break;
        case "static":
        default:
          value = self.sourceStatic
            .split(/\n/)
            .map(function (item) {
              return {
                element: "option",
                label: item,
                value: item
              };
            })
            .filter(function (item) {
              if (item.label === "" && item.value === "") {
                return false;
              }

              return true;
            });

          self.$emit("change", self.fieldProperty, {
            source: self.source,
            value: value
          });

          break;
      }
    }
  }
};
</script>
