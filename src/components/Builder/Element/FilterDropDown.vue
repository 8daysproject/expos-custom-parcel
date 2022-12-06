<template>
  <label class="block pb-1 pt-2">
    <div class="pb-1">{{ label }}</div>

    <select
      @input.self="onInput"
      :multiple="multiple"
      :size="size"
      :value="value"
      class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
    >
      <option
        v-for="(item, index) in computedItems"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    field: String,
    filterCondition: String,
    items: Object,
    label: String,
    multiple: String,
    name: String,
    size: String,
    value: String
  },
  emits: ["input"],
  computed: {
    computedItems: function () {
      let items = [];

      console.log("ITEMS", this.items);
      if (
        typeof this.items !== "undefined" &&
        typeof this.items.value !== "undefined"
      ) {
        for (let index = 0; index < this.items.value.length; index++) {
          const item = this.items.value[index];

          items.push(item);
        }
      }

      return items;
    }
  },
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
          value:
            typeof this.value !== "undefined"
              ? this.value
              : this.computedItems[0]
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
