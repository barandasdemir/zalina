exports.up = function (knex, Promise) {
    return knex.schema.createTable('orders', table => {
        table.increments();
        table.integer('user').unsigned().notNullable().references('users.id');
        table.timestamp('date').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('orders');
};
