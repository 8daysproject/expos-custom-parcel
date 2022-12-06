// import PouchDB from "pouchdb-browser/lib/index.js";
/* global PouchDB */

export default {
  bulkInsert: async function (db_name, docs) {
    const db = new PouchDB(db_name);

    let increment = 1;

    await db
      .allDocs({ endkey: "id-", descending: true, limit: 1 })
      .then(function (response) {
        try {
          const string_id = response.rows[0].id.replace("id-", "");
          increment = parseInt(string_id) + 1;
        } catch (error) {
          increment = 1;
        }
      });

    for (let index = 0; index < docs.length; index++) {
      if (typeof docs[index]._id === "undefined") {
        docs[index]._id = "id-" + increment;

        increment++;
      }

      docs[index] = this.convertNumber(docs[index]);
    }

    return db
      .bulkDocs(docs)
      .then(function () {
        return true;
      })
      .catch(function () {
        return false;
      });
  },
  delete: function (db_name, id) {
    const self = this;

    if (typeof id._id !== "undefined") {
      id = id._id;
    }

    return self
      .update(db_name, { _id: id, _deleted: true })
      .then(function (response) {
        return response;
      });
  },
  destroy(db_name) {
    const db = new PouchDB(db_name);

    return db.destroy();
  },
  get: function (db_name, id) {
    const db = new PouchDB(db_name);

    return db
      .get(id)
      .then(function (response) {
        return response;
      })
      .catch(function () {
        return false;
      });
  },
  getAll: function (db_name, columns, filters, sort, limit) {
    const self = this;
    const db = new PouchDB(db_name);

    let query_index = [];
    let sort_index = [];

    if (typeof filters !== "undefined") {
      self.buildQueryIndex(filters.conditions, query_index);
    }

    if (typeof sort !== "undefined") {
      sort_index = sort.map(function (item) {
        return item.column;
      });

      sort = sort.map(function (item) {
        let return_item = {};

        return_item[item.column] = item.type;

        return return_item;
      });
    }

    query_index = sort_index.concat(query_index);

    query_index = query_index.filter(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    return db
      .createIndex({
        index: {
          fields: query_index
        }
      })
      .then(function () {
        let selector = {};

        if (typeof filters !== "undefined") {
          self.buildSelector(filters.conditions, filters.operator, selector);
        }

        return db
          .find({
            selector: selector,
            sort: sort,
            limit: limit
          })
          .then(function (results) {
            return results.docs;
          });
      });
  },
  getLast: async function (db_name) {
    const db = new PouchDB(db_name);

    return db
      .allDocs({ endkey: "id-", descending: true, limit: 1 })
      .then(function (response) {
        if (
          typeof response.rows !== "undefined" &&
          typeof response.rows[0] !== "undefined"
        ) {
          return response.rows[0];
        }

        return false;
      });
  },
  insert: async function (db_name, doc) {
    const db = new PouchDB(db_name);

    if (typeof doc._id === "undefined") {
      let response = await this.getLast(db_name);

      let increment = 0;

      try {
        const string_id = response.id.replace("id-", "");
        increment = Number(string_id) + 1;
      } catch (error) {
        increment = 1;
      }

      doc._id = "id-" + increment.toString().padStart(8, "0");
    }

    doc = this.convertNumber(doc);

    return db
      .put(doc)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);

        return false;
      });
  },
  update: function (db_name, doc) {
    const self = this;

    doc = this.convertNumber(doc);

    return self.get(db_name, doc._id).then(function (response) {
      if (response) {
        doc._rev = response._rev;

        return self.insert(db_name, doc);
      }

      return false;
    });
  },
  updateOrInsert: function (db_name, doc) {
    const self = this;

    doc = this.convertNumber(doc);

    // for (const key in doc) {
    //   if (Object.hasOwnProperty.call(doc, key)) {
    //     const property = doc[key];

    //     console.log(property);
    //   }
    // }

    return self.update(db_name, doc).then(function (response) {
      if (response) {
        return response;
      } else {
        return self.insert(db_name, doc);
      }
    });
  },
  buildQueryIndex(conditions, array) {
    const self = this;

    if (typeof conditions !== "undefined") {
      for (let index = 0; index < conditions.length; index++) {
        const condition = conditions[index];

        if (typeof condition.conditions !== "undefined") {
          self.buildQueryIndex(condition.conditions, array);
        } else {
          if (!array.includes(condition.field)) {
            array.push(condition.field);
          }
        }
      }
    }
  },
  buildSelector(conditions, operator, selector) {
    const self = this;

    const selectors_operator_mapping = {
      and: "$and",
      or: "$or"
    };

    const selectors_mapping = {
      "=": "$eq",
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte"
    };

    const current_selector_operator = selectors_operator_mapping[operator];

    selector[current_selector_operator] = [];

    if (typeof conditions !== "undefined") {
      for (let index = 0; index < conditions.length; index++) {
        const condition = conditions[index];

        if (typeof condition.conditions !== "undefined") {
          selector[current_selector_operator].push({});

          self.buildSelector(
            condition.conditions,
            condition.operator,
            selector[current_selector_operator][
              selector[current_selector_operator].length - 1
            ]
          );
        } else {
          let current_selector = {};
          let is_nan = isNaN(condition.value);

          if (!is_nan) {
            condition.value = Number(condition.value);
          }

          current_selector[condition.field] = {};
          current_selector[condition.field][
            selectors_mapping[condition.condition]
          ] = condition.value;

          selector[current_selector_operator].push(current_selector);
        }
      }
    }
  },
  convertNumber: function (doc) {
    for (const key in doc) {
      if (Object.hasOwnProperty.call(doc, key)) {
        if (key === "_id") {
          continue;
        }

        if (doc[key] !== "" && !isNaN(doc[key])) {
          doc[key] = Number(doc[key]);
        }
      }
    }

    return doc;
  }
};
