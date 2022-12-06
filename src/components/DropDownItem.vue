<template>
  <router-link :to="internalTo" class="block hover:bg-gray-100">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "DropDownItem",
  props: {
    to: String
  },
  computed: {
    internalTo: function () {
      return !this.to ? "" : this.to;
    }
  }
};
</script>
