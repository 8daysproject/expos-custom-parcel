<template>
  <div :class="{ 'h-28': showAdd || showAddFilter }">
    <button
      @click="onAddButtonClick"
      class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
      href="javascript:;"
    >
      <i class="fas fa-plus"></i> Add Filter
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
        <div v-if="hasSource">
          <div
            v-if="
              typeof currentFilter.conditions === 'undefined' ||
              currentFilter.conditions.length === 0
            "
            class="border-b border-primary mb-2 pb-2 text-center"
          >
            <div>No filter has been added.</div>
          </div>
          <div v-else>
            <div class="mb-2">
              <select
                v-model="currentFilter.operator"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              >
                <option value="and">AND</option>
                <option value="or">OR</option>
              </select>
            </div>
            <div>
              <div
                v-for="(filter, filter_index) in currentFilter.conditions"
                :key="filter_index"
                class="flex"
              >
                <div
                  v-if="typeof filter.conditions === 'undefined'"
                  class="border border-primary flex-grow mb-2 mr-2 px-2 py-1 rounded-sm"
                >
                  {{ renderCondition(filter) }}
                </div>
                <div v-else class="flex-grow mb-2 mr-2 rounded-sm">
                  <button
                    @click="viewNestedFilter(filter)"
                    class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
                    href="javascript:;"
                  >
                    <i class="fas fa-list"></i> Nested Filter
                  </button>
                </div>
                <div>
                  <button
                    @click="removeFilter(filter_index)"
                    class="bg-primary rounded-full text-white px-2 py-1"
                  >
                    <i class="mdi mdi-minus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">Please select table first.</div>

        <div class="text-center">
          <button
            @click="addNestedFilter"
            class="bg-primary rounded-full mr-2 text-white px-2 py-1"
          >
            <i class="mdi mdi-plus"></i> Nested
          </button>
          <button
            @click="
              showAdd = false;
              showAddFilter = true;
            "
            class="bg-primary rounded-full text-white px-2 py-1"
          >
            <i class="mdi mdi-plus"></i>
          </button>
        </div>

        <div class="pt-2 text-center">
          <button
            v-if="lastFilter.length === 0"
            @click="cancel"
            class="bg-red-600 mr-2 rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-times"></i> Cancel
          </button>
          <button
            v-if="hasSource"
            @click="save"
            :x-class="{
              'bg-primary':
                lastFilter.length === 0 || currentFilter.conditions.length > 0,
              'bg-tertiary':
                lastFilter.length > 0 && currentFilter.conditions.length === 0
            }"
            :x-disabled="
              lastFilter.length > 0 && currentFilter.conditions.length === 0
            "
            class="bg-primary rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-check"></i>
            {{ lastFilter.length === 0 ? "Save" : "Save Nested" }}
          </button>
        </div>
      </div>
    </transition>

    <transition
      name="show-add-filter-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showAddFilter"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div class="grid grid-cols-2">
          <div class="pr-1 py-0.5">Column</div>
          <div class="pr-1 py-0.5">
            <select
              v-model="filterColumn"
              class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
            >
              <option
                v-for="field in fields"
                :key="field"
                :value="field"
                class="grid grid-cols-2"
              >
                {{ field }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="pr-1 py-0.5">Condition</div>
          <div class="pr-1 py-0.5">
            <select
              v-model="filterCondition"
              class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
            >
              <option
                v-for="condition in conditions"
                :key="condition.label"
                :value="condition.value"
                class="grid grid-cols-2"
              >
                {{ condition.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="pr-1 py-0.5">Value</div>
          <div class="pr-1 py-0.5">
            <input
              v-model="filterValue"
              class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              type="text"
            />
          </div>
        </div>

        <div class="pt-2 text-center">
          <button
            @click="showAddFilter = false"
            class="bg-red-600 mr-2 rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-times"></i> Cancel
          </button>
          <button
            v-if="hasSource"
            @click="addFilter"
            class="bg-primary rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "FieldPropertyFilterCollection",
  emits: {
    change: null
  },
  props: {
    configuration: {
      type: Object,
      default: function () {
        return { source: "" };
      }
    },
    fieldProperty: String,
    properties: Object
  },
  data: function () {
    return {
      fields: [],
      conditions: [
        { label: "Equals To", value: "=" },
        { label: "Greather Than", value: ">" },
        { label: "Less Than", value: "<" },
        { label: "Greather Than Or Equals To", value: ">=" },
        { label: "Less Than Or Equals To", value: "<=" },
        { label: "Contains", value: "contain" }
      ],
      filterColumn: "",
      filterCondition: "=",
      filterValue: "",
      filters: { operator: "and", conditions: [] },
      lastFilter: [],
      currentFilter: null,
      showAdd: false,
      showAddFilter: false
    };
  },
  computed: {
    hasSource: function () {
      return (
        typeof this.properties[this.configuration.source] !== "undefined" &&
        typeof this.properties[this.configuration.source]["table"] !==
          "undefined"
      );
    }
  },
  methods: {
    addFilter: function () {
      const self = this;

      self.currentFilter.conditions.push({
        field: self.filterColumn,
        condition: self.filterCondition,
        value: self.filterValue
      });

      self.showAddFilter = false;
      self.showAdd = true;

      self.filterColumn = self.fields[0];
      self.filterCondition = "=";
      self.filterValue = "";
    },
    addNestedFilter: function () {
      const self = this;

      self.currentFilter.conditions.push({
        operator: "and",
        conditions: []
      });

      self.lastFilter.push(self.currentFilter);

      self.currentFilter =
        self.currentFilter.conditions[self.currentFilter.conditions.length - 1];
    },
    cancel: function () {
      const self = this;

      self.showAdd = false;
    },
    initializeItems: function () {
      const self = this;

      if (self.hasSource) {
        AppBuilder.getTableColumns(
          self.properties[self.configuration.source]["table"]
        ).then(function (data) {
          self.fields.splice(0);

          for (let i = 0; i < data.length; i++) {
            self.fields.push(data[i]);
          }

          self.filterColumn = self.fields[0];

          self.filters =
            typeof self.properties[self.fieldProperty] === "undefined"
              ? { operator: "and", conditions: [] }
              : JSON.parse(JSON.stringify(self.properties[self.fieldProperty]));

          self.currentFilter = self.filters;
        });
      }
    },
    onAddButtonClick: function () {
      this.initializeItems();

      this.showAdd = true;
    },
    removeFilter: function (index) {
      const self = this;

      self.currentFilter.conditions.splice(index, 1);
    },
    renderCondition: function (condition) {
      const conditions = {
        "=": "Equals To",
        ">": "Greather Than",
        "<": "Less Than",
        ">=": "Greather Than Or Equals",
        "<=": "Less Than Or Equals",
        contains: "Contains"
      };

      if (typeof condition.conditions !== "undefined") {
        return "Nested Conditions";
      }

      let condition_text = condition.field;

      condition_text += " " + conditions[condition.condition];
      condition_text += " " + condition.value;

      return condition_text;
    },
    save: function () {
      const self = this;

      if (self.lastFilter.length > 0) {
        let is_remove_last_condition = false;

        if (self.currentFilter.conditions.length === 0) {
          is_remove_last_condition = true;
        }

        self.currentFilter = self.lastFilter.pop();

        if (is_remove_last_condition) {
          self.currentFilter.conditions.pop();
        }
      } else {
        self.showAdd = false;

        self.$emit(
          "change",
          self.fieldProperty,
          JSON.parse(JSON.stringify(self.filters))
        );
      }
    },
    viewNestedFilter: function (filter) {
      const self = this;

      self.lastFilter.push(self.currentFilter);
      self.currentFilter = filter;
    }
  }
};
</script>
