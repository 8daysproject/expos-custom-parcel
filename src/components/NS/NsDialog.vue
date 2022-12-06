<template>
  <Teleport to="body">
    <div
      v-show="isShown"
      class="backdrop-blur-sm bg-white/30 fixed h-full left-0 overflow-auto top-0 w-full z-10"
    >
      <div
        :style="{ width: modalSize }"
        class="animate__animated animate__slideInUp animate__faster bg-white flex flex-col mx-auto my-7 rounded shadow top-[10%]"
      >
        <div class="bg-primary px-3 py-2 rounded text-lg text-white">
          <slot name="title"></slot>
          <i
            @click="$emit('close')"
            class="fas fa-times cursor-pointer float-right pt-1"
          ></i>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "NsDialog",
  emits: ["close"],
  props: {
    size: String,
    show: Boolean
  },
  data: function () {
    return {
      isShown: false,
      modalSize: "300px"
    };
  },
  watch: {
    show: {
      handler: function (value) {
        this.isShown = value;
      },
      immediate: true
    },
    size: {
      handler: function (value) {
        this.modalSize = value;
      },
      immediate: true
    }
  },
  mounted: function () {},
  methods: {
    shown: function () {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
