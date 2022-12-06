<template>
  <a
    v-if="!isHidden"
    @click="scrollToTop"
    @transitionend="transitionEnd"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    class="bg-gray-500/50 bottom-4 fixed inline right-4 rounded-md text-center text-white p-4 leading-4 transition-all ease duration-300"
    href="javascript:void(0)"
  >
    <i class="fas fa-angle-up h-4 w-4"></i>
  </a>
</template>

<script>
export default {
  name: "ScrollToTop",
  data: function () {
    return {
      isHidden: true,
      scrollToTopDistance: 0
    };
  },
  props: {},
  mounted: function () {
    let self = this;

    document.addEventListener("scroll", function () {
      self.scrollToTopDistance = document.documentElement.scrollTop;
      self.isHidden = false;
    });
  },
  computed: {
    isVisible: function () {
      return this.scrollToTopDistance > 100;
    }
  },
  methods: {
    scrollToTop: function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    transitionEnd: function () {
      if (!this.isVisible) {
        this.isHidden = true;
      }
    }
  }
};
</script>
