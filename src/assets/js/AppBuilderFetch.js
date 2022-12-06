import axios from "axios";

const baseURI = "https://preview.8daysproject.com/pvj";

export default {
  data: function (table, columns) {
    const joined_columns = columns.join("/");

    return axios
      .get(baseURI + "/appbuilder/data/" + table + "?columns=" + joined_columns)
      .then(function (data) {
        return data.data;
      });
  },
  delete: async function (apps) {
    let slugs = [];

    for (let index = 0; index < apps.length; index++) {
      const app = apps[index];

      slugs.push(app.slug);
    }
    return axios
      .post(baseURI + "/appbuilder/delete", slugs)
      .then(function (data) {
        return data.data;
      });
  },
  deleteRecords: async function (app, items) {
    for (let index = 0; index < items.length; index++) {
      items[index] = items[index][app.pk];
    }

    return axios
      .post(baseURI + "/appbuilder/deleterecords/" + app.slug, {
        items
      })
      .then(function (data) {
        return data.data;
      });
  },
  getColumns: function (slug) {
    console.log(slug);
  },
  getTables: async function (current_table) {
    if (typeof current_table === "undefined") {
      current_table = "";
    }

    return axios
      .get(
        baseURI +
          "/appbuilder/tables" +
          (current_table === "" ? "" : "/" + current_table)
      )
      .then(function (data) {
        return data.data;
      });
  },
  getTableColumns: async function (table) {
    return axios
      .get(baseURI + "/appbuilder/columns/" + table)
      .then(function (data) {
        return data.data;
      });
  },
  get: function (slug, is_included_metadata) {
    return axios
      .get(
        baseURI +
          "/appbuilder/app/" +
          slug +
          (typeof is_included_metadata !== "undefined" &&
          is_included_metadata == true
            ? "?builder=true"
            : "")
      )
      .then(function (data) {
        return data.data;
      });
  },
  getAll: function () {
    return axios.get(baseURI + "/appbuilder/apps").then(function (data) {
      return {
        headers: data.data.headers,
        items: data.data.items,
        app_id_column: data.data.app_id_column
      };
    });
  },
  save: function (app) {
    return axios
      .post(baseURI + "/appbuilder/save", {
        app
      })
      .then(function (data) {
        return data.data;
      });
  },
  getAllRecord(app, parameters) {
    if (typeof parameters === "undefined") {
      // parameters = { per_page: 15, page: 1 };
      parameters = {};
    }

    const query_string = new URLSearchParams(parameters).toString();

    return axios
      .get(
        baseURI +
          "/appbuilder/records/" +
          app +
          (query_string === "" ? "" : "?" + query_string)
      )
      .then(function (data) {
        return data.data;
      });
  },
  getRecord(slug, id) {
    return axios
      .get(baseURI + "/appbuilder/record/" + slug + "/" + id)
      .then(function (data) {
        return data.data.record;
      });
  },
  insertRecord: function (app, data) {
    return axios
      .post(baseURI + "/appbuilder/saverecord/" + app.slug, data)
      .then(function (data) {
        return data.data;
      });
  },
  settings: function (app, settings) {
    return axios
      .post(baseURI + "/appbuilder/settings/" + app.slug, settings)
      .then(function (data) {
        return data.data;
      });
  },
  updateRecord: function (app, data) {
    return axios
      .post(baseURI + "/appbuilder/updaterecord/" + app.slug, data)
      .then(function (data) {
        return data.data;
      });
  }
};
