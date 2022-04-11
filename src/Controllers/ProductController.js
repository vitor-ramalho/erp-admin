const Product = require('../Model/Product');
const User = require('../Model/User');
const jwt = require('jsonwebtoken')

module.exports = {
    async index(req, res) {

        const userId = req.params._id;
        const user = await User.findById(userId);
        const token = req.headers.authorization;
        if (!token) res.status(404).send('No token Provided')

        try {
            const validPass = await jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, user.password);
            const products = await Product.find().where("created_by").equals(user);

            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async login(req, res) {
        const user = await User.findOne({
            email: req.body.email,
        })

        //compare hashed password
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).send('Senha Incorreta')

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    },

    async create(req, res) {
        const userId = req.params._id;
        const user = User.findById(userId);

        console.log(userId);

        try {
            const product = new Product({
                name: req.body.name,
                value_buy: req.body.value_buy,
                value_sell: req.body.value_sell,
                category: req.body.category,
                stock: req.body.stock,
                created_by: userId
            })
            console.log(product);
            product.save();
            res.status(200).send(product);

        } catch (error) {
            return res.json(error);
        }
    },

    async update(req, res) {
        try {

            const { name, email, password } = req.body;

            const user = await User.findByIdAndUpdate({ name, email, password })

            return res.json(user);
        } catch (error) {
            return res.json(error);
        }
    },

    async delete(req, res) {

        try {
            const user = await User.findByIdAndDelete();

            return res.json(user);

        } catch (error) {
            return res.json(error);
        }
    }

}