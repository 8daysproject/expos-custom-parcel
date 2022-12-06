<template>
  <div>
    <h1 v-if="reportTableTitle" class="p-4 text-2xl text-center">
      {{ reportTableTitle }}
    </h1>
    <table v-if="columns.length > 0" class="w-full">
      <thead>
        <tr class="bg-primary">
          <th
            v-for="(column, index) in columns"
            :class="{
              'rounded-tl': index === 0,
              'rounded-tr': index === columns.length - 1,
              'text-left': column.align === 'left',
              'text-center': column.align === 'center',
              'text-right': column.align === 'right'
            }"
            :key="column.name"
            class=""
          >
            {{ column.alias }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.name">
          <td
            v-for="column in columns"
            :class="{
              'border-b-2 border-primary': index === items.length - 1,
              'text-left': column.align === 'left',
              'text-center': column.align === 'center',
              'text-right': column.align === 'right'
            }"
            :key="column.name"
            class=""
          >
            {{ formatValue(item[column.name], column.format) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Please Select Table And Columns First.</div>
  </div>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder";
export default {
  props: {
    filters: Object,
    reportTableFilter: Object,
    reportTableLimit: String,
    reportTableSort: Object,
    reportTableSource: Object,
    reportTableTitle: String,
    name: String
  },
  emits: ["input"],
  data: function () {
    return {
      items: []
    };
  },
  watch: {
    report: function () {
      this.initializeItems();
    },
    reportTableFilter: function () {
      this.initializeItems();
    },
    reportTableLimit: function () {
      this.initializeItems();
    },
    reportTableSort: function () {
      this.initializeItems();
    },
    reportTableSource: function () {
      this.initializeItems();
    },
    reportTableTitle: function () {
      this.initializeItems();
    }
  },
  computed: {
    columns: function () {
      let columns = [];

      if (typeof this.reportTableSource !== "undefined") {
        if (
          typeof this.reportTableSource.columns !== "undefined" &&
          Array.isArray(this.reportTableSource.columns)
        ) {
          columns = this.reportTableSource.columns;
        }
      }

      return columns;
    }
  },
  mounted: function () {
    this.initializeItems();
  },
  methods: {
    formatValue: function (value, format) {
      if (format === "number" || format === "currency") {
        value = Number(value);

        if (isNaN(value)) {
          value = 0;
        }
      }

      if (format === "date") {
        const dt = new Date(value);

        return (
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        );
      } else if (format === "number") {
        return Intl.NumberFormat("id-ID").format(value);
      } else if (format === "currency") {
        return Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(value);
      }

      return value;
    },
    initializeItems: async function () {
      const self = this;

      let filters = self.reportTableFilter;

      if (typeof self.filters !== "undefined") {
        if (typeof filters === "undefined") {
          filters = {};
        }

        if (typeof filters.operator === "undefined") {
          filters = { operator: "and" };
        }

        if (typeof filters.conditions === "undefined") {
          filters.conditions = [];
        }

        for (const key in self.filters) {
          if (Object.hasOwnProperty.call(self.filters, key)) {
            const filter = self.filters[key];

            filters.conditions.push(filter);
          }
        }
      }

      if (
        typeof self.reportTableSource !== "undefined" &&
        typeof self.reportTableSource.table !== "undefined"
      ) {
        let columns = self.reportTableSource.columns.map(function (item) {
          return item.name;
        });

        let items = await AppBuilder.data(
          self.reportTableSource.table,
          columns,
          filters,
          self.reportTableSort,
          isNaN(self.reportTableLimit) || self.reportTableLimit === ""
            ? undefined
            : Number(self.reportTableLimit)
        );

        self.items = items.records;
      }
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

table thead tr {
  color: #ffffff;
  text-align: left;
}

table th,
table td {
  padding: 12px 15px;
}

table tbody tr {
  border-bottom: thin solid #dddddd;
}

table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
