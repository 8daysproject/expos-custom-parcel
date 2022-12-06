<template>
  <li
    v-for="(menu, index) in sideBarMenu"
    :key="menu.name"
    class="overflow-hidden relative"
  >
    <template v-if="typeof menu === 'object'">
      <div
        v-if="menu.heading"
        class="text-white uppercase px-4 text-xs font-extrabold opacity-70"
      >
        {{ menu.heading }}
      </div>
      <router-link
        @click="collapseMenu(menu)"
        :class="{
          'pt-0': !menu.heading && index != 0,
          'text-center': isSideBarToggled
        }"
        class="text-white block text-left p-4 text-sm opacity-70"
        :to="menu.url"
      >
        <i :class="menu.icon" class="mr-1"></i>&nbsp;
        <span :class="{ 'block text-xs': isSideBarToggled }">{{
          menu.name
        }}</span>
        <span
          v-if="menu.item && menu.item.length > 0"
          :class="{ hidden: isSideBarToggled }"
          class="float-right leading-none text-center text-lg w-4"
        >
          <i
            :class="{
              'fa-angle-right': menu.isHidden,
              'fa-angle-down': !menu.isHidden
            }"
            class="fas"
          ></i>
        </span>
      </router-link>
      <div
        v-if="menu.item && menu.item.length > 0"
        :class="{
          hidden: isSideBarToggled,
          'max-h-0': menu.isHidden,
          'max-h-96': !menu.isHidden
        }"
        class="mx-4 transition-all ease-in-out duration-300"
      >
        <div
          :class="{ 'm-0': menu.isHidden, 'mb-4': !menu.isHidden }"
          class="bg-white py-2 rounded"
        >
          <h6
            v-if="menu.itemHeading"
            class="uppercase py-2 px-6 text-gray-400 text-xs font-extrabold opacity-70"
          >
            {{ menu.itemHeading }}
          </h6>
          <router-link
            v-for="item in menu.item"
            :key="item.name"
            :to="item.url"
            class="block py-2 px-6 text-sm"
            >{{ item.text }}</router-link
          >
        </div>
      </div>
    </template>
    <template v-else-if="menu === 'separator'">
      <hr class="border-white m-4 mt-0 opacity-10" />
    </template>
  </li>
</template>

<script>
export default {
  name: "SideBarMenu",
  props: {
    menu: Array,
    toggled: Boolean
  },
  computed: {
    sideBarMenu: function () {
      return this.$store.state.sideBarMenu;
    },
    isSideBarToggled: function () {
      return this.$store.state.isSideBarToggled;
    }
  },
  methods: {
    collapseMenu: function (current) {
      if (current.item && current.item.length > 0) {
        for (let index = 0; index < this.sideBarMenu.length; index++) {
          let hasCollapsible =
            this.sideBarMenu[index].item &&
            this.sideBarMenu[index].item.length > 0;

          if (hasCollapsible && this.sideBarMenu[index] !== current) {
            this.sideBarMenu[index].isHidden = true;
          }
        }

        current.isHidden = !current.isHidden;
      }
    }
  }
};
</script>
