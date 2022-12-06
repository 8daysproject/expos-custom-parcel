<template>
  <div
    @click="onClick"
    class="border border-gray-400 inline-block pb-1 px-1 relative rounded-sm w-full ns-tags-item"
    :class="{ 'pt-1': !hasValues }"
  >
    <div
      v-for="(item, index) in valuesLabel"
      @animationend="internalValues[index].focus = false"
      :class="{
        'animate__animated animate__flash': internalValues[index].focus
      }"
      :key="item"
      class="bg-primary inline-block text-white mr-1.5 mt-1 px-2 py-1 rounded-sm select-none"
    >
      {{ item }}
      <small
        @click="onRemoveTagClick(index)"
        class="align-text-top bg-black/30 cursor-pointer h-5 inline-block ml-1 rounded-full p-0 text-center w-5"
        >&times;</small
      >
    </div>
    <input
      v-model="searchText"
      @blur="onInputBlur"
      @focus="onInputFocus"
      @keydown.delete="onInputDeleteKeyDown"
      @keyup.enter="onInputEnterKeyUp"
      :placeholder="inputPlaceholder"
      :style="{ width: inputWidth }"
      class="border-none outline-none py-1"
      ref="input"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "NsTagsInput",
  emits: ["blur", "focus", "change", "input", "itemSelected", "itemClicked"],
  props: {
    description: String,
    label: String,
    loading: Boolean,
    placeholder: String,
    value: Array
  },
  data: function () {
    return {
      inputPlaceholder: "",
      internalValues: [],
      isInputFocused: false,
      searchText: ""
    };
  },
  watch: {
    description: {
      handler: function (value) {
        this.descriptionField = value;
      },
      immediate: true
    },
    placeholder: {
      handler: function (value) {
        this.inputPlaceholder = value;
      },
      immediate: true
    },
    value: {
      handler: function (value) {
        this.internalValues = value;
      },
      immediate: true
    }
  },
  computed: {
    hasValues: function () {
      return !!this.internalValues.length;
    },
    inputWidth: function () {
      let font_size = 1;
      let font_size_unit = "em";
      let text_length =
        this.searchText.length === 0 ? 1 : this.searchText.length;

      if (typeof this.$refs.input !== "undefined") {
        font_size = this.$refs.input.computedStyleMap().get("font-size").value;
        font_size_unit = this.$refs.input
          .computedStyleMap()
          .get("font-size").unit;
      }

      return text_length * font_size + font_size_unit;
    },
    valuesLabel: function () {
      return this.internalValues.map(function (item) {
        return typeof item === "string" ? item : item.label;
      });
    }
  },
  mounted: function () {},
  methods: {
    onClick: function () {
      this.$refs.input.focus();
    },
    onInputBlur: function () {
      this.isInputFocused = false;
    },
    onInputFocus: function () {
      this.isInputFocused = true;
    },
    onInputEnterKeyUp: function () {
      const self = this;

      const added = self.internalValues.filter(function (item) {
        if (item.label === self.searchText) return item;
      });

      if (added.length === 0 && this.searchText !== "") {
        self.internalValues.push({
          label: this.searchText,
          value: this.searchText,
          focus: false
        });

        self.searchText = "";
      } else {
        this.$nextTick(function () {
          added[0].focus = true;
        });
      }
    },
    onInputDeleteKeyDown: function () {
      if (this.searchText === "" && this.internalValues.length > 0) {
        this.internalValues.pop();
      }
    },
    onRemoveTagClick: function (index) {
      this.internalValues.splice(index, 1);
    },
    setItems: function (items) {
      this.internalValues = items || [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
