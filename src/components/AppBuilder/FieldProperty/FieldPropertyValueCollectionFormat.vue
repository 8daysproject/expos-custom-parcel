<template>
  <div :class="{ 'h-28': showAdd }">
    <button
      @click="add"
      class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
      href="javascript:;"
    >
      <i class="fas fa-plus"></i> Set Format
    </button>
    <transition
      name="show-add-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showAdd"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div v-if="hasFields">
          <div
            v-for="field in fields"
            :key="field.name"
            class="grid grid-cols-2"
          >
            <div class="pr-1 py-0.5">{{ field.label }}</div>
            <div class="pr-1 py-0.5">
              <select
                v-model="field.type"
                class="bg-white border border-primary outline-none rounded-sm w-full"
              >
                <option
                  v-for="type in fieldTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-else>
          Please add one or more fields to
          <b class="font-bold">{{ fieldSourceName }}</b> first.
        </div>
        <div class="pt-2 text-center">
          <button
            @click="showAdd = false"
            class="bg-red-600 mr-2 rounded-sm text-white px-2 py-1"
          >
            <i class="fas fa-times"></i> Cancel
          </button>
          <button
            v-if="hasFields"
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
import FieldProperties from "@/assets/js/builder/FieldProperties.js";

export default {
  name: "FieldPropertyValueCollectionFormat",
  data: function () {
    return {
      showAdd: false,
      fieldTypes: [
        {
          label: "General",
          value: "general"
        },
        {
          label: "Number",
          value: "number"
        },
        {
          label: "Date",
          value: "date"
        }
      ],
      fields: []
    };
  },
  props: {
    configuration: {
      type: Object,
      default: function () {
        return { source: "" };
      }
    },
    fieldProperty: String,
    properties: Object
  },

  computed: {
    fieldSourceName: function () {
      return typeof FieldProperties["one-to-many-input"][
        this.configuration.source
      ] !== "undefined" &&
        typeof FieldProperties["one-to-many-input"][this.configuration.source][
          "label"
        ] !== "undefined"
        ? FieldProperties["one-to-many-input"][this.configuration.source][
            "label"
          ]
        : "";
    },
    hasFields: function () {
      return this.fields.length > 0;
    }
  },
  methods: {
    initializeItems: function () {
      this.fields.splice(0);

      if (
        typeof this.properties[this.configuration.source] !== "undefined" &&
        typeof this.properties[this.configuration.source]["value"]
      ) {
        for (
          let index = 0;
          index < this.properties[this.configuration.source]["value"].length;
          index++
        ) {
          const element =
            this.properties[this.configuration.source]["value"][index];

          this.fields.push({
            label: element.label,
            name: element.value,
            type: "general"
          });
        }
      }
    },
    add: function () {
      this.initializeItems();
      this.showAdd = true;
    },
    save: function () {
      const self = this;

      self.showAdd = false;

      self.$emit(
        "change",
        self.fieldProperty,
        self.fields.map(function (item) {
          return { name: item.name, type: item.type };
        })
      );
    }
  }
};
</script>
