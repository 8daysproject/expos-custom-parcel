<template>
  <div class="bg-primary font-bold p-1.5 rounded-t text-white">
    Database Fields
  </div>
  <div class="border border-primary">
    <div
      v-for="(column, index) in columns"
      @dragend.self="endDrag"
      @dragstart.self="startDrag($event, index)"
      :class="{ 'select-none': column.is_added }"
      :draggable="column.is_added ? 'false' : 'true'"
      :key="column.name"
      class="cursor-move px-2 py-0.5"
    >
      <div
        :class="{
          'text-gray-200': column.is_added
        }"
      >
        <i class="fas fa-database"></i> {{ column.name }}
      </div>
    </div>
  </div>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "DatabaseFieldElementPanel",
  emits: {
    "add-element": null
  },
  data: function () {
    return {
      columns: []
    };
  },
  props: {
    table: String
  },
  watch: {
    table: function (value) {
      let self = this;

      AppBuilder.getTableColumns(value, function (data) {
        self.columns.splice(0);

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          self.columns.push({ name: element, is_added: false });
        }

        self.selectedPrimaryKey = "";
      });
    }
  },
  mounted: function () {
    console.log("MOUNTED", this.table);
  },
  methods: {}
};
</script>
