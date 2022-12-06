<template>
  <div class="inline-block relative ns-autocomplete">
    <input
      v-bind="$attrs"
      v-model="searchText"
      @blur="onBlur"
      @focus="onFocus"
      @input="inputChange"
      @keydown.down="onKeyDown"
      @keydown.tab="onKeyEnter"
      @keydown.up="onKeyUp"
      @keyup.enter="onKeyEnter"
      @keyup="$emit('keyup', $event)"
      :placeholder="placeholder"
      class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm"
      type="search"
    />
    <slot name="loading">
      <div v-if="loading" class="v-autocomplete-loading"></div>
    </slot>
    <div
      v-if="show"
      @mouseleave="cursor = -1"
      class="absolute bg-white p-1 rounded-sm shadow w-full ns-autocomplete-list"
    >
      <div
        v-for="(item, i) in filteredItems"
        @click="onClickItem(item)"
        @mouseover="cursor = i"
        :class="{
          'bg-primary text-white ns-autocomplete-item-active': i === cursor
        }"
        :key="i"
        class="cursor-pointer px-3 py-1.5 rounded-sm ns-autocomplete-list-item"
      >
        <slot v-bind:item="item" name="item">
          <div>
            <div class="text-md">{{ item[labelField] }}</div>
            <div class="text-md">
              <small>{{ item[descriptionField] }}</small>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NsAutocomplete",
  emits: [
    "blur",
    "focus",
    "change",
    "input",
    "itemSelected",
    "itemClicked",
    "keyup"
  ],
  props: {
    description: String,
    items: Array,
    label: String,
    loading: Boolean,
    placeholder: String,
    value: String
  },
  data: function () {
    return {
      cursor: -1,
      descriptionField: "description",
      internalItems: this.items || [],
      labelField: "label",
      searchText: "",
      showList: false
    };
  },
  watch: {
    description: {
      handler: function (value) {
        this.descriptionField = value;
      },
      immediate: true
    },
    items: {
      handler: function (value) {
        this.setItems(value);
      },
      immediate: true
    },
    label: {
      handler: function (value) {
        if (typeof value !== "undefined" && value !== "") {
          this.labelField = value;
        } else {
          this.labelField = "label";
        }
      },
      immediate: true
    },
    value: {
      handler: function (value) {
        this.onSelectItem(value);
      },
      immediate: true
    }
  },
  computed: {
    filteredItems: function () {
      const self = this;
      let items = [];

      items = self.internalItems.filter(function (item) {
        let result = false;

        if (typeof item[self.labelField] === "undefined") {
          result = true;
        } else if (
          typeof item[self.labelField] !== "undefined" &&
          item[self.labelField]
            .toLowerCase()
            .includes(self.searchText.toLowerCase())
        ) {
          result = true;
        }

        return result;
      });

      return items;
    },
    hasItems: function () {
      return !!this.internalItems.length;
    },
    show: function () {
      return this.showList && this.hasItems;
    }
  },
  mounted: function () {
    // this.onSelectItem(this.value);
  },
  methods: {
    inputChange: function () {
      this.showList = true;
      this.cursor = -1;

      this.onSelectItem(null, "inputChange");
      this.$emit("change", this.searchText);
    },
    onBlur: function () {
      let self = this;

      setTimeout(function () {
        self.showList = false;
      }, 200);

      this.$emit("blur", this.searchText);
    },
    onClickItem: function (item) {
      this.onSelectItem(item);
      this.$emit("itemClicked", item);
      this.showList = false;
    },
    onFocus: function () {
      this.showList = true;
      this.$emit("focus", this.searchText);
    },
    onSelectItem: function (item) {
      if (item) {
        this.searchText = item[this.labelField];
        this.$emit("itemSelected", item);
      }

      this.$emit("input", item);
    },
    onKeyDown: function () {
      if (this.cursor < this.internalItems.length - 1) {
        this.cursor++;
      }
    },
    onKeyEnter: function () {
      if (this.internalItems.length === 1) {
        this.cursor = 0;
      }

      if (this.showList && this.internalItems[this.cursor]) {
        this.onSelectItem(this.internalItems[this.cursor]);
        this.showList = false;
      }
    },
    onKeyUp: function () {
      if (this.cursor > 0) {
        this.cursor--;
      }
    },
    setItems: function (items) {
      this.internalItems = items || [];
    },
    updateItems: function () {
      this.$emit("update-items", this.searchText);
    }
  }
};
</script>

<style scoped lang="scss"></style>
