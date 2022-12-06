<template>
  <div class="grid grid-cols-8 gap-2 mb-2">
    <div class="col-span-2">
      <option-drop-down
        @option-change="currentTableChanged"
        :items="tables"
        :value="selectedTable"
        label="Table"
      ></option-drop-down>
    </div>
    <div class="col-span-2">
      <option-drop-down
        @option-change="changePrimaryKey"
        :items="databaseColumnNames"
        :value="selectedPrimaryKey"
        label="Primary Key"
      ></option-drop-down>
    </div>
    <div class="col-span-2">
      <option-drop-down
        @option-change="changePrimaryKey"
        :items="containerTypes"
        :value="selectedContainerType"
        label="Container Type"
      ></option-drop-down>
    </div>
    <div class="flex items-end">
      <div class="w-full">
        <button
          @click="$emit('preview')"
          class="bg-primary p-2 rounded-sm text-white w-full"
        >
          Preview
        </button>
      </div>
    </div>
    <div class="flex items-end">
      <div class="w-full">
        <button
          @click="$emit('save')"
          class="bg-primary p-2 rounded-sm text-white w-full"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import OptionDropDown from "@/components/AppBuilder/OptionDropDown.vue";

import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "TopPanel",
  components: { OptionDropDown },
  emits: {
    columnsChange: null,
    containerTypeChange: null,
    preview: null,
    primaryKeyChange: null,
    save: null,
    selectedTableChange: null,
    tablesChange: null
  },
  props: {
    edit: Boolean,
    hidden: Boolean,
    table: String,
    pk: String
  },
  data() {
    return {
      tables: [],
      selectedTable: "",
      columns: [],
      selectedPrimaryKey: "-",
      containerTypes: ["Single Container", "Tabs", "Accordion"],
      selectedContainerType: "Single Container",
      containers: [],
      selectedContainer: 0
    };
  },
  computed: {
    databaseColumnNames: function () {
      let columns = ["-"];

      this.columns.forEach(function (element) {
        columns.push(element.name);
      });

      return columns;
    }
  },
  watch: {
    // edit: {
    //   handler: function (value) {
    //     console.log("waTCH is edit", value);
    //     // this.selectedPrimaryKey = value;
    //   },
    //   immediate: false
    // },
    table: {
      handler: function (value) {
        // console.log("WATCHED TABLE", value, this.edit);
        this.selectedTable = value;

        // if (value === "") {

        // }

        if (this.tables.length === 0) {
          this.getTables(value);
        }

        // if (value !== "") {
        // if (value !== "" && this.selectedTable !== value) {
        //   this.getTableColumns();
        // }

        // if (value === "") {
        //   this.getTables(true);
        // } else {
        //   this.getTables(false);
        // }
      },
      immediate: false
    },
    pk: {
      handler: function (value) {
        this.selectedPrimaryKey = value;
      },
      immediate: false
    }
  },
  mounted: function () {},
  methods: {
    getTables: function (current_table) {
      const self = this;

      AppBuilder.getTables(current_table).then(function (data) {
        self.tables.splice(0);

        for (let i = 0; i < data.length; i++) {
          const table = data[i];
          self.tables.push(table);
        }

        if (data.length > 0) {
          self.selectedTable = data[0];
          self.$emit("selectedTableChange", data[0]);
        }

        self.getTableColumns();

        self.$emit("tablesChange", self.tables);
      });
    },
    getTableColumns: function () {
      const self = this;

      AppBuilder.getTableColumns(self.selectedTable).then(function (data) {
        self.columns.splice(0);

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          self.columns.push({ name: element, is_added: false });
        }

        if (self.selectedPrimaryKey === "") {
          self.selectedPrimaryKey = "-";
        }

        self.$emit("columnsChange", self.columns);
      });
    },
    currentTableChanged: function (value) {
      const self = this;

      self.selectedTable = value;
      self.getTableColumns();

      self.$emit("selectedTableChange", value);
    },
    changePrimaryKey: function (value) {
      const self = this;

      self.$emit("primaryKeyChange", value);
    }
  }
};
</script>
