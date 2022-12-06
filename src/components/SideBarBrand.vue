<template>
  <li>
    <router-link
      class="sidebar-brand flex items-center justify-center h-18 text-md font-bold uppercase text-white"
      :to="{ path: '/' }"
    >
      <slot name="logo">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink text-3xl"></i>
        </div>
      </slot>
      <div :class="{ hidden: isSideBarToggled }" class="mx-3">
        <slot>8 Days Project</slot>
      </div>
    </router-link>

    <!-- Divider -->
    <hr class="border-white m-4 mt-0 opacity-10 my-0" />
  </li>
</template>

<script>
export default {
  name: "SideBarBrand",
  computed: {
    isSideBarToggled: function () {
      return this.$store.state.isSideBarToggled;
    }
  }
};
</script>

<style scoped lang="scss"></style>
