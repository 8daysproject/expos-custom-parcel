<template>
  <ul
    :class="{
      'w-56': !isSideBarToggled,
      'w-24': isSideBarToggled
    }"
    class="bg-primary flex flex-col flex-shrink-0 min-h-screen transition-all ease duration-150"
  >
    <side-bar-brand :toggled="toggled">
      <template v-slot:logo>
        <slot name="logo"></slot>
      </template>
      <slot></slot>
    </side-bar-brand>
    <side-bar-menu :toggled="toggled"></side-bar-menu>
    <li class="mb-4 text-center">
      <side-bar-toggler :toggled="toggled" @toggle="toggle"></side-bar-toggler>
    </li>
  </ul>
</template>

<script>
import SideBarBrand from "@/components/SideBarBrand.vue";
import SideBarMenu from "@/components/SideBarMenu.vue";
import SideBarToggler from "@/components/SideBarToggler.vue";

export default {
  components: {
    SideBarBrand,
    SideBarMenu,
    SideBarToggler
  },
  name: "SideBar",
  props: {
    menu: Array,
    toggled: Boolean
  },
  computed: {
    isSideBarToggled: function () {
      return this.$store.state.isSideBarToggled;
    }
  },
  methods: {
    toggle: function () {
      this.$emit("toggle");
    }
  }
};
</script>
