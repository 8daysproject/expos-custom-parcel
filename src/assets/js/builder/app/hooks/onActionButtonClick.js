import customPrint from "@/assets/js/customPrint.js";

export default {
  "print-invoice": function (app, button, item) {
    console.log(app, button, item);

    customPrint.printInvoice();
  },
  "print-order": function (app, button, item) {
    console.log(app, button, item);

    customPrint.printOrder();
  }
};
