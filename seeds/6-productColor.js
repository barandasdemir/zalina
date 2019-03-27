exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productColors').del()
        .then(function () {
            // Inserts seed entries
            return knex('productColors').insert([{
                product: 1,
                color: 1,
            }, {
                product: 1,
                color: 2,
            }, {
                product: 1,
                color: 3,
            }, {
                product: 1,
                color: 4,
            }, {
                product: 2,
                color: 1,
            }, {
                product: 2,
                color: 2,
            }, {
                product: 3,
                color: 3,
            }, {
                product: 3,
                color: 4,
            }, {
                product: 3,
                color: 1,
            }, {
                product: 3,
                color: 2,
            }, {
                product: 4,
                color: 1,
            }, {
                product: 4,
                color: 2,
            }, ]);
        });
};
