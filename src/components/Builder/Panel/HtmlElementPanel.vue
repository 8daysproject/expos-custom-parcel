<template>
  <div class="bg-primary font-bold p-1.5 rounded-t text-white">
    HTML Elements
  </div>
  <div class="border border-primary">
    <div
      v-for="(element, index) in htmlElements"
      @dragstart="startDrag($event, element)"
      :key="index"
      class="cursor-move px-2 py-0.5"
      draggable="true"
    >
      <div><i :class="element.icon" class="fas"></i> {{ element.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HtmlElementPanel",
  emits: {
    dragstart: null
  },
  data: function () {
    return {
      htmlElements: [
        {
          content: "Heading",
          name: "Heading",
          tag: "h1",
          icon: "mdi mdi-format-title"
        },
        {
          name: "Image",
          tag: "img",
          icon: "mdi mdi-image"
        },
        {
          content: "Text",
          name: "Text",
          tag: "p",
          icon: "mdi mdi-alphabetical-variant"
        },
        {
          content: "Horizontal Line",
          name: "Horizontal Line",
          tag: "hr",
          icon: "mdi mdi-minus"
        },
        {
          content: "Grid",
          name: "Grid",
          tag: "grid-input",
          icon: "mdi mdi-grid"
        },
        {
          content: "One To Many Input",
          name: "One To Many Input",
          tag: "one-to-many-input",
          icon: "mdi mdi-relation-one-to-many"
        }
      ]
    };
  },
  methods: {
    startDrag: function ($event, element) {
      this.$emit("dragstart", $event, {
        content: element.content,
        element: element.tag,
        name: element.name,
        type: "html"
      });
    }
  }
};
</script>
