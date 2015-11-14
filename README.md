# Bookshelf Registry

This package allows for a quick and simple syntax for looking up a KNEX connection and Bookshelf.js models.
This uses Node's `require` to prevent passing around a global connection object.

## Setting a Default KNEX Connection

The first part of the setup for the registry is to set the KNEX connection.
So for instance to use a sqlite connection:

```js
const registry = require('bookshelf-registry');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: `${__dirname}/dummy.sqlite`,
  },
});

registry.setConnection(knex);
```

This will set up connection that can be used to look up the connection, but more than that in a bit.
This also creates a new bookshelf instance that can be looked up as well.

## Getting the KNEX Connection

Just like the `setConnection`, looking up the existing connection is fairly simple.

```js
const registry = require('bookshelf-registry');

const knex = registry.getConnection();
```

Since node's `require` function is a shared singleton, looking up this connection can be anywhere in your codebase after `setConnection` has been executed.

## Defining Models

The only other API that this registry provides is the ability to create and look up models.
So to start, to create a `User` model:

```js
const registry = require('bookshelf-registry');

const UserModel = registry.model('User', {
  tableName: 'users',
});
```

If this looks just like Bookshelf, that's because it is.

## Grabbing Models

What if you want to use that User model somewhere else in your app?
Just use the model function to grab that defined user model:

```js
const registry = require('bookshelf-registry');

const UserModel = registry.model('User');

new UserModel({email: 'test@bookshelf.com'}).save().then(() => {
  cb();
});
```

## Contributing

I always love contributions, thoughts etc.
Please follow the [Contribution Guidelines](CONTRIBUTING.md)

## License

This library is distributed using the MIT License.
For more information see the [full license](LICENSE.md).
