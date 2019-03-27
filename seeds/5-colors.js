exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('colors').del()
        .then(function () {
            // Inserts seed entries
            return knex('colors').insert([{
                name: 'Mavi',
            }, {
                name: 'Mor',
            }, {
                name: 'Kırmızı',
            }, {
                name: 'Gri',
            }, {
                name: 'Siyah',
            }, ]);
        });
};
