<template>
  <div class="text-center hidden md:inline">
    <button
      @click="toggle"
      class="bg-white/20 border-0 h-10 mb-2 rounded-full text-center w-10 hover:bg-white/40"
    >
      <i
        :class="{
          'fa-angle-left': !isSideBarToggled,
          'fa-angle-right': isSideBarToggled
        }"
        class="fas text-white/50"
      ></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "SideBarToggler",
  data: function () {
    return {};
  },
  props: {
    toggled: Boolean
  },
  computed: {
    isSideBarToggled: function () {
      return this.$store.state.isSideBarToggled;
    }
  },
  methods: {
    toggle: function () {
      this.$store.commit("toggleSideBar");
    }
  }
};
</script>

<style scoped lang="scss"></style>
