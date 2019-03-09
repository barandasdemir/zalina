exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('isAdmin').defaultTo(0).notNullable();
        table.string('currentSession').defaultTo('-1').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
