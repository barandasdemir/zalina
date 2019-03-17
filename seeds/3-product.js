exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products').del()
        .then(function () {
            // Inserts seed entries
            return knex('products').insert([{
                name: 'Deri Ceket',
                description: 'insert description here',
                price: '1499',
                stock: 1000,
                productType: 2
            },
            {
                name: 'Kapüşonlu Üst',
                description: 'description',
                price: '99.9',
                stock: 490,
                productType: 13
            },
            {
                name: 'Tisort',
                description: 'description',
                price: '29.9',
                stock: 400,
                productType: 16
            },
            {
                name: 'Kapüşonlu Üst',
                description: 'something about the product',
                price: '99',
                stock: 13,
                productType: 13
            },
            {
                name: 'Baskılı Sweatshirt',
                description: 'desc',
                price: '130',
                stock: 30,
                productType: 13
            },
            ]);
        });
};
