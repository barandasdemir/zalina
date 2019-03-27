exports.up = function (knex, Promise) {
    return knex.schema.createTable('sizes', table => {
        table.increments();
        table.string('name').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('sizes');
};
