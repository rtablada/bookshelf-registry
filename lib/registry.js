var Bookshelf = require('bookshelf');

var registry = {
  connection: null,

  models: {},

  setConnection: function(knex) {
    this.connection = knex;
    this.bookshelf = Bookshelf(knex);
  },

  getConnection: function() {
    return this.connection;
  },

  model: function(modelName, properties) {
    var model;

    if (properties) {
      model = this.bookshelf.Model.extend(properties);

      this.models[modelName] = model;

      return model;
    }

    return this.models[modelName];
  },
};

module.exports = registry;
