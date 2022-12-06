import { createStore } from "vuex";

export default createStore({
  state: function () {
    return {
      appName: "ExPOS",
      isSignedIn: false,
      userName: "Administrator",
      topBarNotification: [
        // {
        //   id: "1",
        //   href: "#",
        //   message: "A new monthly report is ready to download!",
        //   date: "December 12, 2009",
        //   icon: "fas fa-file-alt"
        // },
        // {
        //   id: "2",
        //   href: "#",
        //   message: "$290.29 has been deposited into your account!",
        //   date: "December 7, 2009",
        //   icon: "fas fa-file-alt"
        // },
        // {
        //   id: "3",
        //   href: "#",
        //   message:
        //     "Spending Alert: We've noticed unusually high spending for your account.",
        //   date: "December 2, 2009",
        //   icon: "fas fa-file-alt"
        // }
      ],
      topBarMessage: [
        // {
        //   id: "1",
        //   href: "#",
        //   from: "Emily Fowler",
        //   message:
        //     "Hi there! I am wondering if you can help me with a problem I've been having.",
        //   date: "December 12, 2009",
        //   icon: require("@/assets/undraw_profile.svg")
        // },
        // {
        //   id: "2",
        //   href: "#",
        //   from: "Jae Chun",
        //   message:
        //     "I have the photos that you ordered last month, how would you like them sent to you?",
        //   date: "December 7, 2009",
        //   icon: require("@/assets/undraw_profile_1.svg")
        // },
        // {
        //   id: "3",
        //   href: "#",
        //   from: "Morgan Alvarez ",
        //   message:
        //     "Last month's report looks great, I am very happy with the progress so far, keep up the good work!",
        //   date: "December 2, 2009",
        //   icon: require("@/assets/undraw_profile_2.svg")
        // },
        // {
        //   id: "4",
        //   href: "#",
        //   from: "Chicken the Dog",
        //   message:
        //     "Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...",
        //   date: "December 2, 2009",
        //   icon: require("@/assets/undraw_profile_3.svg")
        // }
      ],
      isSideBarToggled: false,
      sideBarMenu: [
        {
          name: "Dashboard",
          icon: "fas fa-fw fa-tachometer-alt",
          url: "/dashboard",
          isHidden: true,
          item: []
        },
        "separator",
        {
          // heading: "Master Data",
          name: "Master Data",
          icon: "fas fa-fw fa-list",
          url: "",
          isHidden: true,
          // itemHeading: "Sistem",
          item: [
            { text: "Pengguna", url: "/app/view/pengguna" },
            { text: "Distributor", url: "/app/view/distributor" },
            { text: "Produk", url: "/app/view/produk" },
            { text: "Konsumen", url: "/app/view/konsumen" },
            { text: "Pegawai", url: "/app/view/pegawai" },
            { text: "Bahan Baku", url: "/app/view/bahan-baku" },
            { text: "Tipe Pembayaran", url: "/app/view/tipe-pembayaran" },
            { text: "Jenis Harga", url: "/app/view/jenis-harga" },
            { text: "Satuan", url: "/app/view/satuan" }
          ]
        },
        {
          name: "Transaksi",
          icon: "fas fa-shopping-cart",
          url: "",
          isHidden: true,
          item: [
            { text: "Permintaan Barang", url: "/app/view/permintaan-barang" },
            { text: "Surat Jalan", url: "/app/view/surat-jalan" },
            { text: "Retur Penjualan", url: "/app/view/retur-penjualan" }
          ]
        },
        {
          name: "Laporan",
          icon: "fas fa-file",
          url: "",
          isHidden: true,
          // itemHeading: "Laporan Produksi",
          item: [
            {
              text: "Rekapitulasi Produksi",
              url: "/report/view/rekapitulasi-produksi"
            },
            {
              text: "Perhitungan Upah",
              url: "/report/view/perhitungan-upah"
            },
            {
              text: "Rekapitulasi Produksi",
              url: "/report/view/rekapitulasi-produksi"
            },
            {
              text: "Rincian Pengiriman",
              url: "/report/view/rincian-pengiriman"
            },
            {
              text: "Rincian Pengiriman Per Pelanggan",
              url: "/report/view/rincian-pengiriman-per-pelanggan"
            }
          ]
        },
        "separator",
        {
          heading: "Sistem",
          name: "Catatan Pesan Sistem",
          icon: "fas fa-fw fa-pencil",
          url: "/app/view/catatan-pesan-sistem",
          isHidden: true,
          itemHeading: "App Builder Action"
        },
        {
          heading: "Developer",
          name: "App Builder",
          icon: "fas fa-fw fa-cog",
          url: "",
          isHidden: true,
          itemHeading: "App Builder Action",
          item: [
            { text: "Create", url: "/appbuilder/build" },
            { text: "View", url: "/appbuilder/view" }
          ]
        },
        {
          name: "Report Builder",
          icon: "mdi mdi-poll",
          url: "",
          isHidden: true,
          itemHeading: "Report Builder Action",
          item: [
            { text: "Create", url: "/reportbuilder/build" },
            { text: "View", url: "/reportbuilder/view" }
          ]
        },
        // {
        //   name: "App Test",
        //   icon: "fas fa-fw fa-wrench",
        //   url: "",
        //   isHidden: true,
        //   item: [
        //     { text: "Profile", url: "/app/insert/master-data-pengguna" },
        //     { text: "Setting", url: "/app/view/master-data-pengguna" }
        //   ]
        // },
        // "separator",
        // {
        //   name: "Table",
        //   icon: "fas fa-table",
        //   url: "/"
        // },
        // "separator",
        // {
        //   name: "User",
        //   icon: "fas fa-user",
        //   url: "/"
        // },
        "separator"
      ],
      copyright: "8 Days Project 2020"
    };
  },
  mutations: {
    signIn: function (state) {
      state.isSignedIn = true;
    },
    toggleSideBar(state) {
      state.isSideBarToggled = !state.isSideBarToggled;
    }
  },
  actions: {},
  modules: {}
});
