exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.binary('isAdmin').defaultTo(0);
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
