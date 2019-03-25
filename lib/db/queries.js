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

    async getUserInfoById(id) {
        const info = await db('users')
            .where('id', id)
            .select('clientname', 'clientsurname', 'phonenumber', 'idnumber', 'isAdmin');
        return info;
    },

    async getProductListing(category, type) {
        const listing = await db('products')
            .join('productTypes', 'products.productType', 'productTypes.id')
            .join('categories', 'productTypes.category', 'categories.id')
            .where({
                'categories.name': category,
                'productTypes.name': type
            })
            .select('products.id', 'products.name', 'products.price');
        return listing;
    },

    async getProductById(id) {
        const product = await db('products')
            .where('id', id)
            .select();
        return product;
    },

    async getUserById(id) {
        const user = await db('users')
            .where('id', id)
            .select();
        return user;
    },

    async getUserByMail(mail) {
        const user = await db('users')
            .where('email', mail.trim())
            .select();
        return user;
    },

    async updateUserInfo(id, update) {
        const query = await db('users')
            .where('id', id)
            .update(update);

        return query;
    },

    async createUser(user) {
        await db('users').insert({
            email: user.email,
            password: user.password
        });
    },
}
