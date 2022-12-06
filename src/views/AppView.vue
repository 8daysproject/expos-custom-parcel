<template>
  <div class="mx-4">
    <div class="font-bold px-1 py-2 text-2xl">
      {{ app.name }}
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <div class="border-b border-tertiary flex py-3 px-3">
        <div v-if="isExportable || isImportable" class="my-auto">
          <input
            v-if="isImportable"
            @change="parseImportFile"
            ref="import"
            style="display: none"
            type="file"
          />
          <drop-down-button
            class="bg-primary border-r border-white px-3 py-2 rounded text-white"
          >
            <template #content>
              <span><i class="mdi mdi-swap-vertical"></i> Import / Export</span>
            </template>
            <drop-down-button-item v-if="isImportable"
              ><a
                @click.prevent="importData"
                class="inline-block px-3 py-2 text-left w-full"
                href="#"
                ><i class="mdi mdi-import"></i> Import</a
              ></drop-down-button-item
            >
            <drop-down-button-item v-if="isExportable"
              ><a
                @click="exportData($event)"
                :download="isDownloadExportAvailable"
                :href="
                  exportDataString === ''
                    ? 'javascript:void(0)'
                    : exportDataString
                "
                class="inline-block px-3 py-2 text-left w-full"
                ><i
                  :class="{
                    'mdi-spin mdi-cog': isExporting,
                    'mdi-export': !isExporting
                  }"
                  class="mdi"
                ></i>
                {{ exportDataString === "" ? "Generate Export" : "Export" }}</a
              ></drop-down-button-item
            >
            <drop-down-button-item v-if="isImportable"
              ><hr
            /></drop-down-button-item>
            <drop-down-button-item v-if="isImportable"
              ><a
                :href="importDataTemplateString"
                class="inline-block px-3 py-2 text-left w-full"
                :download="app.name + '.csv'"
                ><i class="mdi mdi-download"></i> Download Import Template</a
              ></drop-down-button-item
            >
          </drop-down-button>
        </div>
        <div class="ml-auto">
          <button
            v-if="!app.is_read_only"
            @click="deleteSelected"
            :disabled="!isItemsChecked"
            :class="{
              'bg-red-600': isItemsChecked,
              'bg-tertiary': !isItemsChecked
            }"
            class="ml-2 px-3 py-2 rounded text-white"
          >
            <i class="fa fa-trash"></i> Delete
          </button>

          <button
            v-if="!app.is_read_only"
            @click="insert"
            class="bg-primary ml-2 px-3 py-2 rounded text-white"
          >
            <i class="fa fa-plus"></i> Insert
          </button>
        </div>
      </div>
      <div class="px-5 py-3">
        <data-table :headers="headers" :items="items" :search="searchText">
          <template #no-data>
            <div class="mx-auto p-5 w-1/3">
              <div>
                <img src="@/assets/img/undraw_empty_re_opql.svg" />
              </div>
              <div>
                <div class="font-bold p-2 text-xl">
                  No data was added yet, click "Insert" button to add data.
                </div>
                <button
                  @click="insert"
                  class="bg-primary ml-2 px-3 py-2 rounded text-white"
                >
                  <i class="fa fa-plus"></i> Insert
                </button>
              </div>
            </div>
          </template>
          <template #search>
            <div class="relative">
              <button
                @click="
                  isSearchShown = !isSearchShown;
                  $refs.searchText.focus();
                "
                class="bg-primary h-9 ml-2 rounded text-white w-9"
              >
                <span class="mdi mdi-magnify mdi-24px"></span>
              </button>
              <input
                v-model="searchText"
                @blur="isSearchShown = searchText !== ''"
                :class="{
                  'w-0': !isSearchShown,
                  'ml-2 px-2 w-auto': isSearchShown
                }"
                class="border-b-2 border-primary outline-none py-1 transition-all"
                placeholder="Search"
                type="search"
                ref="searchText"
              />
              <!-- <button
              @click="isTableSettingsShown = true"
              class="bg-primary h-9 ml-2 rounded text-white w-9"
            >
              <span class="mdi mdi-24px mdi-border-bottom"></span>
            </button> -->
              <button
                @click="isTableSettingsShown = true"
                class="bg-primary h-9 ml-2 rounded text-white w-9"
              >
                <span class="mdi mdi-table-cog mdi-24px"></span>
              </button>
            </div>
          </template>
          <template #[tableHeaderPK]>
            <div class="text-center">
              <input
                @change="checkAll"
                :checked="isCheckedAll"
                type="checkbox"
              />
            </div>
          </template>
          <template #header.action="props">
            <span class="inline-block relative text-center w-full">
              {{ props.header.label }}
              <!-- <button
              @click="isTableSettingsShown = true"
              class="bg-primary absolute h-8 px-2 py-1 -right-2 rounded text-white -top-1 w-8"
            >
              <i class="fa fa-sliders"></i>
            </button> -->
            </span>
          </template>
          <template #header._setting>
            <div class="flex">
              <button @click="isTableSettingsShown = true" class="ml-auto">
                <span class="mdi mdi-dots-horizontal mdi-24px"></span>
              </button>
            </div>
          </template>
          <template #[tableItemPK]="props">
            <div class="text-center">
              <input
                v-model="props.item.is_checked"
                @change="checkCheckedAll"
                type="checkbox"
              />
            </div>
          </template>
          <template #item.action="props">
            <div class="text-center">
              <button
                v-if="!app.is_read_only"
                v-tooltip
                @click="edit(props.item)"
                title="Edit"
              >
                <span class="mdi mdi-pencil mdi-24px"></span>
              </button>
              <button
                v-if="!app.is_read_only"
                v-tooltip
                @click="
                  props.item.is_checked = true;
                  deleteSelected();
                "
                class="ml-2"
                title="Delete"
              >
                <span class="mdi mdi-delete mdi-24px"></span>
              </button>
              <drop-down-button
                v-if="additionalButtons.length > 0"
                v-tooltip
                align="right"
                :split="false"
                title="More"
              >
                <template #content>
                  <span class="mdi mdi-dots-vertical mdi-24px"></span>
                </template>
                <drop-down-button-item
                  v-for="button in additionalButtons"
                  :key="button"
                  ><a
                    @click.prevent="onAdditionalButtonClick(button, props.item)"
                    class="inline-block px-3 py-2 text-left w-full"
                    href="javascript:;"
                    ><span
                      :class="additionalButtonIcon(button)"
                      class="mdi mdi-24px"
                    ></span>
                    {{ button.label }}</a
                  ></drop-down-button-item
                >
              </drop-down-button>
            </div>
          </template>
        </data-table>
      </div>
    </div>
  </div>
  <ns-dialog
    @close="isTableSettingsShown = false"
    :show="isTableSettingsShown"
    size="30%"
  >
    <template #title><i class="fa fa-cog"></i> Table Settings</template>
    <div class="p-3">
      <div class="flex flex-col pb-3 pt-2">
        <div class="table">
          <div class="font-bold table-row">
            <div class="table-cell">Column</div>
            <div class="table-cell">Visibility</div>
            <div class="table-cell">Alignment</div>
            <div class="table-cell">Type</div>
          </div>
          <template v-for="header in headers" :key="header.value">
            <template
              v-if="
                typeof header.hideable === 'undefined' ||
                (typeof header.hideable !== 'undefined' &&
                  header.hideable == true)
              "
            >
              <div class="table-row">
                <div class="table-cell">{{ header.label }}</div>
                <div class="table-cell">
                  <ns-toggle
                    v-model="header.visible"
                    checked-label="Show"
                    unchecked-label="Hide"
                  ></ns-toggle>
                </div>
                <div class="table-cell">
                  <select v-model="header.align">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div class="table-cell">
                  <select v-model="header.format">
                    <option value="date">Date</option>
                    <option value="general">General</option>
                    <option value="number">Number</option>
                    <option value="currency">Currency</option>
                  </select>
                </div>
                <!-- <div class="table-cell py-1">
                  <button class="bg-primary mx-1 px-2 py-1 rounded text-white">
                    <i class="mdi mdi-align-horizontal-left"></i>
                  </button>
                  <button class="bg-primary mx-1 px-2 py-1 rounded text-white">
                    <i class="mdi mdi-align-horizontal-center"></i>
                  </button>
                  <button class="bg-primary mx-1 px-2 py-1 rounded text-white">
                    <i class="mdi mdi-align-horizontal-right"></i>
                  </button>
                </div> -->
              </div>

              <!-- <div class="table">
              <div class="table-row">
                <div class="table-cell"></div>
              </div>
            </div> -->
            </template>

            <!-- <label
            v-if="
              typeof header.hideable === 'undefined' ||
              (typeof header.hideable !== 'undefined' &&
                header.hideable == true)
            "
            ><input v-model="header.visible" type="checkbox" />
            {{ header.label }}
          </label> -->
          </template>
        </div>
      </div>
      <div class="border-t border-tertiary pb-1 pt-3 text-right">
        <button
          @click="saveTableViewSettings"
          class="bg-primary px-3 py-2 rounded text-white"
        >
          <i class="fa fa-save"></i> Save
        </button>
      </div>
    </div>
  </ns-dialog>
</template>

<script>
import NsDialog from "@/components/NS/NsDialog.vue";
import NsToggle from "@/components/NS/NsToggle.vue";
import DataTable from "@/components/DataTable.vue";
import DropDownButton from "@/components/AppBuilder/DropDownButton.vue";
import DropDownButtonItem from "@/components/AppBuilder/DropDownButtonItem.vue";

import NsTooltip from "@/directives/NsTooltip";
import AppBuilder from "@/assets/js/AppBuilder.js";

import Papa from "papaparse";

import onActionButtonClick from "@/assets/js/builder/app/hooks/onActionButtonClick.js";

export default {
  name: "AppView",
  components: {
    NsDialog,
    NsToggle,
    DataTable,
    DropDownButton,
    DropDownButtonItem
  },
  directives: { tooltip: NsTooltip },
  data: function () {
    return {
      app: {},
      exportDataString: "",
      importDataTemplateString: "",
      isCheckedAll: false,
      isExporting: false,
      headers: [],
      items: [],
      searchText: "",
      isSearchShown: false,
      isTableSettingsShown: false
    };
  },
  props: {},
  mounted: function () {
    this.render(this.$route.params.name);
  },
  watch: {
    $route(to) {
      if (to.name == "AppView") {
        this.render(to.params.name);
      }
    }
  },
  computed: {
    additionalButtons: function () {
      const self = this;

      try {
        return self.app.settings.ui.view_buttons;
      } catch (error) {
        return [];
      }
    },
    isExportable: function () {
      const self = this;

      try {
        return self.app.settings.features.export;
      } catch (error) {
        return false;
      }
    },
    isImportable: function () {
      const self = this;

      try {
        return self.app.settings.features.import;
      } catch (error) {
        return false;
      }
    },
    isDownloadExportAvailable: function () {
      return this.exportDataString === ""
        ? null
        : this.app.name + " Export.csv";
    },
    isItemsChecked: function () {
      const self = this;

      for (let index = 0; index < self.items.length; index++) {
        if (self.items[index].is_checked) {
          return true;
        }
      }

      return false;
    },
    tableHeaderPK: function () {
      return "header." + this.app.pk;
    },
    tableItemPK: function () {
      return "item." + this.app.pk;
    }
  },
  methods: {
    additionalButtonIcon: function (button) {
      let icon = {};

      icon[button.icon] = true;

      return icon;
    },
    checkAll: function () {
      const self = this;

      self.isCheckedAll = !self.isCheckedAll;

      for (let index = 0; index < self.items.length; index++) {
        self.items[index].is_checked = self.isCheckedAll;
      }
    },
    checkCheckedAll: function () {
      const self = this;
      let is_checked_all = true;

      for (let index = 0; index < self.items.length; index++) {
        if (!self.items[index].is_checked) {
          is_checked_all = false;

          break;
        }
      }

      self.isCheckedAll = is_checked_all;
    },
    deleteSelected: function () {
      const self = this;
      let selected = [];

      for (let index = 0; index < self.items.length; index++) {
        if (self.items[index].is_checked) {
          selected.push(self.items[index]);
        }
      }

      AppBuilder.deleteRecords(self.app, selected).then(function () {
        self.getAllRecords(self.app.slug);
      });
    },
    detail: function (event) {
      console.log(event);
    },
    edit: function (item) {
      const self = this;

      self.$router.push("/app/edit/" + self.app.slug + "/" + item[self.app.pk]);
    },
    exportData: function () {
      const self = this;

      if (self.exportDataString === "") {
        self.isExporting = true;

        setTimeout(function () {
          let columns = self.headers
            .filter(function (item) {
              if (item.additional === false) {
                return true;
              }

              return false;
            })
            .map(function (item) {
              return item.value;
            });

          let data = self.items.map(function (item) {
            let new_item = {};

            for (let index = 0; index < columns.length; index++) {
              const header = columns[index];

              new_item[header] = item[header];
            }

            return new_item;
          });

          self.exportDataString =
            "data:text/plain;charset=utf-8," +
            encodeURIComponent(
              Papa.unparse(
                {
                  fields: columns,
                  data: data
                },
                { delimiter: ";", header: true, quotes: true }
              )
            );

          self.isExporting = false;
        }, 1000);
      }
    },
    getAllRecords: function (app) {
      const self = this;

      AppBuilder.getAllRecord(app).then(function (response) {
        self.app = response.app;
        self.app.slug = app;

        for (let index = 0; index < response.items.length; index++) {
          response.items[index].is_checked = false;
        }

        response.headers.push({
          hideable: false,
          label: "...",
          searchable: false,
          sortable: false,
          value: "_setting",
          visible: true
          // width: "24px"
        });

        self.headers = response.headers;
        self.items = response.items;

        let columns = self.headers
          .filter(function (item) {
            if (item.additional === false) {
              return true;
            }

            return false;
          })
          .map(function (item) {
            return item.value;
          });

        let data = [];

        for (let index = 0; index < columns.length; index++) {
          data.push("");
        }

        self.importDataTemplateString =
          "data:text/plain;charset=utf-8," +
          encodeURIComponent(
            Papa.unparse(
              {
                fields: columns,
                data: [data]
              },
              { delimiter: ";", header: true, quotes: true }
            )
          );
      });
    },
    importData: function () {
      const self = this;

      self.$refs.import.click();
    },
    onAdditionalButtonClick: function (button, item) {
      // const self = this;

      // button.action();

      // self.$router.push(button.value + item[self.app.pk]);

      // onActionButtonClick(this, button, item);
      // console.log(onActionButtonClick, button, item);

      if (typeof onActionButtonClick[button.name] === "function") {
        onActionButtonClick[button.name](this, button, item);
      }

      // console.log(button, item);
    },
    parseImportFile: function () {
      const self = this;

      if (typeof self.$refs.import.files[0] !== "undefined") {
        Papa.parse(self.$refs.import.files[0], {
          complete: async function (results) {
            let columns = self.headers
              .filter(function (item) {
                if (item.additional === false) {
                  return true;
                }

                return false;
              })
              .map(function (item) {
                return item.value;
              });

            if (results.meta.fields.join("|") == columns.join("|")) {
              AppBuilder.insertRecords(self.app, results.data).then(
                function () {
                  self.getAllRecords(self.app.slug);
                }
              );
            } else {
              alert("Import file format error.");
            }
          },
          header: true
        });
      }
    },
    render: async function (slug) {
      const self = this;

      self.getAllRecords(slug);
    },
    saveTableViewSettings: function () {
      const self = this;
      let headers = [];

      for (let index = 0; index < self.headers.length; index++) {
        const header = self.headers[index];

        if (typeof header.hideable === "undefined" || header.hideable == true) {
          headers.push({
            align: header.align,
            format: header.format,
            value: header.value,
            visible: header.visible
          });
        }
      }

      AppBuilder.settings(self.app, { headers: headers });

      self.isTableSettingsShown = false;
    },
    input: function (event) {
      const self = this;

      self.appData[event.target.name] = event.target.value;
    },
    insert: function () {
      const self = this;

      self.$router.push("/app/insert/" + self.app.slug);
    }
  }
};
</script>
