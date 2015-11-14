const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: `${__dirname}/dummy.sqlite`,
  },
});

const userOptions = {
  tableName: 'users',
};

const registry = require('../../lib/registry');

registry.setConnection(knex);

var UserModel = registry.model('UserDummy', userOptions);

module.exports.connection = knex;
module.exports.userModel = UserModel;
module.exports.createUser = (cb) => {
  new UserModel({email: 'test@bookshelf.com'}).save().then(() => {
    cb();
  });
};
