<template>
  <div class="data-table">
    <div class="flex py-3">
      <div class="py-3">
        Show
        <select
          v-model="perPage"
          class="appearance-none bg-white border border-tertiary px-2 py-1"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="100">100</option>
        </select>
        Entries
      </div>
      <div class="ml-auto">
        <slot name="search">
          <input
            v-model="searchText"
            class="border-b border-tertiary px-3 py-2"
            :placeholder="searchPlaceholder"
            type="search"
          />
        </slot>
      </div>
    </div>

    <table v-if="items.length > 0" class="border-collapse w-full">
      <thead v-if="filteredHeaders.length > 0">
        <tr>
          <th
            v-for="(header, i) in filteredHeaders"
            @click="onHeaderClick(header)"
            :class="{
              'text-center': header.align === 'center',
              'text-right': header.align === 'right'
            }"
            :key="i"
            :style="{
              width: typeof header.width === 'undefined' ? false : header.width
            }"
            class="border-t border-tertiary cursor-pointer px-1 py-2 select-none text-left align-middle"
          >
            <span
              v-if="header.sortable"
              :class="{
                'rotate-180': header.sortable && header.sort === 'desc',
                'text-tertiary': header.sort === ''
              }"
              class="inline-block transition-all hover:text-black"
            >
              <template v-if="header.sort === ''">&#8645;</template>
              <template v-else>&#8595;</template>
            </span>
            <slot :header="header" :name="'header.' + header.value">
              <span class="pl-1.5">{{ header.label }}</span>
            </slot>
            <!-- <span class="float-right">&#9660;</span> -->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in pagedFilteredItems" :key="i">
          <td
            v-for="(header, j) in filteredHeaders"
            :class="{
              'text-center': header.align === 'center',
              'text-right': header.align === 'right'
            }"
            :key="j"
            class="border-t border-tertiary px-1 py-1"
          >
            <slot :item="item" :name="'item.' + header.value">
              {{ formatValue(item[header.value], header.format) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <slot name="no-data">Data not available.</slot>
    </div>

    <div class="border-t border-tertiary flex py-3">
      <div v-if="items.length > 0">
        Showing {{ (currentPage - 1) * perPage + 1 }} to
        {{
          currentPage * perPage > filteredItems.length
            ? filteredItems.length
            : currentPage * perPage
        }}
        of
        {{ filteredItems.length }}
      </div>
      <div class="ml-auto">
        <template v-if="paging.length > 1">
          <button
            @click="currentPage = page"
            v-for="page in paging"
            :key="page"
            :class="{
              'bg-primary': currentPage != page,
              'bg-tertiary': currentPage == page
            }"
            :disabled="currentPage == page"
            class="bg-primary ml-1 rounded text-white px-2 py-1"
          >
            {{ page }}
          </button>
        </template>
      </div>
    </div>

    <slot name="loading">
      <div v-if="isLoading" class="data-table-loading-block">
        <div class="data-table-loading-text-container">
          <div class="data-table-loading-text">Loading...</div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: Array,
    isLoading: Boolean,
    items: Object,
    search: { type: String, default: "" },
    searchPlaceholder: { type: String, default: "Search" }
  },
  data: function () {
    return {
      searchText: "",
      showList: false,
      cursor: -1,
      filteredHeaders: [],
      internalItems: [],
      currentSortColumn: null,
      currentPage: 1,
      perPage: 15,
      totalPage: 1
    };
  },
  computed: {
    hasItems: function () {
      return !!this.internalItems.length;
    },
    filteredItems: function () {
      const self = this;
      let items = self.internalItems;

      items = self.internalItems.filter(function (item) {
        let result = false;

        for (let index = 0; index < self.filteredHeaders.length; index++) {
          let header = self.filteredHeaders[index];

          if (
            typeof item[header.value] === "undefined" ||
            item[header.value] == null
          ) {
            item[header.value] = "";
          }

          if (typeof header.searchable !== "undefined" && header.searchable) {
            if (
              item[header.value]
                .toString()
                .toLowerCase()
                .includes(self.searchText.toLowerCase())
            ) {
              result = true;

              break;
            }
          }
        }

        return result;
      });

      if (self.currentSortColumn !== null) {
        items.sort(function (a, b) {
          if (self.currentSortColumn.sort === "asc") {
            return a[self.currentSortColumn.value] >
              b[self.currentSortColumn.value] ===
              true
              ? 1
              : -1;
          } else {
            return a[self.currentSortColumn.value] <
              b[self.currentSortColumn.value] ===
              true
              ? 1
              : -1;
          }
        });
      }

      return items;
    },
    pagedFilteredItems: function () {
      const self = this;

      return self.filteredItems.slice(
        (self.currentPage - 1) * self.perPage,
        self.currentPage * self.perPage
      );
    },
    paging: function () {
      const self = this;
      const max_page = Math.ceil(self.filteredItems.length / self.perPage);

      let pages = [];

      for (let index = 1; index <= max_page; index++) {
        pages.push(index);
      }

      return pages;
    }
  },
  watch: {
    items: {
      handler: function (value) {
        this.setItems(value);
      },
      immediate: true
    },
    headers: {
      handler: function (value) {
        this.filteredHeaders.splice(0);

        for (let index = 0; index < value.length; index++) {
          const header = JSON.parse(JSON.stringify(value[index]));

          if (typeof header.sortable === "undefined") {
            header.sortable = true;
          }

          if (typeof header.searchable === "undefined") {
            header.searchable = true;
          }

          if (
            typeof header.sort === "undefined" ||
            header.sort !== "asc" ||
            header.sort !== "desc"
          ) {
            header.sort = "";
          }

          if (
            typeof header.visible === "undefined" ||
            (typeof header.visible !== "undefined" && header.visible)
          ) {
            this.filteredHeaders.push(header);
          }
        }
      },
      deep: true,
      immediate: true
    },
    search: {
      handler: function (value) {
        this.searchText = value;
      },
      immediate: true
    }
  },
  methods: {
    formatValue: function (value, format) {
      if (format === "number" || format === "currency") {
        value = Number(value);

        if (isNaN(value)) {
          value = 0;
        }
      }

      if (format === "date") {
        const dt = new Date(value);

        return (
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        );
      } else if (format === "number") {
        return Intl.NumberFormat("id-ID").format(value);
      } else if (format === "currency") {
        return Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(value);
      }

      return value;
    },
    setItems: function (items) {
      // console.log("ITEMS", items);

      if (!Array.isArray(this.internalItems)) {
        this.internalItems = [];
      }

      this.internalItems.splice(0);

      for (let index = 0; index < items.length; index++) {
        this.internalItems.push(items[index]);
      }

      // this.internalItems = items;
    },
    onHeaderClick: function (clicked_header) {
      const self = this;

      if (clicked_header.sortable) {
        self.currentSortColumn = null;

        for (let index = 0; index < self.filteredHeaders.length; index++) {
          if (self.filteredHeaders[index].value === clicked_header.value) {
            self.filteredHeaders[index].sort =
              self.filteredHeaders[index].sort === "desc"
                ? ""
                : self.filteredHeaders[index].sort === ""
                ? "asc"
                : "desc";

            if (self.filteredHeaders[index].sort !== "") {
              self.currentSortColumn = self.filteredHeaders[index];
            }
          } else {
            self.filteredHeaders[index].sort = "";
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
