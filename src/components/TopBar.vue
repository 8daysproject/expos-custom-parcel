<template>
  <nav
    class="navbar-expand navbar-lightr relative flex items-center bg-white mb-4 static-top shadow py-2 px-8 h-18"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <button
      id="sidebarToggleTop"
      class="btn btn-link d-md-none rounded-full mr-3 md:hidden"
    >
      <i class="fa fa-bars"></i>
    </button>

    <!-- Topbar Search -->
    <top-bar-search></top-bar-search>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto flex flex-row">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
      <li class="dropdown no-arrow sm:hidden">
        <a
          class="dropdown-toggle"
          href="#"
          id="searchDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-search fa-fw"></i>
        </a>
        <!-- Dropdown - Messages -->
        <div
          class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
          aria-labelledby="searchDropdown"
        >
          <form class="form-inline mr-auto w-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <li>
        <notification-drop-down
          :notification="notification"
        ></notification-drop-down>
      </li>

      <!-- Nav Item - Messages -->
      <li>
        <message-drop-down :message="message"></message-drop-down>
      </li>

      <li class="border-gray-300 border-r hidden m-3 w-0 sm:block"></li>

      <!-- Nav Item - User Information -->
      <li>
        <user-drop-down :user-name="userName"></user-drop-down>
      </li>
    </ul>
  </nav>
</template>

<script>
import TopBarSearch from "@/components/TopBarSearch.vue";
import NotificationDropDown from "@/components/NotificationDropDown.vue";
import MessageDropDown from "@/components/MessageDropDown.vue";
import UserDropDown from "@/components/UserDropDown.vue";

export default {
  components: {
    TopBarSearch,
    NotificationDropDown,
    MessageDropDown,
    UserDropDown
  },
  name: "TopBar",
  data: function () {
    return {};
  },
  props: {
    notification: Array,
    message: Array
    // userName: String
  },
  computed: {
    userName: function () {
      return this.$store.state.userName;
    }
  },
  mounted: function () {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
