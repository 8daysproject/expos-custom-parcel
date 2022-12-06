<template>
  <div>
    <ns-autocomplete
      @input="onAutocompleteInput"
      :items="autocompleteItems"
      :label="autocompleteSearchColumn"
      :placeholder="autocompletePlaceholder"
      style="width: 100%"
    >
    </ns-autocomplete>
    <data-table
      :headers="tableHeaders"
      :items="rawTableItems(tableItems)"
      :search-placeholder="oneToManyInputSearchPlaceholder"
    >
      <template #no-data>{{ oneToManyInputTableEmptyPlaceholder }}</template>
      <template #item.action="props">
        <div class="text-center">
          <button
            @click="onDeleteTableItemButtonClick(props.item)"
            title="Edit"
          >
            <span class="mdi mdi-delete mdi-24px"></span>
          </button></div
      ></template>
    </data-table>
    <ns-dialog @close="isModalShown = false" :show="isModalShown" size="400px">
      <template #title>
        {{ modalTitle }}
      </template>
      <div>
        <template v-for="field in modalFields" :key="field.value">
          <div v-if="field.source === 'user'" class="flex px-2 py-1">
            <div class="w-1/4">{{ field.label }}</div>
            <div class="w-3/4">
              <input
                v-model="currentTableItem[field.value]"
                class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
                type="text"
              />
            </div>
          </div>
        </template>
        <div class="flex justify-end px-2 py-2">
          <button
            @click="onModalAddButton"
            class="bg-primary px-3 py-2 rounded text-white"
          >
            <i class="mdi mdi-plus"></i> Add
          </button>
        </div>
      </div>
    </ns-dialog>
  </div>
</template>

<script>
import NsAutocomplete from "@/components/NS/NsAutocomplete.vue";
import NsDialog from "@/components/NS/NsDialog.vue";
import DataTable from "@/components/DataTable.vue";

import AppBuilder from "@/assets/js/AppBuilder";

export default {
  name: "OneToManyInput",
  components: {
    NsAutocomplete,
    NsDialog,
    DataTable
  },
  props: {
    oneToManyInputAdditionalField: Object,
    oneToManyInputAdditionalFieldFormat: Object,
    // oneToManyInputFieldFilter: Object,
    oneToManyInputPlaceholder: String,
    oneToManyInputSearchPlaceholder: String,
    oneToManyInputTable: Object,
    oneToManyInputTableActionColumnLabel: String,
    oneToManyInputTableEmptyPlaceholder: String,
    name: String,
    value: Object
  },
  emits: ["input"],
  data: function () {
    return {
      autocompleteChangeDelayHandler: null,
      autocompleteItems: [],
      autocompletePlaceholder: "",
      autocompleteSearchColumn: null,
      autocompleteSelectedItem: {},

      tableHeaders: [],
      tableItems: [],
      currentTableItem: {},
      field: [],

      table: [],

      isModalShown: false,
      modalTitle: "",
      modalFields: []
    };
  },
  watch: {
    oneToManyInputAdditionalField: {
      handler: function () {
        this.setTableHeaders();
      },
      immediate: true
    },
    oneToManyInputAdditionalFieldFormat: {
      handler: function () {
        this.setTableHeaders();
      },
      immediate: true
    },
    oneToManyInputTable: {
      handler: function (value) {
        const self = this;

        this.setTableHeaders();

        if (
          typeof value !== "undefined" &&
          typeof value.columns !== "undefined"
        ) {
          let columns = value.columns.map(function (item) {
            return item.name;
          });

          if (typeof value.search_column !== "undefined") {
            self.autocompleteSearchColumn = value.search_column;
          }

          AppBuilder.data(value.table, columns).then(function (results) {
            self.autocompleteItems = results.records;
          });
        }
      },
      immediate: true
    },
    oneToManyInputTableEmptyPlaceholder: {
      handler: function () {},
      immediate: true
    },
    oneToManyInputTableActionColumnLabel: {
      handler: function () {
        console.log("AC COL");
        this.setTableHeaders();
      },
      immediate: true
    },
    oneToManyInputPlaceholder: {
      handler: function (value) {
        this.autocompletePlaceholder = value;
      },
      immediate: true
    },
    value: function (value) {
      if (!Array.isArray(value)) {
        value = [];
      }

      this.tableItems = value;
    }
  },
  computed: {},
  methods: {
    rawTableItems: function (table_items) {
      if (typeof table_items !== "undefined") {
        return JSON.parse(JSON.stringify(table_items));
      }

      return [];
    },
    addTableItem: function () {
      const self = this;
      let item = {};

      for (let index = 0; index < self.tableHeaders.length; index++) {
        const header = self.tableHeaders[index];

        if (typeof self.currentTableItem[header.value] !== "undefined") {
          item[header.value] = self.currentTableItem[header.value];
        } else if (typeof header.function !== "undefined") {
          let fn = new Function("column", "data", header.function);

          item[header.value] = fn(item, self.$attrs.data);
        }
      }

      self.tableItems.push(item);

      self.modalFields = {};
      self.currentTableItem = {};

      this.$emit("input", {
        target: {
          name: this.name,
          value: self.tableItems
        }
      });
    },
    onModalAddButton: function () {
      const self = this;

      self.isModalShown = false;
      self.addTableItem();
    },
    onAutocompleteInput: async function (item) {
      console.log(item);
      const self = this;

      let additional_fields = [];

      if (
        typeof self.oneToManyInputAdditionalField !== "undefined" &&
        typeof self.oneToManyInputAdditionalField.value !== "undefined" &&
        Array.isArray(self.oneToManyInputAdditionalField.value)
      ) {
        additional_fields = self.oneToManyInputAdditionalField.value;
      } else {
        additional_fields = self.oneToManyInputAdditionalField;
      }

      if (typeof item !== "undefined") {
        self.currentTableItem = item;
      }

      if (typeof item !== "undefined" && item !== null) {
        if (additional_fields.length > 0) {
          self.modalTitle = item[self.autocompleteSearchColumn];
          self.modalFields = additional_fields;
          self.isModalShown = true;
        } else {
          self.addTableItem();
        }
      }
    },
    onDeleteTableItemButtonClick: function (item) {
      const self = this;
      const stringify_item = JSON.stringify(item);

      for (let index = 0; index < self.tableItems.length; index++) {
        const stringify_table_item = JSON.stringify(self.tableItems[index]);

        if (stringify_item == stringify_table_item) {
          self.tableItems.splice(index, 1);

          break;
        }
      }
    },
    setTableHeaders: function () {
      const self = this;

      self.tableHeaders.splice(0);

      if (self.$attrs.builder) {
        self.tableItems[0] = {};
      }

      if (typeof this.oneToManyInputTable !== "undefined") {
        let columns = [];

        if (
          typeof this.oneToManyInputTable.columns !== "undefined" &&
          Array.isArray(this.oneToManyInputTable.columns)
        ) {
          columns = this.oneToManyInputTable.columns;
        }

        for (let index = 0; index < columns.length; index++) {
          const column = columns[index];

          self.tableHeaders.push({
            additional: false,
            align: typeof column.align === "undefined" ? "left" : column.align,
            format:
              typeof column.format === "undefined" ? "general" : column.format,
            label:
              typeof column.alias === "undefined" ? column.name : column.alias,
            value: column.name,
            visible:
              typeof column.visible === "undefined" ? "general" : column.visible
          });

          if (self.$attrs.builder) {
            self.tableItems[0][column.name] = "-";
          }
        }
      }

      if (typeof this.oneToManyInputAdditionalField !== "undefined") {
        let additional_columns = [];
        // let additional_column_properties = [];

        if (
          typeof this.oneToManyInputAdditionalField.value !== "undefined" &&
          Array.isArray(this.oneToManyInputAdditionalField.value)
        ) {
          additional_columns = this.oneToManyInputAdditionalField.value;
        } else {
          additional_columns = this.oneToManyInputAdditionalField;
        }

        // if (
        //   typeof this.oneToManyInputAdditionalFieldFormat !== "undefined" &&
        //   Array.isArray(this.oneToManyInputAdditionalFieldFormat)
        // ) {
        //   additional_column_properties =
        //     this.oneToManyInputAdditionalFieldFormat;
        // }

        for (let index = 0; index < additional_columns.length; index++) {
          const column = additional_columns[index];

          if (
            typeof this.oneToManyInputAdditionalFieldFormat !== "undefined" &&
            typeof this.oneToManyInputAdditionalFieldFormat[index] !==
              "undefined"
          ) {
            for (const key in this.oneToManyInputAdditionalFieldFormat[index]) {
              if (
                Object.hasOwnProperty.call(
                  this.oneToManyInputAdditionalFieldFormat[index],
                  key
                )
              ) {
                column[key] =
                  this.oneToManyInputAdditionalFieldFormat[index][key];
              }
            }
          }

          self.tableHeaders.push({
            additional: true,
            align: typeof column.align === "undefined" ? "left" : column.align,
            format:
              typeof column.format === "undefined" ? "general" : column.format,
            function:
              typeof column.function === "undefined"
                ? "general"
                : column.function,
            label: column.label,
            value: column.value
          });

          if (self.$attrs.builder) {
            self.tableItems[0][column.value] = "-";
          }
        }
      }

      self.tableHeaders.push({
        additional: true,
        align: "center",
        label: self.oneToManyInputTableActionColumnLabel,
        sortable: false,
        value: "action"
      });
    }
  }
};
</script>
