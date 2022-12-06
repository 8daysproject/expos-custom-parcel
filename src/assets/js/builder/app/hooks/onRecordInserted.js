import DB from "@/assets/js/DB.js";

export default {
  "permintaan-barang": async function (app, results) {
    let record = await DB.get(app.app.table, results.id);

    for (let index = 0; index < record.order_request_products.length; index++) {
      const current_product = record.order_request_products[index];

      let product = await DB.get("products", current_product._id);
      product.quantity += parseInt(current_product.qty);

      await DB.update("products", product);
    }

    return true;
  },
  "surat-jalan": function (app, results) {
    console.log("INSERTED", app, results);

    return true;
  }
};
