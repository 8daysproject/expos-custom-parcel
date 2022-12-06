<template>
  <div
    @drop.prevent="dropElement"
    @dragover.prevent
    class="border border-dashed border-primary content-center flex flex-grow h-full items-center rounded-sm text-primary"
  >
    <div class="mx-auto p-3 pointer-events-none text-sm">
      <i class="fas fa-long-arrow-alt-down"></i> Drop
      {{ element == "" || element == null ? "Element" : '"' + element + '"' }}
      Here
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyColumnPlaceholder",
  emits: {
    "add-element": null
  },
  props: {
    column: Number,
    element: String,
    row: Number
  },
  methods: {
    dropElement: function () {
      this.$emit("add-element", this.row, this.column);
    }
  }
};
</script>
