<template>
  <label class="block pb-1 pt-2">
    <div class="pb-1">{{ label }}</div>

    <input
      @input.self="onInput"
      :name="name"
      :placeholder="placeholder"
      type="text"
      :value="value"
      class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
    />
  </label>
</template>

<script>
export default {
  props: {
    field: String,
    filterCondition: String,
    label: String,
    name: String,
    placeholder: String,
    value: String
  },
  emits: ["input"],
  data: function () {
    return {};
  },
  mounted: function () {
    this.$emit("input", {
      target: {
        name: this.field + this.filterCondition,
        value: {
          field: this.field,
          condition: this.filterCondition,
          value: typeof this.value !== "undefined" ? this.value : ""
        }
      }
    });
  },
  methods: {
    onInput: function (event) {
      this.$emit("input", {
        target: {
          name: this.field + this.filterCondition,
          value: {
            field: this.field,
            condition: this.filterCondition,
            value: event.target.value
          }
        }
      });
    }
  }
};
</script>
