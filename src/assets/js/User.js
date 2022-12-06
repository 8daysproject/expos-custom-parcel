import md5 from "md5";

import Logger from "@/assets/js/Logger.js";
import DB from "@/assets/js/DB";

export default {
  createDefaultUser: function () {
    DB.get("users", "admin").then(function (results) {
      if (!results) {
        DB.updateOrInsert("users", {
          _id: "admin",
          fullname: "Administrator",
          username: "admin",
          password: md5("admin")
        })
          .then(function () {
            Logger.log("Default user created", "auth");
          })
          .catch(function () {
            Logger.log("Error while creating default user", "auth");

            throw new Error();
          });
      }
    });
  },
  signIn: function (username, password) {
    return DB.getAll("users", ["username", "password"], {
      operator: "and",
      conditions: [
        {
          field: "username",
          condition: "=",
          value: username
        },
        {
          field: "password",
          condition: "=",
          value: md5(password)
        }
      ]
    }).then(function (response) {
      if (response.length > 0) {
        Logger.log("User " + username + " successfully signed in", "auth");
        localStorage.setItem("token", "token");

        return true;
      } else {
        Logger.log(
          "Incorrect username [" +
            username +
            "] and / or password [" +
            password +
            "]",
          "auth"
        );

        return false;
      }
    });
  },
  getAll: function () {
    return DB.getAll("users");
  }
};
