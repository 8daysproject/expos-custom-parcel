<template>
  <router-view></router-view>
</template>

<script>
// import SignIn from "@/components/SignIn.vue";
// import SideBar from "@/components/SideBar.vue";
// import TopBar from "@/components/TopBar.vue";
// import ScrollToTop from "@/components/ScrollToTop.vue";

export default {
  components: {
    // SignIn,
    // SideBar,
    // TopBar,
    // ScrollToTop
  },
  data: function () {
    return {
      appName: "ExPOS",
      signedIn: false,
      userName: "Inanta Martsanto",
      isSideBarToggled: false,
      topBarNotification: [
        {
          id: "1",
          href: "#",
          message: "A new monthly report is ready to download!",
          date: "December 12, 2009",
          icon: "fas fa-file-alt"
        },
        {
          id: "2",
          href: "#",
          message: "$290.29 has been deposited into your account!",
          date: "December 7, 2009",
          icon: "fas fa-file-alt"
        },
        {
          id: "3",
          href: "#",
          message:
            "Spending Alert: We've noticed unusually high spending for your account.",
          date: "December 2, 2009",
          icon: "fas fa-file-alt"
        }
      ],
      topBarMessage: [
        {
          id: "1",
          href: "#",
          from: "Emily Fowler",
          message:
            "Hi there! I am wondering if you can help me with a problem I've been having.",
          date: "December 12, 2009",
          icon: import("@/assets/undraw_profile.svg")
        },
        {
          id: "2",
          href: "#",
          from: "Jae Chun",
          message:
            "I have the photos that you ordered last month, how would you like them sent to you?",
          date: "December 7, 2009",
          icon: import("@/assets/undraw_profile_1.svg")
        },
        {
          id: "3",
          href: "#",
          from: "Morgan Alvarez ",
          message:
            "Last month's report looks great, I am very happy with the progress so far, keep up the good work!",
          date: "December 2, 2009",
          icon: import("@/assets/undraw_profile_2.svg")
        },
        {
          id: "4",
          href: "#",
          from: "Chicken the Dog",
          message:
            "Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...",
          date: "December 2, 2009",
          icon: import("@/assets/undraw_profile_3.svg")
        }
      ],
      sideBarMenu: [
        {
          name: "Dashboard",
          icon: "fas fa-fw fa-tachometer-alt",
          isHidden: true,
          item: []
        },
        "separator",
        {
          name: "Components",
          heading: "Interface",
          icon: "fas fa-fw fa-cog",
          isHidden: true,
          itemHeading: "Custom Components",
          item: [
            { text: "Buttons", link: "#/about" },
            { text: "Cards", link: "#/" }
          ]
        },
        {
          name: "Utilities",
          icon: "fas fa-fw fa-wrench",
          isHidden: true,
          // itemHeading: "Custom Utilities",
          item: [
            { text: "Sub Menu 1", link: "#/about" },
            { text: "Sub Menu 2", link: "#/" }
          ]
        },
        "separator",
        {
          name: "Table",
          icon: "fas fa-table"
        },
        "separator",
        {
          name: "User",
          icon: "fas fa-user"
        },
        "separator"
      ],
      copyright: "8 Days Project 2020"
    };
  },
  mounted: function () {
    // console.log(this.$store);
    // console.log(localStorage.getItem("token"));

    // if (!this.$store.state.signedIn) {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signin");
    }
  },
  methods: {
    addMenu: function () {
      let currentSideBarMenu = JSON.parse(JSON.stringify(this.sideBarMenu));
      // let currentSideBarMenu = this.sideBarMenu;

      currentSideBarMenu.push({
        name: "User",
        icon: "fas fa-user"
      });

      this.sideBarMenu = currentSideBarMenu;

      console.log("Click", this.sideBarMenu);
    }
  }
};
</script>

<style lang="scss"></style>
