const db = require('./db');
const knex = require('knex');

module.exports = {
    async getAll(table) {
        return await db(table).select();
    },

    async getId(table, column, value) {
        const query = await db(table)
            .where(column, value)
            .select('id');
        return query[0].id;
    },

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

    async getProductColors(id) {
        const colors = await db('productColors')
            .join('colors', 'productColors.color', 'colors.id')
            .where('productColors.product', id)
            .select('name');
        return colors.map(row => row.name);
    },

    async getProductSizes(id) {
        const colors = await db('productSizes')
            .join('sizes', 'productSizes.size', 'sizes.id')
            .where('productSizes.product', id)
            .orderBy('sizes.id')
            .select('name');
        return colors.map(row => row.name);
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
    async addAddress(userId, address) {
        await db('addresses').insert({
            userId: userId,
            title: address.title,
            country: address.country,
            city: address.city,
            postalcode: address.postalcode,
            location: address.location,
            content: address.content
        });
    },
    async getAddress(userId) {
        const addresses = await db('addresses').where('userId', userId)
            .select();
        return addresses;
    },
    async createUser(user) {
        await db('users').insert({
            email: user.email,
            password: user.password
        });
    },

    async createOrder(uid, cart) {
        if (cart && cart.length > 0) {
            const order = await db('orders').insert({
                user: uid
            }, ['id']);
            cart.forEach(async (item) => {
                const color = await this.getId('colors', 'name', item.color);
                const size = await this.getId('sizes', 'name', item.size);
                await db('orderProducts').insert({
                    order,
                    product: item.id,
                    size,
                    color,
                    qty: item.qty
                });
            });
        }
    },

    async getOrdersOfUser(uid) {
        return db.raw(`select id, date, (select sum(qty) as qty from orderProducts op where op.order = id) as qty from orders where user = ${uid}`);
    },

    async getOrderProducts(order) {
        return db('orderProducts')
            .select('products.name', 'products.price', 'sizes.name as size', 'colors.name as color', 'qty')
            .join('products', 'products.id', 'orderProducts.products')
            .join('colors', 'colors.id', 'orderProducts.color')
            .join('sizes', 'sizes.id', 'orderProducts.size')
            .where({
                order
            });
    },
}
