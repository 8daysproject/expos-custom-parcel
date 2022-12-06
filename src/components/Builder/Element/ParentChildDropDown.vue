<template>
  <select
    v-model="value"
    @input.self="onInput"
    :multiple="multiple"
    :size="size"
    class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
  >
    <option v-for="(item, index) in items" :key="index" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  props: {
    data: Object,
    label: String,
    multiple: String,
    name: String,
    parentChildDropDownParentElement: Object,
    parentChildDropDownParentSource: Object,
    parentChildDropDownChildSource: Object,
    size: String
  },
  emits: ["input"],
  data: function () {
    return {
      items: [],
      value: ""
    };
  },
  mounted: function () {
    this.initWatch();
  },
  methods: {
    initWatch: function () {
      const self = this;

      self.$watch(
        "data." + self.parentChildDropDownParentElement.name,
        function (value) {
          if (
            typeof self.data[self.parentChildDropDownParentElement.name] !==
            "undefined"
          ) {
            AppBuilder.data(
              self.parentChildDropDownParentSource.table,
              self.parentChildDropDownParentSource.columns.map(function (item) {
                return item.name;
              }),
              {
                operator: "and",
                conditions: [
                  {
                    field: self.parentChildDropDownParentSource.parent_column,
                    condition: "=",
                    value: value
                  }
                ]
              }
            ).then(function (results) {
              self.items.splice(0);

              const current_record = results.records[0];

              AppBuilder.data(
                self.parentChildDropDownChildSource.table,
                self.parentChildDropDownChildSource.columns.map(function (
                  item
                ) {
                  return item.name;
                }),
                {
                  operator: "and",
                  conditions: [
                    {
                      field: self.parentChildDropDownChildSource.value_column,
                      condition: "=",
                      value:
                        current_record[
                          self.parentChildDropDownParentSource.child_column
                        ]
                    }
                  ]
                }
              ).then(function (results) {
                for (let index = 0; index < results.records.length; index++) {
                  const record = results.records[index];

                  self.items.push({
                    label:
                      record[self.parentChildDropDownChildSource.label_column],
                    value:
                      record[self.parentChildDropDownChildSource.value_column]
                  });
                }

                self.value = self.items[0].value;

                self.$emit("input", {
                  target: {
                    name: self.name,
                    value: self.value
                  }
                });
              });
            });
          }
        },
        {
          immediate: true
        }
      );
      // }
    },
    onInput: function () {
      this.$emit("input", {
        target: {
          name: this.name,
          value: self.value
        }
      });
    }
  }
};
</script>
