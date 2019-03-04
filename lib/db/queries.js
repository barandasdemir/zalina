const db = require('./db');

const mapped = (arr) => arr.map(row => row.name);

module.exports = {
    async getCategories() {
        const categories = await db('categories').select('name');
        return mapped(categories)
    },

    async getProductTypesByCategory(category) {
        const types = await db('productTypes')
            .join('categories', 'productTypes.category', 'categories.id')
            .where('categories.name', category)
            .select('productTypes.name');
        return mapped(types);
    },

    async getProductListing(category, type) {
        const types = await db('products')
            .join('productTypes', 'products.productType', 'productTypes.id')
            .join('categories', 'productTypes.category', 'categories.id')
            .where({
                'categories.name': category,
                'productTypes.name': type
            })
            .select('products.id', 'products.name', 'products.price');
        return types;
    },

    async getProductById(id) {
        const product = await db('products')
            .where('id', id)
            .select();
        return product;
    },

    async createUser(user) {
        const product = await db('users')
            .insert({
                email: user.email,
                password: user.password
            })
        return product;
    },
}
