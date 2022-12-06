<template>
  <label>
    {{ currentLabel }}
    <select
      v-model="selectedValue"
      @change="change"
      class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
    >
      <option v-for="item in items" :key="item">
        {{ item }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "OptionDropDown",
  props: {
    items: Array,
    label: String,
    value: String
  },
  data: function () {
    return {
      currentLabel: "",
      selectedValue: ""
    };
  },
  watch: {
    label: {
      handler: function (value) {
        this.currentLabel = value;
      },
      immediate: true
    },
    value: {
      handler: function (value) {
        this.selectedValue = value;
      },
      immediate: true
    }
  },
  methods: {
    change: function () {
      this.$emit("option-change", this.selectedValue);
    }
  }
};
</script>
