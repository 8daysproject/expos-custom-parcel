<template>
  <transition
    name="show-panel-transition"
    enter-active-class="animate__animated animate__slideInRight animate__faster"
    leave-active-class="animate__animated animate__slideOutRight animate__faster"
  >
    <div v-if="!hidden" class="mb-2">
      <div class="bg-primary font-bold p-1.5 rounded-t text-white">
        Filter Elements
      </div>
      <div class="border border-primary">
        <div
          v-for="column in columns"
          @dragend.self="endDrag"
          @dragstart.self="startDrag($event, column)"
          :class="{ 'select-none': column.is_added }"
          :draggable="column.is_added ? 'false' : 'true'"
          :key="column.name"
          class="cursor-move px-2 py-0.5"
        >
          <div
            :class="{
              'text-gray-200': column.is_added
            }"
          >
            <i class="fas fa-database"></i> {{ column.name }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: {
    dragstart: null
  },
  props: {
    columns: Array,
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {};
  },
  methods: {
    startDrag: function (event, element) {
      this.$emit("dragstart", event, {
        element: "filter-text",
        field: element.name,
        "filter-condition": "=",
        type: "filter"
      });
    }
  }
};
</script>
