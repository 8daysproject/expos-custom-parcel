<template>
  <div :class="{ 'h-28': showAdd }">
    <button
      @click="onAddButtonClick"
      class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
      href="javascript:;"
    >
      <i class="fas fa-plus"></i> Add Sort
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
            v-if="sorts.length === 0"
            class="border-b border-primary mb-2 pb-2 text-center"
          >
            <div>No sort has been added.</div>
          </div>
          <div v-else>
            <div>
              <div
                v-for="(sort, sort_index) in sorts"
                :key="sort_index"
                class="flex"
              >
                <div
                  class="border border-primary flex-grow mb-2 mr-2 px-2 py-1 rounded-sm"
                >
                  {{ renderSort(sort) }}
                </div>
                <div>
                  <button
                    @click="removeSort(sort_index)"
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
            @click="showAddFilter = true"
            class="bg-primary rounded-full text-white px-2 py-1"
          >
            <i class="mdi mdi-plus"></i>
          </button>
        </div>

        <div class="pt-2 text-center">
          <button
            @click="cancel"
            class="bg-red-600 mr-2 rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-times"></i> Cancel
          </button>
          <button
            v-if="hasSource"
            @click="save"
            class="bg-primary rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-check"></i> Save
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
              v-model="sortColumn"
              class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
            >
              <option
                v-for="column in columns"
                :key="column"
                :value="column"
                class="grid grid-cols-2"
              >
                {{ column }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="pr-1 py-0.5">Type</div>
          <div class="pr-1 py-0.5">
            <select
              v-model="sortType"
              class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
            >
              <option
                v-for="type in types"
                :key="type.label"
                :value="type.value"
                class="grid grid-cols-2"
              >
                {{ type.label }}
              </option>
            </select>
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
  name: "FieldPropertySortCollection",
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
      columns: [],
      types: [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" }
      ],
      sortColumn: "",
      sortType: "asc",
      sorts: [],
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

      self.sorts.push({
        column: self.sortColumn,
        type: self.sortType
      });

      self.showAddFilter = false;

      self.sortColumn = self.columns[0];
      self.sortType = "asc";
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
          self.columns.splice(0);

          for (let i = 0; i < data.length; i++) {
            self.columns.push(data[i]);
          }

          self.sortColumn = self.columns[0];

          self.sorts =
            typeof self.properties[self.fieldProperty] === "undefined"
              ? []
              : JSON.parse(JSON.stringify(self.properties[self.fieldProperty]));
        });
      }
    },
    onAddButtonClick: function () {
      this.initializeItems();

      this.showAdd = true;
    },
    removeSort: function (index) {
      const self = this;

      self.sorts.splice(index, 1);
    },
    renderSort: function (sort) {
      const sorts = {
        asc: "Ascending",
        desc: "Descending"
      };

      let sort_text = sort.column;

      sort_text += " " + sorts[sort.type];

      return sort_text;
    },
    save: function () {
      const self = this;

      self.showAdd = false;

      self.$emit(
        "change",
        self.fieldProperty,
        JSON.parse(JSON.stringify(self.sorts))
      );
    }
  }
};
</script>
