const db = require('./db');

module.exports = {
    async getCategories() {
        const categories = await db('categories').select('name');
        return categories.map(row => row.name);
    },

    async getProductTypesByCategory(category) {
        const types = await db('productTypes')
            .join('categories', 'productTypes.category', 'categories.id')
            .where('categories.name', category)
            .select('productTypes.name');
        return types.map(row => row.name);
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
            .select('id');
        return product;
    },

    async getUserByMail(mail) {
        const user = await db('users')
            .where('email', mail.trim())
            .select();
        return user;
    },

    async createUser(user) {
        await db('users').insert({
            email: user.email,
            password: user.password
        });
    },
}
