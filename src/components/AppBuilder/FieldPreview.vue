<template>
  <div
    class="p-0.5 relative animate__animateds animate__zoomIn animate__faster"
  >
    <div class="p-1" :class="{}">
      <label v-if="getPropertyValue('element') == 'textarea'">
        <div class="pb-1">{{ fieldLabel }}</div>
        <textarea
          :placeholder="getPropertyValue('placeholder')"
          :rows="getPropertyValue('rows')"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        ></textarea>
      </label>
      <!-- Dropdown Field -->
      <label v-else-if="getPropertyValue('element') == 'select'">
        <div class="pb-1">{{ fieldLabel }}</div>
        <select
          :multiple="getPropertyValue('multiple')"
          :size="getPropertyValue('size')"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        >
          <option
            v-for="(item, index) in getPropertyValue('items').value"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </label>
      <!-- Input (Text Box, Password, Check Box, Radio Button) Field -->
      <label v-else-if="getPropertyValue('element') == 'input'">
        <div class="pb-1">{{ fieldLabel }}</div>
        <input
          v-bind="getPropertiesValue()"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        />
      </label>
      <!-- Other Type Field -->
      <div v-else>
        <component
          v-bind="getPropertiesValue()"
          :xcontenteditable="getPropertyValue('contenteditable')"
          :is="getPropertyValue('element')"
        >
          {{ getPropertyValue("content") }}
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import GridInput from "@/components/Builder/Element/GridInput.vue";
import OneToManyInput from "@/components/Builder/Element/OneToManyInput.vue";

export default {
  name: "Field",
  emits: {},
  components: {
    GridInput,
    OneToManyInput
  },
  data: function () {
    return {};
  },
  props: {
    properties: Object
  },
  computed: {
    fieldLabel: function () {
      return this.properties.label;
    }
  },
  methods: {
    getPropertyValue: function (property) {
      if (typeof this.properties[property] !== "undefined") {
        return this.properties[property];
      }

      // if (
      //   typeof this.fieldPropertyOptions[property] !== "undefined" &&
      //   typeof this.fieldPropertyOptions[property].default !== "undefined"
      // ) {
      //   return this.fieldPropertyOptions[property].default;
      // }

      return false;
    },
    getPropertiesValue: function () {
      return this.properties;
    }
  }
};
</script>
