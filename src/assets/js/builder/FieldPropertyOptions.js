export default {
  element: {
    fields: ["input", "select", "textarea", "parent-child-drop-down"],
    options: [
      {
        name: "Input",
        value: "input"
      },
      {
        name: "Select",
        value: "select"
      },
      {
        name: "Multiline Text Box",
        value: "textarea"
      },
      {
        name: "Parent Child Drop Down",
        value: "parent-child-drop-down"
      }
    ],
    default: "input"
  },
  items: {
    fields: ["select", "filter-drop-down"],
    options: "FieldPropertyValueCollection",
    default: ""
  },
  multiple: {
    fields: ["select"],
    options: [
      {
        name: "False",
        value: false
      },
      {
        name: "True",
        value: true
      }
    ],
    default: false
  },
  rows: {
    fields: ["textarea"],
    default: 2
  },
  size: {
    fields: ["select"],
    default: 1
  },
  type: {
    fields: ["input"],
    options: [
      {
        name: "Checkbox",
        value: "checkbox"
      },
      {
        name: "Date",
        value: "date"
      },
      {
        name: "Email",
        value: "email"
      },
      {
        name: "File",
        value: "file"
      },
      {
        name: "Number",
        value: "number"
      },
      {
        name: "Password",
        value: "password"
      },
      {
        name: "Range",
        value: "range"
      },
      {
        name: "Radio Button",
        value: "radio"
      },
      {
        name: "Telephone",
        value: "tel"
      },
      {
        name: "Text Box",
        value: "text"
      },
      {
        name: "Time",
        value: "time"
      }
    ],
    default: "text"
  },

  "parent-child-drop-down-parent-element": {
    fields: ["parent-child-drop-down"],
    options: "FieldPropertyElementSelection",
    default: ""
  },
  "parent-child-drop-down-parent-source": {
    fields: ["parent-child-drop-down"],
    options: "FieldPropertyTableColumnSelector",
    default: "",
    configuration: {
      additionalFields: [
        {
          label: "Parent Column",
          name: "parent_column"
        },
        {
          label: "Child Column",
          name: "child_column"
        }
      ]
    }
  },
  "parent-child-drop-down-child-source": {
    fields: ["parent-child-drop-down"],
    options: "FieldPropertyTableColumnSelector",
    default: "",
    configuration: {
      additionalFields: [
        {
          label: "Label Column",
          name: "label_column"
        },
        {
          label: "Value Column",
          name: "value_column"
        }
      ]
    }
  },

  "grid-input-rows": {
    fields: ["grid-input"],
    options: "FieldPropertyValueCollection",
    default: ""
    // configuration: {
    //   hideLabel: true
    // }
  },
  "grid-input-columns": {
    fields: ["grid-input"],
    options: "FieldPropertyValueCollection",
    default: ""
    // configuration: {
    //   hideLabel: true
    // }
  },
  "grid-input-type": {
    fields: ["grid-input"],
    options: [
      {
        name: "Multiple Choice",
        value: "radio"
      },
      {
        name: "Checkbox",
        value: "checkbox"
      },
      {
        name: "Text",
        value: "text"
      }
    ]
  },
  /* One To Many Input */
  "one-to-many-input-additional-field": {
    fields: ["one-to-many-input"],
    options: "FieldPropertyValueCollection",
    default: ""
    // configuration: {
    //   hideLabel: true
    // }
  },
  "one-to-many-input-table": {
    fields: ["one-to-many-input"],
    options: "FieldPropertyTableColumnSelector",
    default: "",
    configuration: {
      additionalColumnAttributes: [
        {
          label: "Format",
          name: "format",
          value: "general",
          options: [
            { label: "Currency", value: "currency" },
            { label: "General", value: "general" },
            { label: "Date", value: "date" },
            { label: "Number", value: "number" }
          ]
        },
        {
          label: "Align",
          name: "align",
          value: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        },
        {
          label: "Visible",
          name: "visible",
          value: true,
          options: [
            { label: "True", value: true },
            { label: "False", value: false }
          ]
        }
      ],
      additionalFields: [
        {
          label: "Search Column",
          name: "search_column"
        }
      ]
    }
  },
  "one-to-many-input-additional-field-format": {
    fields: ["one-to-many-input"],
    options: "FieldPropertyValueCollectionFormat",
    default: "",
    configuration: {
      source: "one-to-many-input-additional-field",
      additionalFieldProperties: [
        {
          label: "Align",
          name: "align",
          value: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        },
        {
          label: "Source",
          name: "source",
          value: "user",
          options: [
            { label: "User Input", value: "user" },
            {
              label: "Function",
              value: "function",
              fields: [
                { label: "Function", name: "function", type: "textarea" }
              ]
            },
            // { label: "Column", value: "column" },
            { label: "Webhook", value: "webhook" }
          ]
        },
        {
          label: "Function",
          name: "function",
          value: "",
          type: "textarea",
          validation: function (properties) {
            if (
              typeof properties !== "undefined" &&
              typeof properties.source !== "undefined" &&
              properties.source === "function"
            ) {
              return true;
            }

            return false;
          }
        }
      ]
    }
  },

  /* Report Table */
  "report-table-source": {
    fields: ["report-table"],
    options: "FieldPropertyTableColumnSelector",
    default: "",
    configuration: {
      additionalColumnAttributes: [
        {
          label: "Format",
          name: "format",
          value: "general",
          options: [
            { label: "Currency", value: "currency" },
            { label: "General", value: "general" },
            { label: "Date", value: "date" },
            { label: "Number", value: "number" }
          ]
        },
        {
          label: "Align",
          name: "align",
          value: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        }
      ]
    }
  },
  "report-table-filter": {
    fields: ["report-table"],
    options: "FieldPropertyFilterCollection",
    configuration: {
      source: "report-table-source"
    }
  },
  "report-table-sort": {
    fields: ["report-table"],
    options: "FieldPropertySortCollection",
    configuration: {
      source: "report-table-source"
    }
  },

  /* Filter Element */
  "filter-element": {
    fields: ["filter-text", "filter-date-range", "filter-drop-down"],
    options: [
      {
        name: "Text",
        value: "filter-text"
      },
      {
        name: "Date Range",
        value: "filter-date-range"
      },
      {
        name: "Drop Down",
        value: "filter-drop-down"
      }
    ],
    default: "filter-text"
  },
  "filter-condition": {
    fields: ["filter-text", "filter-drop-down"],
    options: [
      { label: "Equals To", value: "=" },
      { label: "Greather Than", value: ">" },
      { label: "Less Than", value: "<" },
      { label: "Greather Than Or Equals To", value: ">=" },
      { label: "Less Than Or Equals To", value: "<=" },
      { label: "Contains", value: "contain" }
    ],
    default: "="
  }
};
