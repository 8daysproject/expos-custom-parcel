<template>
  <div v-if="!isHidden" class="absolute p-1.5 right-0 text-xs top-0 z-10">
    <a
      @click="$emit('remove')"
      @dragstart.prevent
      class="bg-red-600 h-6 ml-1 p-1 inline-block rounded text-center w-6"
      href="javascript:;"
    >
      <i class="fas fa-times text-white"></i>
    </a>
    <a
      @click="$emit('remove')"
      class="bg-blue-600 h-6 ml-1 p-1 inline-block rounded text-center w-6"
      href="javascript:;"
    >
      <i class="fas fa-arrows-alt text-white"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "FieldTooBar",
  emits: { remove: null },
  props: {
    hidden: Boolean
  },
  computed: {
    isHidden: function () {
      return this.hidden;
    }
  }
};
</script>
