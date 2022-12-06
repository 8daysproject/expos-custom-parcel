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
              <button
                @click="setColumnProperties(field)"
                class="bg-primary px-0.5 py-1.5 rounded-sm text-white text-xs w-full"
              >
                Properties
              </button>
              <!-- <select
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
              </select> -->
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

    <transition
      name="show-column-setting-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
    >
      <div
        v-if="showColumnProperties"
        class="absolute bg-white flex flex-col h-full left-0 overflow-scroll p-2 top-0 w-full"
      >
        <div class="flex-grow">
          <div
            v-for="property in columnProperties"
            :key="property.name"
            class="grid grid-cols-2"
          >
            <template
              v-if="
                typeof property.validation === 'undefined' ||
                property.validation(currentColumn)
              "
            >
              <div class="pr-1 py-0.5">{{ property.label }}</div>
              <div class="pr-1 py-0.5">
                <select
                  v-if="property.options"
                  v-model="currentColumn[property.name]"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                >
                  <option
                    v-for="option in property.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <textarea
                  v-else-if="property.type === 'textarea'"
                  v-model="currentColumn[property.name]"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                  rows="5"
                ></textarea>
                <input
                  v-else
                  v-model="currentColumn[property.name]"
                  class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                  type="text"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="pt-2 text-center">
          <button
            @click="showColumnProperties = false"
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
// TODO There are hard-coded name here "one-to-many-input"
import FieldProperties from "@/assets/js/builder/FieldProperties.js";

export default {
  name: "FieldPropertyValueCollectionFormat",
  emits: {
    change: null
  },
  data: function () {
    return {
      columnProperties: [
        {
          label: "Format",
          name: "format",
          value: "general",
          options: [
            { label: "Currency", value: "currency" },
            { label: "General", value: "general" },
            { label: "Date", value: "date" },
            { label: "Number", value: "number" }
          ]
        }
      ],
      currentColumn: {},
      showAdd: false,
      showColumnProperties: false,
      fields: []
    };
  },
  props: {
    configuration: {
      type: Object,
      default: function () {
        return {
          source: "",
          additionalFieldProperties: []
        };
      }
    },
    fieldProperty: String,
    properties: Object
  },

  computed: {
    additionalFieldProperties: function () {
      const self = this;
      let addditional_column_attributes = [];

      if (typeof self.configuration.additionalFieldProperties !== "undefined") {
        addditional_column_attributes =
          self.configuration.additionalFieldProperties;
      }

      return addditional_column_attributes;
    },
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
      const self = this;

      self.fields.splice(0);

      if (
        typeof self.properties[self.configuration.source] !== "undefined" &&
        typeof self.properties[self.configuration.source]["value"]
      ) {
        for (
          let index = 0;
          index < self.properties[self.configuration.source]["value"].length;
          index++
        ) {
          const element =
            self.properties[self.configuration.source]["value"][index];

          self.fields.push({
            align: "left",
            label: element.label,
            name: element.value,
            type: "general"
          });
        }
      }

      self.columnProperties.splice(1);

      for (
        let index = 0;
        index < self.additionalFieldProperties.length;
        index++
      ) {
        const attribute = self.additionalFieldProperties[index];

        self.columnProperties.push(attribute);
      }
    },
    add: function () {
      this.initializeItems();
      this.showAdd = true;
    },
    setColumnProperties: function (column) {
      const self = this;
      let values = {};

      if (
        typeof self.properties[self.fieldProperty] !== "undefined" &&
        typeof self.properties[self.fieldProperty].length !== "undefined"
      ) {
        for (
          let index = 0;
          index < self.properties[self.fieldProperty].length;
          index++
        ) {
          if (self.properties[self.fieldProperty][index].name === column.name) {
            values = JSON.parse(
              JSON.stringify(self.properties[self.fieldProperty][index])
            );

            break;
          }
        }
      }

      for (let index = 0; index < self.fields.length; index++) {
        const field = self.fields[index];

        if (field.name === column.name) {
          self.properties[self.fieldProperty];

          break;
        }
      }

      for (const key in self.columnProperties) {
        if (Object.hasOwnProperty.call(self.columnProperties, key)) {
          const attribute = self.columnProperties[key];

          if (typeof values[attribute.name] !== "undefined") {
            column[attribute.name] = values[attribute.name];
          } else if (
            typeof column[attribute.name] === "undefined" &&
            typeof attribute.value !== "undefined"
          ) {
            column[attribute.name] = attribute.value;
          }
        }
      }

      self.showColumnProperties = true;
      self.currentColumn = column;
    },
    save: function () {
      const self = this;

      self.showAdd = false;

      self.$emit(
        "change",
        self.fieldProperty,
        self.fields.map(function (item) {
          return JSON.parse(JSON.stringify(item));
        })
      );
    }
  }
};
</script>
