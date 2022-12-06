<template>
  <div
    v-closable="closeChildMenu"
    class="inline-block relative"
    :title="$attrs.title"
  >
    <button
      @click="onButtonClick"
      ref="button"
      v-bind="$attrs"
      :class="{ 'rounded-r-none': hasChild }"
    >
      <slot name="content">
        <span class="">Button</span>
      </slot>
    </button>
    <button
      v-if="split && hasChild"
      v-bind="$attrs"
      @click="isMenuShown = !isMenuShown"
      class="ml-0 rounded-l-none rounded-r text-white"
    ></button>
    <div
      v-if="isMenuShown"
      class="absolute bg-white mt-1 rounded shadow min-w-max z-10"
      :class="{ 'left-0': align === 'left', 'right-0': align === 'right' }"
      :style="childMargin"
    >
      <ul @click="onChildMenuClick" class="inline">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownButton",
  inheritAttrs: false,
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
  },
  emits: {
    // click: null
  },
  props: {
    align: {
      type: String,
      default: "left"
    },
    split: {
      type: Boolean,
      default: true
    }
    // title: String
  },
  data: function () {
    return {
      isMenuShown: false
    };
  },
  computed: {
    childMargin: function () {
      const style =
        this.$refs.button.currentStyle ||
        window.getComputedStyle(this.$refs.button);

      return {
        "margin-left": style.marginLeft,
        "margin-right": style.marginRight
      };
    },
    hasChild: function () {
      return !!this.$slots.default;
    }
  },
  watch: {
    align: function (value) {
      console.log("ALIGN", value);
    }
  },
  methods: {
    closeChildMenu: function () {
      const self = this;

      setTimeout(function () {
        self.isMenuShown = false;
      }, 100);
    },
    onButtonClick: function () {
      const self = this;

      if (!self.split) {
        self.isMenuShown = !self.isMenuShown;
      }
    },
    onChildMenuClick: function () {
      this.closeChildMenu();
    }
  }
};
</script>

<style scoped>
div button:nth-child(2)::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
</style>
