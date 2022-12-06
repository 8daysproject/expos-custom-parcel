<template>
  <div>
    <div v-if="columns.length == 0 || rows.length == 0">
      Please add columns and rows first.
    </div>
    <table v-else class="w-full">
      <tr>
        <td>&nbsp;</td>
        <th v-for="column in columns" :key="column.label">
          {{ column.label }}
        </th>
      </tr>
      <tr v-for="(row, row_index) in rows" :key="row.label">
        <th>{{ row.label }}</th>
        <td
          v-for="(column, column_index) in columns"
          :key="column.label"
          class="px-1 py-0.5"
        >
          <input
            v-if="gridInputType === 'radio'"
            @input="onInput($event, row_index, column_index)"
            :name="'row' + row_index"
            class="border border-gray-400 px-2 py-1 rounded-sm w-full"
            type="radio"
            :value="column.value"
          />
          <input
            v-else-if="gridInputType === 'checkbox'"
            @input="onInput($event, row_index, column_index)"
            class="border border-gray-400 px-2 py-1 rounded-sm w-full"
            type="checkbox"
            :value="column.value"
          />
          <input
            v-else
            @input="onInput($event, row_index, column_index)"
            class="border border-gray-400 px-2 py-1 rounded-sm w-full"
            type="text"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "GridInput",
  props: {
    gridInputColumns: Object,
    gridInputRows: Object,
    gridInputType: String,
    name: String
  },
  emits: ["input"],
  data: function () {
    return {
      gridColumns: [],
      gridData: [[]],
      gridRows: []
    };
  },
  watch: {
    gridInputColumns: {
      handler: function (value) {
        this.gridColumns = value;
        this.initGridData();
      },
      immediate: true
    },
    gridInputRows: {
      handler: function (value) {
        this.gridRows = value;
        this.initGridData();
      },
      immediate: true
    }
    // gridInputType: {
    //   handler: function (value) {
    //     console.log("TYPE", value);
    //   },
    //   immediate: true
    // }
  },
  computed: {
    columns: function () {
      let columns = [];

      if (typeof this.gridInputColumns !== "undefined") {
        if (
          typeof this.gridInputColumns.value !== "undefined" &&
          Array.isArray(this.gridInputColumns.value)
        ) {
          columns = this.gridInputColumns.value;
        } else {
          columns = this.gridInputColumns;
        }
      }

      return columns;
    },
    rows: function () {
      let rows = [];

      if (typeof this.gridInputRows !== "undefined") {
        if (
          typeof this.gridInputRows.value !== "undefined" &&
          Array.isArray(this.gridInputRows.value)
        ) {
          rows = this.gridInputRows.value;
        } else {
          rows = this.gridInputRows;
        }
      }

      return rows;
    }
  },
  methods: {
    initGridData: function () {
      this.gridData.splice(0);

      for (let row_index = 0; row_index < this.rows.length; row_index++) {
        this.gridData.push([]);

        for (
          let index_columns = 0;
          index_columns < this.columns.length;
          index_columns++
        ) {
          this.gridData[row_index].push("");
        }
      }
    },
    onInput: function (event, row, column) {
      let value = event.target.value;

      if (this.gridInputType === "radio") {
        for (let index = 0; index < this.gridData[row].length; index++) {
          this.gridData[row][index] = "";
        }
      } else if (this.gridInputType === "checkbox") {
        if (!event.target.checked) {
          value = "";
        }
      }

      this.gridData[row][column] = value;

      console.log("GRID DATA CHANGED", this.gridData);

      this.$emit("input", {
        target: {
          name: this.name,
          value: this.gridData
        }
      });
    }
  }
};
</script>
