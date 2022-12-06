<template>
  <!-- Page Wrapper -->
  <div class="flex">
    <!-- Sidebar -->
    <!-- <side-bar
      @toggle="isSideBarToggled = !isSideBarToggled"
      :menu="sideBarMenu"
      :toggled="isSideBarToggled"
    > -->
    <side-bar>
      <template v-slot:logo>
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-user text-3xl"></i>
        </div>
      </template>
      <sup>8</sup>D Project
    </side-bar>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div class="flex flex-col w-full">
      <!-- Main Content -->
      <div class="flex-grow flex-shrink-0">
        <!-- Topbar -->
        <top-bar></top-bar>
        <!-- <top-bar
          :user-name="userName"
          :notification="topBarNotification"
          :message="topBarMessage"
        ></top-bar> -->
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Page Heading -->
          <router-view />
        </div>
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="bg-white flex-shrink-0 py-8 shadow">
        <div class="my-auto">
          <div class="my-auto text-center text-gray-400 text-xs">
            <span>Copyright &copy; {{ copyright }}</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <scroll-to-top></scroll-to-top>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";

export default {
  name: "Home",
  components: {
    SideBar,
    TopBar,
    ScrollToTop
  },
  computed: {
    copyright: function () {
      return this.$store.state.copyright;
    }
  }
};
</script>
