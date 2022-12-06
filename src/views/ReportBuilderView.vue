<template>
  <div class="mx-4">
    <div class="flex py-2">
      <div class="font-bold my-auto text-xl">Report Builder</div>
      <div class="ml-auto">
        <button
          @click="deleteSelected"
          :disabled="!isItemsChecked"
          :class="{
            'bg-red-600': isItemsChecked,
            'bg-tertiary': !isItemsChecked
          }"
          class="px-3 py-2 rounded text-white"
        >
          <i class="fa fa-trash"></i> Delete
        </button>
        <button
          @click="build"
          class="bg-primary ml-2 px-3 py-2 rounded text-white"
        >
          <i class="fa fa-shapes"></i> Create
        </button>
      </div>
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 px-5 py-3 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <data-table :headers="headers" :items="items" :search="searchText">
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
          </div>
        </template>
        <template #[tableHeaderID]>
          <div class="text-center">
            <input @change="checkAll" :checked="isCheckedAll" type="checkbox" />
          </div>
        </template>
        <template #header.action="props">
          <span class="inline-block text-center w-full">
            {{ props.header.label }}
          </span>
        </template>
        <template #[tableItemID]="props">
          <div class="text-center">
            <input
              v-model="props.item.is_checked"
              @change="checkCheckedAll"
              type="checkbox"
            />
          </div>
        </template>
        <template #item.name="props">
          <a
            @click.prevent="$router.push('/report/view/' + props.item.slug)"
            href="#"
            >{{ props.item.name }}</a
          >
        </template>
        <template #item.tags="props">
          {{ props.item.tags.join(", ") }}
        </template>
        <template #item.action="props">
          <div class="text-center">
            <button
              v-tooltip
              @click="$router.push('/report/view/' + props.item.slug)"
              title="View Report"
            >
              <span class="mdi mdi-eye mdi-24px"></span>
            </button>
            <button
              v-tooltip
              @click="edit(props.item)"
              class="ml-2"
              title="Edit Report"
            >
              <span class="mdi mdi-application-edit mdi-24px"></span>
            </button>
            <button
              v-tooltip
              @click="exportAsJSON(props.item)"
              class="ml-2"
              title="Export As JSON"
            >
              <span class="mdi mdi-code-json mdi-24px"></span>
            </button>
            <button
              v-tooltip
              @click="toggleReadOnly(props.item)"
              class="ml-2"
              :title="
                props.item.is_read_only ? 'Set Read And Write' : 'Set Read Only'
              "
            >
              <span
                :class="{
                  'mdi-lock': !props.item.is_read_only,
                  'mdi-lock-open': props.item.is_read_only
                }"
                class="mdi mdi-lock mdi-24px"
              ></span>
            </button>
            <button
              v-tooltip
              @click="
                currentApp = props.item;
                currentSettings = props.item.settings;
                isAppSettingsShown = true;
              "
              class="ml-2"
              title="More Settings"
            >
              <span class="mdi mdi-dots-horizontal mdi-24px"></span>
            </button>
          </div>
        </template>
      </data-table>
    </div>
  </div>
  <ns-dialog
    @close="isAppSettingsShown = false"
    :show="isAppSettingsShown"
    size="30%"
  >
    <template #title><i class="fa fa-cog"></i> App Settings</template>
    <div v-if="currentApp !== null" class="p-3">
      <div
        v-for="(setting_group, setting_group_key) in currentApp.settings"
        :key="setting_group_key"
        class="font-bold"
      >
        {{ setting_group.label }}
        <div class="flex flex-col pb-3 pt-2">
          <template v-for="(setting, key) in setting_group.value" :key="key">
            <label class="block py-1 w-full">
              {{ setting.label }}
            </label>
            <ns-toggle
              v-if="
                typeof currentSettings[setting_group_key].value[key].value ===
                'boolean'
              "
              v-model="currentSettings[setting_group_key].value[key].value"
            ></ns-toggle>
            <input
              v-else
              v-model="currentSettings[setting_group_key].value[key].value"
              class="border border-tertiary px-2 py-1 rounded-sm w-full"
              type="text"
            />
          </template>
        </div>
      </div>
      <div class="border-t border-tertiary pb-1 pt-3 text-right">
        <button
          @click="saveAppSettings"
          class="bg-primary px-3 py-2 rounded text-white"
        >
          <i class="fa fa-save"></i> Save
        </button>
      </div>
    </div>
  </ns-dialog>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import NsDialog from "@/components/NS/NsDialog.vue";
import NsToggle from "@/components/NS/NsToggle.vue";

import NsTooltip from "@/directives/NsTooltip";

import ReportBuilder from "@/assets/js/ReportBuilder";

import { saveAs } from "file-saver";

export default {
  components: {
    DataTable,
    NsDialog,
    NsToggle
  },
  directives: { tooltip: NsTooltip },
  name: "ReportBuilderView",
  data: function () {
    return {
      isAppSettingsShown: false,
      isCheckedAll: false,
      headers: [],
      items: [],
      app_id_column: "",
      searchText: "",
      isSearchShown: false,

      currentApp: null,
      currentSettings: {}
    };
  },
  props: {},
  mounted: function () {
    let self = this;

    self.getAll();
  },
  computed: {
    isItemsChecked: function () {
      const self = this;

      for (let index = 0; index < self.items.length; index++) {
        if (self.items[index].is_checked) {
          return true;
        }
      }

      return false;
    },
    tableHeaderID: function () {
      return "header." + this.app_id_column;
    },
    tableItemID: function () {
      return "item." + this.app_id_column;
    }
    // appSettings: function () {
    //   if (typeof this.items[this.selectedItem] !== "undefined") {
    //     return {
    //       settings: []
    //       // webhooks: this.items[this.selectedItem]["webhooks"]
    //     };
    //   }

    //   return [];
    // }
  },
  methods: {
    build: function () {
      const self = this;

      self.$router.push("/reportbuilder/build");
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

      ReportBuilder.delete(selected).then(function () {
        self.getAll(self.app);
      });
    },
    edit: function (item) {
      const self = this;

      self.$router.push("/reportbuilder/build/" + item.slug);
    },
    exportAsJSON: function (item) {
      let cloned_item = JSON.parse(JSON.stringify(item));

      delete cloned_item._rev;
      delete cloned_item.settings;

      let blob = new Blob([JSON.stringify(cloned_item)], {
        type: "application/json;charset=utf-8"
      });

      saveAs(blob, cloned_item.name + ".json");
    },
    getAll: function () {
      let self = this;

      ReportBuilder.getAll().then(function (response) {
        self.app_id_column = response.app_id_column;
        self.headers = response.headers;
        self.items = response.items;
      });
    },
    saveAppSettings: function () {
      const self = this;

      let settings = {};

      for (const group_key in self.currentSettings) {
        if (Object.hasOwnProperty.call(self.currentSettings, group_key)) {
          settings[group_key] = {};

          for (const key in self.currentSettings[group_key].value) {
            if (
              Object.hasOwnProperty.call(
                self.currentSettings[group_key].value,
                key
              )
            ) {
              settings[group_key][key] =
                self.currentSettings[group_key].value[key].value;
            }
          }
        }
      }

      ReportBuilder.settings(self.currentApp, settings).then(function () {
        self.getAll();
      });

      self.isAppSettingsShown = false;
    },
    toggleReadOnly: function (app) {
      const self = this;
      const is_read_only = !app.is_read_only;

      ReportBuilder.settings(app, { is_read_only: is_read_only }).then(
        function () {
          self.getAll();
        }
      );
    }
  }
};
</script>
