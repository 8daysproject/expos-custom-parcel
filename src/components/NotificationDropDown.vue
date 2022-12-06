<template>
  <drop-down>
    <span
      class="relative flex items-center px-3 h-16 text-gray-300 hover:text-gray-600"
      href="#"
    >
      <i class="fas fa-bell fa-fw"></i>
      <!-- Counter - Alerts -->
      <span
        class="text-white py-0.5 px-1.5 inline-block rounded-lg text-lg absolute transform scale-50 origin-top-right bg-red-500"
        >{{ topBarNotification.length }}</span
      >
    </span>
    <template v-slot:header
      ><h6
        class="bg-primary py-3 px-6 font-bold rounded-t text-xs text-white uppercase"
      >
        Alerts Center
      </h6>
    </template>
    <template v-slot:content>
      <drop-down-item
        v-for="notification in topBarNotification"
        :key="notification.id"
        :href="notification.href"
      >
        <div
          class="border border-gray-200 border-t-0 flex items-center py-2 px-6 w-80"
        >
          <div class="mr-3">
            <div
              class="bg-primary flex h-10 items-center justify-center rounded-full w-10"
            >
              <i :class="notification.icon" class="text-white"></i>
            </div>
          </div>
          <div class="block">
            <div class="text-gray-500 text-xs">
              {{ notification.date }}
            </div>
            <span class="block font-bold text-sm">{{
              notification.message
            }}</span>
          </div>
        </div>
      </drop-down-item>
      <drop-down-item>
        <div class="leading-6 py-2 text-center text-gray-500 text-xs">
          Show All
        </div>
      </drop-down-item>
    </template>
  </drop-down>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
import DropDownItem from "@/components/DropDownItem.vue";

export default {
  components: {
    DropDown,
    DropDownItem
  },
  name: "NotificationDropDown",
  props: {
    notification: Array
  },
  computed: {
    topBarNotification: function () {
      return this.$store.state.topBarNotification;
    }
    // notifications: function () {
    //   return this.notification;
    // }
  }
};
</script>
