<template>
  <div v-closable="close" class="inline-block relative">
    <a @click="isHidden = !isHidden" href="javascript:void(0)">
      <slot></slot>
    </a>
    <div
      :class="{ hidden: isHidden, inline: !isHidden, 'py-2': !hasHeader }"
      class="absolute bg-white rounded shadow right-0"
    >
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  data: function () {
    return {
      isHidden: true
    };
  },
  computed: {
    hasHeader: function () {
      return typeof this.$slots.header === "undefined" ? false : true;
    }
  },
  methods: {
    close: function () {
      this.isHidden = true;
    }
  },
  directives: {
    closable: {
      mounted: function (el, binding) {
        el.handleOutsideClick = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            binding.value();
          }
        };

        document.addEventListener("click", el.handleOutsideClick);
        document.addEventListener("touchstart", el.handleOutsideClick);
      },
      unmounted: function (el) {
        document.removeEventListener("click", el.handleOutsideClick);
        document.removeEventListener("touchstart", el.handleOutsideClick);
      }
    }
  }
};
</script>
