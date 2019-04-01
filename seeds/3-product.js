exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products').del()
        .then(function () {
            // Inserts seed entries
            return knex('products').insert([{
                name: 'Deri Ceket',
                description: 'insert description here',
                price: '1499',
                productType: 2,
                productCode: 155
            },
            {
                name: 'Kapüşonlu Üst',
                description: 'description',
                price: '99.9',
                productType: 13,
                productCode: 155

            },
            {
                name: 'Tisort',
                description: 'description',
                price: '29.9',
                productType: 16,
                productCode: 155

            },
            {
                name: 'Kapüşonlu Üst',
                description: 'something about the product',
                price: '99',
                productType: 13,
                productCode: 155
            },
            {
                name: 'Baskılı Sweatshirt',
                description: 'desc',
                price: '130',
                productType: 13,
                productCode: 155
            },
            ]);
        });
};
