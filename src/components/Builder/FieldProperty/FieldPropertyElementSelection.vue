<template>
  <div :class="{ 'h-28': showSelect }">
    <button
      @click="onSelectElementClick"
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
        v-if="showSelect"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div>
          <div>
            <div class="pb-1.5">
              <select
                v-model="selectedContainerIndex"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              >
                <option
                  v-for="(container, container_index) in containers"
                  :key="container"
                  :value="container_index"
                >
                  {{
                    typeof container.name === "undefined" ||
                    container.name === ""
                      ? "Container " + (container_index + 1)
                      : container.name
                  }}
                </option>
              </select>
            </div>
            <div>
              <select
                v-model="selectedField"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              >
                <option
                  v-for="field in fields"
                  :key="field.name"
                  :value="field.name"
                >
                  {{ field.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="pt-2 text-center">
          <button
            @click="cancel"
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
    containers: Object,
    fieldProperty: String,
    properties: Object
  },
  data: function () {
    return {
      fields: [],
      showSelect: false,
      selectedContainerIndex: 0,
      selectedField: null
    };
  },
  methods: {
    cancel: function () {
      const self = this;

      self.showSelect = false;
    },
    initializeItems: function () {
      const self = this;

      if (typeof this.properties[this.fieldProperty].name !== "undefined") {
        self.selectedField = this.properties[this.fieldProperty].name;
      }

      self.fields.splice(0);

      for (
        let index = 0;
        index < self.containers[self.selectedContainerIndex].rows.length;
        index++
      ) {
        const rows = self.containers[self.selectedContainerIndex].rows[index];

        for (let row_index = 0; row_index < rows.columns.length; row_index++) {
          const column = rows.columns[row_index];

          if (column.type !== "empty") {
            if (typeof column.name !== "undefined" && column.name !== "") {
              if (self.selectedField === null) {
                self.selectedField = column.name;
              }

              self.fields.push(column);
            }
          }
        }
      }
    },
    onSelectElementClick: function () {
      this.initializeItems();

      this.showSelect = true;
    },
    removeSort: function (index) {
      const self = this;

      self.sorts.splice(index, 1);
    },
    save: function () {
      const self = this;
      let selected_field = {};

      self.showSelect = false;

      for (let index = 0; index < self.fields.length; index++) {
        const field = self.fields[index];

        if (field.name == self.selectedField) {
          selected_field = field;
        }
      }

      self.$emit(
        "change",
        self.fieldProperty,
        JSON.parse(JSON.stringify(selected_field))
      );
    }
  }
};
</script>
