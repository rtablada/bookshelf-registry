/* globals it, describe */

const expect = require('chai').expect;
const dummies = require('./dummy/connection');

const registry = require('../lib/registry');

describe('Registry', () => {
  beforeEach((done) => {
    const schema = dummies.connection.schema;

    schema.dropTableIfExists('users').then(() => {
      return schema.createTable('users', function(table) {
        table.increments();
        table.string('email');
      }).then(() => {
        dummies.createUser(done);
      });
    });
  });

  describe('Connection Storage', () => {
    // Since ideally we are working with a singleton,
    // let's check that this works first before resetting connection
    it('can read a registered connection', () => {
      expect(registry.getConnection()).to.equal(dummies.connection);
    });

    describe('registering connections', () => {
      var freshRegistry;
      var originalBookshelf;

      beforeEach(() => {
        require.cache[require.resolve('../lib/registry')] = null;

        i18nOriginal = require.cache[require.resolve('bookshelf')].exports;

        require.cache[require.resolve('bookshelf')].exports = function(x) {
          return `${x}-foo`;
        };

        freshRegistry = require('../lib/registry');
      });

      afterEach(() => {
        require.cache[require.resolve('../lib/registry')] = registry;
        require.cache[require.resolve('bookshelf')] = originalBookshelf;
      });

      it('can register and find connections', () => {
        freshRegistry.setConnection('mockconnection');

        expect(freshRegistry.getConnection()).to.equal('mockconnection');
        expect(freshRegistry.bookshelf).to.equal('mockconnection-foo');
      });
    });
  });

  describe('Model Registration', () => {
    it('can get a registered model', () => {
      var Dummy = registry.model('UserDummy');

      expect(Dummy).to.equal(dummies.userModel);
    });

    it('can get a model from the db', (done) => {
      var Dummy = registry.model('UserDummy');

      new Dummy({id: 1})
        .fetch()
        .then(function(model) {
          expect(model.get('email')).to.equal('test@bookshelf.com');

          done();
        });
    });
  });
});
