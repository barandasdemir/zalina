exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productSizes').del()
        .then(function () {
            // Inserts seed entries
            return knex('productSizes').insert([{
                product: 1,
                size: 1,
            }, {
                product: 1,
                size: 2,
            }, {
                product: 1,
                size: 3,
            }, {
                product: 1,
                size: 4,
            }, {
                product: 2,
                size: 1,
            }, {
                product: 2,
                size: 2,
            }, {
                product: 3,
                size: 3,
            }, {
                product: 3,
                size: 4,
            }, {
                product: 3,
                size: 1,
            }, {
                product: 3,
                size: 2,
            }, {
                product: 4,
                size: 1,
            }, {
                product: 4,
                size: 2,
            }, ]);
        });
};
