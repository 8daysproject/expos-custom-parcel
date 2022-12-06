<template>
  <drop-down>
    <span
      class="relative flex items-center px-3 h-16 text-gray-300 hover:text-gray-600"
      href="#"
    >
      <i class="fas fa-envelope fa-fw"></i>
      <!-- Counter - Alerts -->
      <span
        class="text-white py-0.5 px-1.5 inline-block rounded-lg text-lg absolute transform scale-50 origin-top-right bg-red-500"
        >{{ topBarMessage.length }}</span
      >
    </span>
    <template v-slot:header
      ><h6
        class="bg-primary py-3 px-6 font-bold rounded-t text-xs text-white uppercase"
      >
        Message Center
      </h6>
    </template>
    <template v-slot:content>
      <drop-down-item
        v-for="message in topBarMessage"
        :key="message.id"
        :href="message.href"
      >
        <div
          class="border border-gray-200 border-t-0 flex items-center py-2 px-6 w-80"
        >
          <div class="mr-3 flex-shrink-0 relative">
            <img class="h-10 rounded-full w-10" :src="message.icon" alt="..." />
            <div
              class="absolute bg-green-500 bottom-0 border-2 border-white h-3 w-3 right-0 rounded-full"
            ></div>
          </div>
          <div class="block overflow-hidden">
            <div class="font-bold text-sm truncate">
              {{ message.message }}
            </div>
            <div class="text-gray-500 text-xs">
              {{ message.from }} &middot; {{ message.date }}
            </div>
            <!-- <span class="block font-bold text-sm">{{ message.message }}</span> -->
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
  name: "MessageDropDown",
  props: {
    message: Array
  },
  computed: {
    topBarMessage: function () {
      return this.$store.state.topBarMessage;
    }
    // messages: function () {
    //   return this.message;
    // }
  }
};
</script>
