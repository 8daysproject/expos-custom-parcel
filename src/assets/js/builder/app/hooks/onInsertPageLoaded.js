import DB from "@/assets/js/DB.js";

export default {
  "permintaan-barang": async function (app) {
    const dt = new Date();

    app.values.time =
      dt.getFullYear() +
      "-" +
      (dt.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      dt.getDate().toString().padStart(2, "0");

    const last_record = await DB.getLast(app.app.table);

    let increment = 0;

    try {
      const string_id = last_record.id.replace("id-", "");
      increment = parseInt(string_id) + 1;
    } catch (error) {
      increment = 1;
    }

    app.values.code = "SJ-" + increment.toString().padStart(4, "0");
  },
  "surat-jalan": async function (app) {
    const dt = new Date();

    app.values.time =
      dt.getFullYear() +
      "-" +
      (dt.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      dt.getDate().toString().padStart(2, "0");

    const last_record = await DB.getLast(app.app.table);

    let increment = 0;

    try {
      const string_id = last_record.id.replace("id-", "");
      increment = parseInt(string_id) + 1;
    } catch (error) {
      increment = 1;
    }

    app.values.code = "SJ-" + increment.toString().padStart(4, "0");
  }
};
