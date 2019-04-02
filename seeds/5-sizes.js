exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('sizes').del()
        .then(function () {
            // Inserts seed entries
            return knex('sizes').insert([{
                name: 'XS',
            }, {
                name: 'S',
            }, {
                name: 'M',
            }, {
                name: 'L',
            }, {
                name: 'XL',
            }, {
                name: 'XXL',
            }]);
        });
};
