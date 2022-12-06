<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__slideInRight animate__faster"
    leave-active-class="animate__animated animate__slideOutRight animate__faster"
  >
    <div v-if="isShown" class="absolute bg-white h-full left-0 top-0 w-full">
      <div
        class="bg-primary grid grid-cols-2 px-4 py-1.5 rounded text-lg text-white"
      >
        <div class=""><b>Preview</b></div>
        <div class="text-right">
          <a @click="$emit('close')" href="javascript:;"
            ><i class="fas fa-times"></i
          ></a>
        </div>
      </div>
      <hr class="border-top border-gray-300 my-4" />
      <template
        v-for="(container, index) in previewContainers"
        :key="container.name"
      >
        <div v-if="index == selectedContainer" class="flex-grow flex-shrink">
          <div class="">
            <div
              v-for="(row, row_index) in container.rows"
              :class="'grid-cols-' + row.grid"
              :key="row_index"
              class="grid gap-0"
            >
              <template
                v-for="(column, column_index) in row.columns"
                :key="column_index"
              >
                <div v-if="column.type != 'empty'">
                  <field-preview :properties="column"></field-preview>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import FieldPreview from "@/components/AppBuilder/FieldPreview.vue";

export default {
  name: "AppPreview",
  components: {
    FieldPreview
  },
  props: {
    show: Boolean,
    containers: Object
  },
  data: function () {
    return {
      selectedContainer: 0
    };
  },
  computed: {
    isShown: function () {
      return this.show;
    },
    previewContainers: function () {
      return this.containers;
    }
  },
  methods: {}
};
</script>
