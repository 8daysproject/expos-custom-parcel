<template>
  <div class="mx-4">
    <div class="flex py-2">
      <div class="font-bold my-auto text-xl">{{ app.name }}</div>
      <div class="ml-auto">
        <button @click="save" class="bg-primary px-3 py-2 rounded text-white">
          <i class="fa fa-save"></i> Insert
        </button>
      </div>
    </div>
    <hr />
    ss
  </div>
</template>

<script>
// import axios from "axios";

import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "App",
  data: function () {
    return {
      app: {},
      containers: [],
      appData: {},
      test: "",
      selectedContainer: 0,
      items: []
    };
  },
  props: {},
  mounted: function () {
    this.render(this.$route.params.name);
  },
  watch: {
    $route(to) {
      this.render(to.params.name);
    }
  },
  // computed: {
  //   appName: function () {
  //     return this.$store.state.appName;
  //   }
  // },
  methods: {
    render: function (app) {
      const self = this;

      AppBuilder.get(app).then(function (response) {
        // self.appName = response.name;

        // We need to save thi
        response.db = response.slug;

        // console.log(response);

        AppBuilder.getAllRecord(response).then(function (response) {
          console.log(response);
        });

        self.app = response;
        self.containers.splice(0);

        for (
          let container_index = 0;
          container_index < response.containers.length;
          container_index++
        ) {
          const container = response.containers[container_index];

          self.containers.push(container);

          // for (
          //   let row_index = 0;
          //   row_index < container.rows.length;
          //   row_index++
          // ) {
          //   const row = container.rows[row_index];

          //   for (let index = 0; index < row.columns.length; index++) {
          //     const column = row.columns[index];

          //     self.appData[column.name] = "";
          //   }
          // }
        }

        console.log(self.appData);
      });
    },
    input: function (event) {
      const self = this;

      // console.log(event.target.name);

      self.appData[event.target.name] = event.target.value;
    },
    save: function () {
      const self = this;
      console.log(this.appData);
      console.log(this.test);

      // self.appData._id = Date.now().toString();

      AppBuilder.insertRecord(self.app, self.appData);
    }
  }
};
</script>
