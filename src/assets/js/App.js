import DB from "@/assets/js/DB";
import Logger from "@/assets/js/Logger.js";

// PouchDB.plugin(PouchDBFind);

export default {
  initAppDB: function () {
    const apps = [
      {
        name: "Catatan Pesan Sistem",
        slug: "catatan-pesan-sistem",
        table: "logs",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Tipe",
            placeholder: "",
            type: "text",
            name: "type",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "textarea",
            label: "Pesan",
            placeholder: "",
            rows: "3",
            name: "message",
            db_column_index: 2,
            container: 0,
            row: 1,
            column: 0
          }
        ],
        _id: "catatan-pesan-sistem",
        tags: [],
        is_read_only: 1,
        settings: {
          features: {
            import: false,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Tipe Pembayaran",
        slug: "tipe-pembayaran",
        table: "payment_types",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode Tipe Pembayaran",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama",
            placeholder: "",
            type: "text",
            name: "name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          }
        ],
        _id: "tipe-pembayaran",
        action: "tipe-pembayaran",
        tags: [],
        is_read_only: 1,
        id: ""
      },
      {
        name: "Bahan Baku",
        slug: "bahan-baku",
        table: "raw_materials",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama",
            placeholder: "",
            type: "text",
            name: "name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "input",
            label: "Unit",
            placeholder: "",
            type: "text",
            name: "unit",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 4,
            container: 0,
            row: 2,
            column: 0
          }
        ],
        _id: "bahan-baku",
        action: "bahan-baku",
        tags: [],
        settings: {
          features: {
            import: true,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Konsumen",
        slug: "konsumen",
        table: "customers",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama",
            placeholder: "",
            type: "text",
            name: "customer_name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "select",
            label: "Tipe Harga",
            placeholder: "",
            items: {
              label_column: "price_name",
              source: "db",
              table: "price_types",
              value: [
                {
                  element: "option",
                  label: "Harga 3",
                  value: "271564e9-81c2-4422-95e2-6146ad79f5f9"
                },
                {
                  element: "option",
                  label: "Harga 1",
                  value: "8a92ae61-e565-4fc9-a0a9-f9a8ec57cfb7"
                },
                {
                  element: "option",
                  label: "Harga 2",
                  value: "c6535a81-1e7d-4d20-972e-e10844d53944"
                },
                {
                  element: "option",
                  label: "Harga 4",
                  value: "d552aeb7-0086-4a88-9a17-a9a4f36e9296"
                }
              ],
              value_column: "_id"
            },
            name: "price_type_id",
            db_column_index: 3,
            container: 0,
            row: 0,
            column: 2
          },
          {
            element: "textarea",
            label: "Alamat",
            placeholder: "",
            rows: "3",
            name: "address",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "input",
            label: "Telepon",
            placeholder: "",
            type: "text",
            name: "phone",
            db_column_index: 4,
            container: 0,
            row: 2,
            column: 0
          },
          {
            element: "input",
            label: "Email",
            placeholder: "",
            type: "text",
            name: "email",
            db_column_index: 5,
            container: 0,
            row: 2,
            column: 1
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 6,
            container: 0,
            row: 3,
            column: 0
          }
        ],
        related_tables: [
          {
            table: "price_types",
            join_column_1: "price_type_id",
            join_column_2: "_id",
            columns: ["price_name"]
          }
        ],
        _id: "konsumen",
        action: "konsumen",
        tags: [],
        settings: {
          features: {
            import: true,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Pegawai",
        slug: "pegawai",
        table: "employees",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama",
            placeholder: "",
            type: "text",
            name: "employee_name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          }
        ],
        _id: "pegawai",
        action: "pegawai",
        tags: [],
        settings: {
          features: {
            import: true,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Pengguna",
        slug: "pengguna",
        table: "users",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Nama Lengkap",
            placeholder: "",
            type: "text",
            name: "fullname",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0,
            visible: true
          },
          {
            element: "input",
            label: "Nama Pengguna / Username",
            placeholder: "",
            type: "text",
            name: "username",
            db_column_index: 2,
            container: 0,
            row: 1,
            column: 0,
            visible: true
          },
          {
            element: "input",
            label: "Kata Kunci",
            placeholder: "",
            type: "password",
            name: "password",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 1,
            visible: false
          },
          {
            element: "input",
            label: "Email",
            placeholder: "",
            type: "text",
            name: "email",
            db_column_index: 4,
            container: 0,
            row: 2,
            column: 0,
            visible: true
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 5,
            container: 0,
            row: 3,
            column: 0,
            visible: true
          }
        ],
        _id: "pengguna",
        action: "pengguna",
        tags: [],
        settings: {
          features: {
            import: false,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Produk",
        slug: "produk",
        table: "products",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama Produk",
            placeholder: "",
            type: "text",
            name: "product_name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "input",
            label: "Stok",
            placeholder: "",
            type: "text",
            name: "quantity",
            db_column_index: 8,
            container: 0,
            row: 1,
            column: 0,
            align: "right",
            format: "number"
          },
          {
            element: "input",
            label: "Upah",
            placeholder: "",
            type: "text",
            name: "manufacturing_wages",
            db_column_index: 4,
            container: 0,
            row: 1,
            column: 0,
            align: "right",
            format: "currency",
            visible: false
          },
          {
            element: "input",
            label: "Harga 1",
            placeholder: "",
            type: "text",
            name: "price",
            db_column_index: 3,
            container: 0,
            row: 2,
            column: 0,
            align: "right",
            format: "currency"
          },
          {
            element: "input",
            label: "Harga 2",
            placeholder: "",
            type: "text",
            name: "price_alt_1",
            db_column_index: 5,
            container: 0,
            row: 2,
            column: 1,
            align: "right",
            format: "currency"
          },
          {
            element: "input",
            label: "Harga 3",
            placeholder: "",
            type: "text",
            name: "price_alt_2",
            db_column_index: 6,
            container: 0,
            row: 3,
            column: 0,
            align: "right",
            format: "currency"
          },
          {
            element: "input",
            label: "Harga 4",
            placeholder: "",
            type: "text",
            name: "price_alt_3",
            db_column_index: 7,
            container: 0,
            row: 3,
            column: 1,
            align: "right",
            format: "currency"
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 8,
            container: 0,
            row: 4,
            column: 0,
            align: "center",
            visible: false
          }
        ],
        _id: "produk",
        action: "produk",
        tags: [],
        settings: {
          features: {
            import: true,
            export: true
          }
        },
        id: ""
      },
      {
        name: "Permintaan Barang",
        slug: "permintaan-barang",
        table: "order_requests",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Tanggal",
            placeholder: "",
            type: "date",
            name: "time",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1,
            format: "date"
          },
          {
            element: "select",
            label: "Pegawai",
            placeholder: "",
            items: {
              label_column: "employee_name",
              source: "db",
              table: "employees",
              value: [
                {
                  element: "option",
                  label: "Pegawai 1",
                  value: "1669344097625"
                }
              ],
              value_column: "_id"
            },
            name: "employee_id",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "input",
            label: "Upah",
            placeholder: "",
            type: "text",
            name: "manufacturing_wages",
            db_column_index: 4,
            container: 0,
            row: 1,
            column: 1,
            align: "right",
            format: "currency"
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 4,
            container: 0,
            row: 2,
            column: 0,
            align: "center"
          },
          {
            element: "hr",
            container: 0,
            row: 3,
            column: 0
          },
          {
            content: "Daftar Produk",
            element: "h1",
            container: 0,
            row: 4,
            column: 0
          },
          {
            name: "order_request_products",
            "one-to-many-input-placeholder":
              "Ketik Disini Untuk Menambah Barang",
            "one-to-many-input-search-placeholder": "Cari Barang",
            "one-to-many-input-table": {
              table: "products",
              columns: [
                {
                  alias: "_id",
                  checked: true,
                  name: "_id",
                  format: "general",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Kode",
                  checked: true,
                  name: "code"
                },
                {
                  alias: "Nama Produk",
                  checked: true,
                  name: "product_name"
                }
              ],
              search_column: "product_name"
            },
            "one-to-many-input-additional-field": {
              source: "static-label-value",
              value: [
                {
                  label: "Jumlah",
                  value: "qty"
                }
              ]
            },
            "one-to-many-input-additional-field-format": [
              {
                align: "right",
                name: "qty",
                format: "number",
                source: "user",
                function: ""
              }
            ],
            "one-to-many-input-table-empty-placeholder":
              "Belum Ada Produk Ditambahkan",
            element: "one-to-many-input",
            container: 0,
            row: 5,
            column: 0,
            visible: false
          }
        ],
        related_tables: [
          {
            table: "employees",
            join_column_1: "employee_id",
            join_column_2: "_id",
            columns: ["employee_name"]
          }
        ],
        _id: "permintaan-barang",
        tags: [],
        id: ""
      },
      {
        name: "Retur Penjualan",
        slug: "retur-penjualan",
        table: "order_returns",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Tanggal",
            placeholder: "",
            type: "date",
            name: "time",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "select",
            label: "Konsumen",
            placeholder: "",
            items: {
              label_column: "customer_name",
              source: "db",
              table: "customers",
              value: [],
              value_column: "_id"
            },
            name: "customer_id",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "textarea",
            label: "Alamat",
            placeholder: "",
            rows: "3",
            name: "address",
            db_column_index: 5,
            container: 0,
            row: 2,
            column: 0
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 6,
            container: 0,
            row: 2,
            column: 1
          },
          {
            element: "hr",
            container: 0,
            row: 3,
            column: 0
          },
          {
            content: "Daftar Produk",
            element: "h1",
            container: 0,
            row: 4,
            column: 0
          },
          {
            "one-to-many-input-placeholder":
              "Ketik Disini Untuk Menambah Produk",
            "one-to-many-input-search-placeholder": "Cari Produk",
            "one-to-many-input-table": {
              table: "products",
              columns: [
                {
                  alias: "_id",
                  checked: true,
                  name: "_id",
                  format: "general",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Kode",
                  checked: true,
                  name: "code"
                },
                {
                  alias: "Nama Produk",
                  checked: true,
                  name: "product_name",
                  format: "currency",
                  align: "right",
                  visible: false
                },
                {
                  alias: "Harga",
                  checked: true,
                  name: "price"
                }
              ],
              search_column: "product_name"
            },
            "one-to-many-input-additional-field": {
              source: "static-label-value",
              value: [
                {
                  label: "Jumlah",
                  value: "qty"
                }
              ]
            },
            "one-to-many-input-additional-field-format": [
              {
                name: "qty",
                align: "right",
                format: "number",
                source: "user",
                function: ""
              }
            ],
            "one-to-many-input-table-empty-placeholder":
              "Belum Ada Produk Ditambahkan",
            element: "one-to-many-input",
            container: 0,
            row: 5,
            column: 0
          }
        ],
        related_tables: [
          {
            table: "customers",
            join_column_1: "customer_id",
            join_column_2: "_id",
            columns: ["customer_name"]
          }
        ],
        _id: "retur-penjualan",
        tags: [],
        id: ""
      },
      {
        name: "Jenis Harga",
        slug: "jenis-harga",
        table: "price_types",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Jenis Harga",
            placeholder: "",
            type: "text",
            name: "price_name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          }
        ],
        _id: "jenis-harga",
        tags: [],
        id: ""
      },
      {
        name: "Surat Jalan",
        slug: "surat-jalan",
        table: "order",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Tanggal",
            placeholder: "",
            type: "date",
            name: "time",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1,
            format: "date"
          },
          {
            element: "select",
            label: "Konsumen",
            placeholder: "",
            items: {
              label_column: "customer_name",
              source: "db",
              table: "customers",
              value: [
                {
                  element: "option",
                  label: "Konsumen 1",
                  value: "id-00000001"
                },
                {
                  element: "option",
                  label: "Konsumen 2",
                  value: "id-2"
                }
              ],
              value_column: "_id"
            },
            name: "customer_id",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "parent-child-drop-down",
            label: "Jenis Harga",
            "parent-child-drop-down-parent-element": {
              element: "select",
              label: "Konsumen",
              placeholder: "",
              items: {
                label_column: "customer_name",
                source: "db",
                table: "customers",
                value: [
                  {
                    element: "option",
                    label: "Konsumen 1",
                    value: "id-00000001"
                  },
                  {
                    element: "option",
                    label: "Konsumen 2",
                    value: "id-2"
                  }
                ],
                value_column: "_id"
              },
              name: "customer_id",
              db_column_index: 3,
              container: 0,
              row: 1,
              column: 0,
              is_focused: false,
              is_selected: false
            },
            "parent-child-drop-down-parent-source": {
              table: "customers",
              columns: [
                {
                  alias: "_id",
                  checked: true,
                  name: "_id"
                },
                {
                  alias: "price_type_id",
                  checked: true,
                  name: "price_type_id"
                }
              ],
              parent_column: "_id",
              child_column: "price_type_id"
            },
            "parent-child-drop-down-child-source": {
              table: "price_types",
              columns: [
                {
                  alias: "_id",
                  checked: true,
                  name: "_id"
                },
                {
                  alias: "price_name",
                  checked: true,
                  name: "price_name"
                }
              ],
              label_column: "price_name",
              value_column: "_id"
            },
            name: "price_type_id",
            db_column_index: 5,
            container: 0,
            row: 1,
            column: 1
          },
          {
            element: "select",
            label: "Jenis Pembayaran",
            placeholder: "",
            items: {
              label_column: "name",
              source: "db",
              table: "payment_types",
              value: [
                {
                  element: "option",
                  label: "Tunai",
                  value: "id-00000001"
                },
                {
                  element: "option",
                  label: "Kredit",
                  value: "id-2"
                }
              ],
              value_column: "_id"
            },
            name: "payment_type_id",
            db_column_index: 6,
            container: 0,
            row: 2,
            column: 0
          },
          {
            element: "input",
            label: "Diskon (%)",
            placeholder: "",
            type: "text",
            name: "discount",
            db_column_index: 9,
            container: 0,
            row: 2,
            column: 1
          },
          {
            element: "textarea",
            label: "Alamat",
            placeholder: "",
            rows: "3",
            name: "address",
            db_column_index: 7,
            container: 0,
            row: 3,
            column: 0,
            visible: false
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "info",
            db_column_index: 10,
            container: 0,
            row: 3,
            column: 1,
            visible: false
          },
          {
            element: "input",
            label: "Pengirim",
            placeholder: "",
            type: "text",
            name: "sender",
            db_column_index: 8,
            container: 0,
            row: 4,
            column: 0,
            visible: false
          },
          {
            element: "hr",
            container: 0,
            row: 5,
            column: 0
          },
          {
            content: "Barang",
            element: "h1",
            container: 0,
            row: 6,
            column: 0
          },
          {
            name: "order_products",
            "one-to-many-input-placeholder":
              "Ketik Disini Untuk Menambah Barang",
            "one-to-many-input-search-placeholder": "Cari Barang",
            "one-to-many-input-table": {
              table: "products",
              columns: [
                {
                  alias: "_id",
                  checked: true,
                  name: "_id",
                  format: "general",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Kode",
                  checked: true,
                  name: "code",
                  format: "general",
                  align: "left",
                  visible: true
                },
                {
                  alias: "Nama Produk",
                  checked: true,
                  name: "product_name",
                  format: "general",
                  align: "left",
                  visible: true
                },
                {
                  alias: "Harga 1",
                  checked: true,
                  name: "price",
                  format: "currency",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Harga 2",
                  checked: true,
                  name: "price_alt_1",
                  format: "currency",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Harga 3",
                  checked: true,
                  name: "price_alt_2",
                  format: "currency",
                  align: "left",
                  visible: false
                },
                {
                  alias: "Harga 4",
                  checked: true,
                  name: "price_alt_3",
                  format: "currency",
                  align: "left",
                  visible: false
                }
              ],
              search_column: "product_name"
            },
            "one-to-many-input-additional-field": {
              source: "static-label-value",
              value: [
                {
                  label: "Harga",
                  value: "customer_price"
                },
                {
                  label: "Kuantitas",
                  value: "qty"
                },
                {
                  label: "Total",
                  value: "total"
                },
                {
                  label: "Keterangan",
                  value: "note"
                }
              ]
            },
            "one-to-many-input-additional-field-format": [
              {
                align: "right",
                name: "customer_price",
                format: "currency",
                source: "function",
                function:
                  'let map = {\n            "id-00000001": "price",\n            "id-2": "price_alt_1",\n            "id-3": "price_alt_2",\n            "id-4": "price_alt_3"\n          };\n\n          return column[map[data.price_type_id]];'
              },
              {
                align: "right",
                name: "qty",
                format: "number",
                source: "user",
                function: ""
              },
              {
                align: "right",
                name: "total",
                format: "currency",
                source: "function",
                function: "return column.customer_price * column.qty;"
              },
              {
                align: "center",
                name: "note",
                format: "general",
                source: "user",
                function: ""
              }
            ],
            "one-to-many-input-table-empty-placeholder":
              "Belum Ada Produk Ditambahkan",
            element: "one-to-many-input",
            container: 0,
            row: 7,
            column: 0,
            visible: false
          }
        ],
        related_tables: [
          {
            table: "customers",
            join_column_1: "customer_id",
            join_column_2: "_id",
            columns: ["customer_name"]
          },
          {
            table: "price_types",
            join_column_1: "price_type_id",
            join_column_2: "_id",
            columns: ["price_name"]
          },
          {
            table: "payment_types",
            join_column_1: "payment_type_id",
            join_column_2: "_id",
            columns: ["name"]
          }
        ],
        _id: "surat-jalan",
        tags: [],
        settings: {
          ui: {
            view_buttons: [
              {
                icon: "mdi-printer",
                label: "Cetak Invoice",
                name: "print-invoice"
              },
              {
                icon: "mdi-printer",
                label: "Cetak Surat Jalan",
                name: "print-order"
              }
            ]
          }
        },
        id: ""
      },
      {
        name: "Satuan",
        slug: "satuan",
        table: "units",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Satuan",
            placeholder: "",
            type: "text",
            name: "unit_name",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            name: "info",
            db_column_index: 2,
            container: 0,
            row: 1,
            column: 0
          }
        ],
        _id: "satuan",
        tags: [],
        id: ""
      },
      {
        name: "Distributor",
        slug: "distributor",
        table: "distributors",
        pk: "_id",
        containers: [
          {
            name: "default"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            element: "input",
            label: "Kode",
            placeholder: "",
            type: "text",
            name: "distributor_code",
            db_column_index: 1,
            container: 0,
            row: 0,
            column: 0
          },
          {
            element: "input",
            label: "Nama",
            placeholder: "",
            type: "text",
            name: "distributor_name",
            db_column_index: 2,
            container: 0,
            row: 0,
            column: 1
          },
          {
            element: "textarea",
            label: "Alamat",
            placeholder: "",
            rows: "3",
            name: "distributor_address",
            db_column_index: 3,
            container: 0,
            row: 1,
            column: 0
          },
          {
            element: "input",
            label: "Telepon",
            placeholder: "",
            type: "text",
            name: "distributor_phone",
            db_column_index: 4,
            container: 0,
            row: 2,
            column: 0
          },
          {
            element: "input",
            label: "Email",
            placeholder: "",
            type: "text",
            name: "distributor_email",
            db_column_index: 5,
            container: 0,
            row: 2,
            column: 1
          },
          {
            element: "textarea",
            label: "Keterangan",
            placeholder: "",
            rows: "3",
            name: "distributor_info",
            db_column_index: 6,
            container: 0,
            row: 3,
            column: 0
          }
        ],
        _id: "distributor",
        tags: [],
        settings: {
          features: {
            import: true,
            export: true
          }
        },
        id: ""
      }
    ];

    const reports = [
      {
        name: "Produk",
        slug: "produk",
        containers: [
          { label: "Filters", name: "filters" },
          { label: "Report", name: "report" }
        ],
        rows: [{ name: "default" }, { name: "default" }],
        columns: [
          {
            "report-table-source": {
              table: "products",
              columns: [
                {
                  alias: "Kode",
                  checked: true,
                  name: "code",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Nama",
                  checked: true,
                  name: "product_name",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Harga 1",
                  checked: true,
                  name: "price",
                  format: "currency",
                  align: "right"
                },
                {
                  alias: "Harga 2",
                  checked: true,
                  name: "price_alt_1",
                  format: "currency",
                  align: "right"
                },
                {
                  alias: "Harga 3",
                  checked: true,
                  name: "price_alt_2",
                  format: "currency",
                  align: "right"
                },
                {
                  alias: "Harga 4",
                  checked: true,
                  name: "price_alt_3",
                  format: "currency",
                  align: "right"
                },
                {
                  alias: "Kuantitas",
                  checked: true,
                  name: "quantity",
                  format: "number",
                  align: "right"
                }
              ]
            },
            "report-table-sort": [{ column: "product_name", type: "asc" }],
            element: "report-table",
            name: "Table",
            container: 0,
            row: 0,
            column: 0
          }
        ],
        _id: "produk",
        tags: [],
        id: ""
      },
      {
        name: "Perhitungan Upah",
        slug: "perhitungan-upah",
        containers: [
          {
            label: "Filters",
            name: "filters"
          },
          {
            label: "Report",
            name: "report"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            "date-start-label": "Tanggal  Awal",
            "date-end-label": "Tanggal Akhir",
            element: "filter-date-range",
            field: "time",
            container: 0,
            row: 0,
            column: 0
          },
          {
            "report-table-source": {
              table: "order_requests",
              columns: [
                {
                  alias: "Tanggal",
                  checked: true,
                  name: "time",
                  format: "date",
                  align: "left"
                },
                {
                  alias: "Pegawai",
                  checked: true,
                  name: "employee_id",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Upah",
                  checked: true,
                  name: "manufacturing_wages",
                  format: "currency",
                  align: "right"
                }
              ]
            },
            element: "report-table",
            name: "Table",
            container: 1,
            row: 0,
            column: 0
          }
        ],
        _id: "perhitungan-upah",
        tags: [],
        id: ""
      },
      {
        name: "Rekapitulasi Penjualan",
        slug: "rekapitulasi-penjualan",
        containers: [
          {
            label: "Filters",
            name: "filters"
          },
          {
            label: "Report",
            name: "report"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            "date-start-label": "Tanggal Awal",
            "date-end-label": "Tanggal Akhir",
            element: "filter-date-range",
            field: "time",
            container: 0,
            row: 0,
            column: 0
          },
          {
            "filter-condition": "=",
            label: "Nama Konsumen",
            items: {
              label_column: "customer_name",
              source: "db",
              table: "customers",
              value: [],
              value_column: "_id"
            },
            element: "filter-drop-down",
            field: "customer_id",
            container: 0,
            row: 1,
            column: 0
          },
          {
            "report-table-source": {
              table: "order",
              columns: [
                {
                  alias: "Tanggal",
                  checked: true,
                  name: "time",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Jenis Pembayaran",
                  checked: true,
                  name: "payment_type_id",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Alamat",
                  checked: true,
                  name: "address",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Pengirim",
                  checked: true,
                  name: "sender",
                  format: "general",
                  align: "left"
                }
              ]
            },
            element: "report-table",
            name: "Table",
            container: 1,
            row: 0,
            column: 0
          }
        ],
        _id: "rekapitulasi-penjualan",
        tags: [],
        id: ""
      },
      {
        name: "Rekapitulasi Produksi",
        slug: "rekapitulasi-produksi",
        containers: [
          {
            label: "Filters",
            name: "filters"
          },
          {
            label: "Report",
            name: "report"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            "date-start-label": "Tanggal Awal",
            "date-end-label": "Tanggal Akhir",
            element: "filter-date-range",
            field: "time",
            container: 0,
            row: 0,
            column: 0
          },
          {
            "report-table-source": {
              table: "order_requests",
              columns: [
                {
                  alias: "Tanggal",
                  checked: true,
                  name: "time",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Pagawai",
                  checked: true,
                  name: "employee",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Keterangan",
                  checked: true,
                  name: "info",
                  format: "general",
                  align: "left"
                }
              ]
            },
            element: "report-table",
            name: "Table",
            container: 1,
            row: 0,
            column: 0
          }
        ],
        _id: "rekapitulasi-produksi",
        tags: [],
        id: ""
      },
      {
        name: "Rincian Pengiriman",
        slug: "rincian-pengiriman",
        containers: [
          {
            label: "Filters",
            name: "filters"
          },
          {
            label: "Report",
            name: "report"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            "date-start-label": "Tanggal Awal",
            "date-end-label": "Tanggal Akhir",
            element: "filter-date-range",
            field: "time",
            container: 0,
            row: 0,
            column: 0
          },
          {
            "report-table-source": {
              table: "order",
              columns: [
                {
                  alias: "Tanggal",
                  checked: true,
                  name: "time",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Nama Konsumen",
                  checked: true,
                  name: "customer_name",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Alamat",
                  checked: true,
                  name: "address",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Pengirim",
                  checked: true,
                  name: "sender",
                  format: "general",
                  align: "left"
                }
              ]
            },
            element: "report-table",
            name: "Table",
            container: 1,
            row: 0,
            column: 0
          }
        ],
        _id: "rincian-pengiriman",
        tags: [],
        id: ""
      },
      {
        name: "Rincian Pengiriman Per Pelanggan",
        slug: "rincian-pengiriman-per-pelanggan",
        containers: [
          {
            label: "Filters",
            name: "filters"
          },
          {
            label: "Report",
            name: "report"
          }
        ],
        rows: [
          {
            name: "default"
          },
          {
            name: "default"
          },
          {
            name: "default"
          }
        ],
        columns: [
          {
            "date-start-label": "Tanggal Awal",
            "date-end-label": "Tanggal Akhir",
            element: "filter-date-range",
            field: "time",
            container: 0,
            row: 0,
            column: 0
          },
          {
            "filter-condition": "=",
            label: "Nama Konsumen",
            items: {
              label_column: "customer_name",
              source: "db",
              table: "customers",
              value: [],
              value_column: "_id"
            },
            element: "filter-drop-down",
            field: "customer_id",
            container: 0,
            row: 1,
            column: 0
          },
          {
            "report-table-source": {
              table: "order",
              columns: [
                {
                  alias: "Tanggal",
                  checked: true,
                  name: "time",
                  format: "date",
                  align: "left"
                },
                {
                  alias: "Nama Konsumen",
                  checked: true,
                  name: "customer_name",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Alamat",
                  checked: true,
                  name: "address",
                  format: "general",
                  align: "left"
                },
                {
                  alias: "Pengirim",
                  checked: true,
                  name: "sender",
                  format: "general",
                  align: "left"
                }
              ]
            },
            element: "report-table",
            name: "Table",
            container: 1,
            row: 0,
            column: 0
          }
        ],
        _id: "rincian-pengiriman-per-pelanggan",
        tags: [],
        id: ""
      }
    ];

    DB.getAll("apps").then(function (response) {
      if (response.length === 0) {
        DB.bulkInsert("apps", apps).then(function () {
          Logger.log("Default apps created");
        });
      }
    });

    DB.getAll("reports").then(function (response) {
      if (response.length === 0) {
        DB.bulkInsert("reports", reports).then(function () {
          Logger.log("Default reports created");
        });
      }
    });

    const databases = [
      {
        name: "payment_types",
        data: [
          {
            _id: "id-00000001",
            code: "TP-1",
            name: "Tunai",
            info: "-"
          },
          {
            _id: "id-00000002",
            code: "TP-2",
            name: "Kredit",
            info: "-"
          }
        ]
      },
      {
        name: "price_types",
        data: [
          {
            _id: "id-00000001",
            code: "H-1",
            price_name: "Harga 1",
            info: "-"
          },
          {
            _id: "id-00000002",
            code: "H-2",
            price_name: "Harga 2",
            info: "-"
          },
          {
            _id: "id-00000003",
            code: "H-3",
            price_name: "Harga 3",
            info: "-"
          },
          {
            _id: "id-00000004",
            code: "H-4",
            price_name: "Harga 4",
            info: "-"
          }
        ]
      },
      {
        name: "units",
        data: [
          {
            _id: "id-00000001",
            unit_name: "Pcs",
            info: "-"
          }
        ]
      },
      {
        name: "customers",
        data: [
          {
            _id: "id-00000001",
            code: "K-001",
            customer_name: "Konsumen 1",
            price_type_id: "id-00000001",
            address: "Bandung",
            phone: "-",
            email: "-",
            info: "Demo data untuk konsumen."
          }
        ]
      },
      {
        name: "employees",
        data: [
          {
            _id: "id-00000001",
            code: "P-001",
            employee_name: "Pegawai 1",
            info: "Demo data untuk pegawai."
          }
        ]
      },
      {
        name: "products",
        data: [
          {
            _id: "id-00000001",
            code: "PR-001",
            product_name: "Produk 1",
            price: "90000",
            manufacturing_wages: "5000",
            price_alt_1: "100000",
            price_alt_2: "110000",
            price_alt_3: "120000",
            quantity: 0,
            info: "Demo data untuk produk."
          }
        ]
      },
      {
        name: "distributors",
        data: [
          {
            _id: "id-00000001",
            distributor_code: "D-01",
            distributor_name: "Pusat",
            distributor_address: "-",
            distributor_phone: "",
            distributor_email: "",
            distributor_info: "Distributor pusat."
          }
        ]
      }
    ];

    for (let index = 0; index < databases.length; index++) {
      const database = databases[index];

      DB.get(database.name, database.data[0]._id).then(function (response) {
        if (!response) {
          DB.bulkInsert(database.name, database.data)
            .then(function () {
              Logger.log("Default " + database.name + " data inserted");
            })
            .catch(function () {
              Logger.log("Error while creating default app", "app");
            });
        }
      });
    }
  }
};

window.priceTotal = function (column) {
  return column.price * column.qty;
};
