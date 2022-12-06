<template>
  <drop-down>
    <div class="flex items-center">
      <span
        class="flex hover:text-gray-600 items-center px-3 h-16 text-gray-400 text-sm"
        href="#"
      >
        {{ userName }}
      </span>
      <img class="h-8 rounded-full w-8" src="../assets/undraw_profile.svg" />
    </div>
    <template v-slot:content>
      <drop-down-item>
        <div class="py-1 px-6 text-gray-400 text-sm w-40">
          <i class="fas fa-user"></i> Profile
        </div>
      </drop-down-item>
      <drop-down-divider></drop-down-divider>
      <drop-down-item to="/signout">
        <div class="py-1 px-6 text-gray-400 text-sm w-40">
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </div>
      </drop-down-item>
    </template>
  </drop-down>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
import DropDownItem from "@/components/DropDownItem.vue";
import DropDownDivider from "@/components/DropDownDivider.vue";

export default {
  components: {
    DropDown,
    DropDownItem,
    DropDownDivider
  },
  name: "UserDropDown",
  props: {
    userName: String
  }
};
</script>
