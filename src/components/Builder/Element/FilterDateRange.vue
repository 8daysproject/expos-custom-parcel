<template>
  <div class="flex">
    <div class="flex-grow pr-1">
      <label class="block pb-1 pt-2">
        <div class="pb-1">{{ dateStartLabel }}</div>

        <input
          @input.self="onInput"
          :placeholder="dateStartPlaceholder"
          :value="dateStartValue"
          ref="date-start"
          type="date"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        />
      </label>
    </div>
    <div class="flex-grow pl-1">
      <label class="block pb-1 pt-2">
        <div class="pb-1">{{ dateEndLabel }}</div>

        <input
          @input.self="onInput"
          :placeholder="dateEndPlaceholder"
          :value="dateEndValue"
          ref="date-end"
          type="date"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: String,
    dateEndLabel: String,
    dateStartLabel: String,
    dateEndPlaceholder: String,
    dateStartPlaceholder: String,
    dateEndValue: String,
    dateStartValue: String,
    name: String
  },
  emits: ["input"],
  data: function () {
    return {};
  },
  methods: {
    onInput: function () {
      let time_start = Date.parse(this.$refs["date-start"].value);
      let time_end = Date.parse(this.$refs["date-end"].value);

      const dt_start = new Date(time_start);
      const dt_end = new Date(time_end);

      dt_start.setUTCHours(0, 0, 0, 0);
      dt_end.setUTCHours(23, 59, 59, 999);

      time_start = dt_start.getTime();
      time_end = dt_end.getTime();

      this.$emit("input", {
        target: {
          name: this.field + ">&&<",
          value: {
            conditions: [
              {
                field: this.field,
                condition: ">=",
                value: isNaN(time_start) ? 0 : time_start
              },
              {
                field: this.field,
                condition: "<=",
                value: isNaN(time_end) ? 0 : time_end
              }
            ],
            operator: "and"
          }
        }
      });
    }
  }
};
</script>
