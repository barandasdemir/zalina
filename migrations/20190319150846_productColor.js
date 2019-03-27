exports.up = function (knex, Promise) {
    return knex.schema.createTable('productColors', table => {
        table.increments();
        table.integer('product').unsigned().notNullable().references('products.id');
        table.integer('color').notNullable().unsigned().references('colors.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('productColors');
};
