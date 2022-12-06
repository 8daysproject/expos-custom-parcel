<template>
  <div class="mx-4">
    <div class="font-bold px-1 py-2 text-2xl">
      {{ report.name }}
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 px-5 py-3 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <div class="text-right">
        <button
          v-if="selectedContainer !== 0"
          @click="selectedContainer = 0"
          class="bg-primary px-3 py-1.5 rounded-sm text-white text-base"
        >
          Back
        </button>
        <button
          v-if="selectedContainer < containers.length - 1"
          @click="
            selectedContainer = 1;
            showReport();
          "
          class="bg-primary px-3 py-1.5 rounded-sm text-white text-base"
        >
          Show Report
        </button>
      </div>

      <template v-for="(container, index) in containers" :key="container.name">
        <div v-if="index == selectedContainer" class="flex-grow flex-shrink">
          <div class="py-2">
            <div
              v-for="(row, row_index) in container.rows"
              :class="'grid-cols-' + row.columns.length"
              :key="row_index"
              class="grid gap-2"
            >
              <div
                v-for="(column, column_index) in row.columns"
                :key="column_index"
                class="x-p-1"
              >
                <template
                  v-if="
                    ['input', 'select', 'textarea'].includes(column.element)
                  "
                >
                  <label :for="column.name" class="block pb-1 pt-2">
                    {{ column.label }}
                  </label>
                  <component
                    @input="onInput"
                    :is="column.element"
                    v-bind="cleanAttributes(column)"
                    class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
                  >
                    <template v-if="column.items">
                      <component
                        v-for="item in column.items"
                        :is="item.element"
                        :key="item.name"
                        v-bind="item"
                        >{{ item.label }}</component
                      >
                    </template>
                  </component>
                </template>
                <component
                  v-else
                  @input="onInput"
                  :is="column.element"
                  v-bind="cleanAttributes(column)"
                >
                  <template v-if="column.content">{{
                    column.content
                  }}</template>
                </component>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ReportTable from "@/components/Builder/Element/ReportTable.vue";
import FilterText from "@/components/Builder/Element/FilterText.vue";
import FilterDropDown from "@/components/Builder/Element/FilterDropDown.vue";
import FilterDateRange from "@/components/Builder/Element/FilterDateRange.vue";

import ReportBuilder from "@/assets/js/ReportBuilder.js";

export default {
  components: {
    ReportTable,
    FilterText,
    FilterDropDown,
    FilterDateRange
  },
  data: function () {
    return {
      report: {},
      containers: [],
      selectedContainer: 0,
      values: {}
    };
  },
  props: {},
  mounted: function () {
    this.render(this.$route.params.name);
  },
  watch: {
    $route(to) {
      this.render(to.params.name);
    }
  },
  methods: {
    // cancel: function () {
    //   const self = this;

    //   self.$router.push("/report/view/" + self.report.slug);
    // },
    cleanAttributes(attributes) {
      const self = this;

      let is_html_element =
        document.createElement(attributes.element).toString() ==
        "[object HTMLElement]";

      if (!is_html_element) {
        let cleaned_attributes = {};

        for (const key in attributes) {
          if (typeof attributes[key] !== "object" && attributes[key] !== "") {
            cleaned_attributes[key] = attributes[key];
          }
        }

        return cleaned_attributes;
      }

      attributes.filters = self.values;

      return attributes;
    },
    onInput: function (event) {
      const self = this;

      /* TODO Input event inside custom component also emit input?  */
      if (event.target.name !== "") {
        self.values[event.target.name] = event.target.value;
        console.log(self.values);
      }
    },
    render: function (report_slug) {
      const self = this;

      ReportBuilder.get(report_slug).then(function (report) {
        self.report = report;
        self.containers.splice(0);

        for (let index = 0; index < report.columns.length; index++) {
          const column = report.columns[index];

          if (typeof self.containers[column.container] === "undefined") {
            self.containers[column.container] = {
              rows: []
            };
          }

          if (
            typeof self.containers[column.container].rows[column.row] ===
            "undefined"
          ) {
            self.containers[column.container].rows[column.row] = {
              columns: []
            };
          }

          /* TODO Fix This. What if the items value is from database */
          if (typeof column.items !== "undefined" && column.items.length > 0) {
            self.values[column.name] = column.items[0].value;
          }

          self.containers[column.container].rows[column.row].columns.push(
            column
          );
        }
      });
    },
    // save: function () {
    //   const self = this;

    //   ReportBuilder.insertRecord(self.report, self.values).then(function () {
    //     self.$router.push("/report/view/" + self.report.slug);
    //   });
    // }
    showReport: function () {
      const self = this;

      console.log(self.values);
    }
  }
};
</script>
