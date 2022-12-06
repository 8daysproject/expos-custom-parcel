export default {
  /* Format 
  "tag / field type": {
    "option name": { label: "label"},
  }
  */
  h1: {
    content: {
      label: "Content"
    }
  },
  input: {
    element: {
      label: "Element Type"
    },
    label: {
      label: "Label"
    },
    max: {
      label: "Max",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    maxlength: {
      label: "Max Length",
      rules: [
        {
          property: "type",
          values: ["text"]
        }
      ]
    },
    min: {
      label: "Min",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    minlength: {
      label: "Min Length",
      rules: [
        {
          property: "type",
          values: ["text"]
        }
      ]
    },
    placeholder: {
      label: "Placeholder",
      rules: [
        {
          property: "type",
          values: ["email", "number", "password", "tel", "text"]
        }
      ]
    },
    step: {
      label: "Step",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    type: {
      label: "Type"
    }
  },
  p: {
    content: {
      label: "Content"
    }
  },
  select: {
    element: {
      label: "Element Type"
    },
    items: {
      label: "Items"
    },
    label: {
      label: "Label"
    },
    multiple: {
      label: "Multiple"
    },
    placeholder: {
      label: "Placeholder"
    },
    size: {
      label: "Size"
    }
  },
  textarea: {
    element: {
      label: "Element Type"
    },
    label: {
      label: "Label"
    },
    placeholder: {
      label: "Placeholder"
    },
    rows: {
      label: "Rows"
    }
  },
  hr: {},

  "parent-child-drop-down": {
    element: {
      label: "Element Type"
    },
    label: {
      label: "Label"
    },
    "parent-child-drop-down-parent-element": {
      label: "Parent Element"
    },
    "parent-child-drop-down-parent-source": {
      label: "Parent Source"
    },
    "parent-child-drop-down-child-source": {
      label: "Child Source"
    }
  },

  "grid-input": {
    label: {
      label: "Label"
    },
    name: {
      label: "Name"
    },
    "grid-input-rows": {
      label: "Rows"
    },
    "grid-input-columns": {
      label: "Columns"
    },
    "grid-input-type": {
      label: "Type"
    }
  },

  "one-to-many-input": {
    label: {
      label: "Label"
    },
    name: {
      label: "Name"
    },
    "one-to-many-input-placeholder": {
      label: "Placeholder"
    },
    "one-to-many-input-search-placeholder": {
      label: "Search Placeholder"
    },
    "one-to-many-input-table": {
      label: "Table & Columns"
    },
    "one-to-many-input-additional-field": {
      label: "Additional Field"
    },
    "one-to-many-input-additional-field-format": {
      label: "Additional Field Format"
    },
    "one-to-many-input-table-action-column-label": {
      label: "Action Column Label"
    },
    "one-to-many-input-table-empty-placeholder": {
      label: "Empty Table Placeholder"
    }
  },

  "report-table": {
    "report-table-title": {
      label: "Title"
    },
    "report-table-source": {
      label: "Source"
    },
    "report-table-filter": {
      label: "Static Filters"
    },
    "report-table-sort": {
      label: "Sorts"
    },
    "report-table-limit": {
      label: "Limit",
      placeholder: "No Limit"
    }
  },

  "filter-text": {
    "filter-element": {
      label: "Type",
      name: "element"
    },
    label: {
      label: "Label"
    },
    "filter-condition": {
      label: "Condition"
    },
    placeholder: {
      label: "Placeholder"
    },
    value: {
      label: "Default Value"
    }
  },
  "filter-date-range": {
    "filter-element": {
      label: "Type",
      name: "element"
    },
    "date-start-label": {
      label: "Start Label"
    },
    "date-end-label": {
      label: "End Label"
    },
    "date-start-placeholder": {
      label: "Start Placeholder"
    },
    "date-end-placeholder": {
      label: "End Placeholder"
    },
    "date-start-value": {
      label: "Start Value"
    },
    "date-end-value": {
      label: "End Value"
    }
  },
  "filter-drop-down": {
    "filter-element": {
      label: "Type",
      name: "element"
    },
    label: {
      label: "Label"
    },
    items: {
      label: "Items"
    },
    "filter-condition": {
      label: "Condition"
    },
    value: {
      label: "Default Value"
    }
  }
};
