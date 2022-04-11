const User = require('../Model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    async index(req, res) {
        const users = await User.find();
        console.log(users);

        res.status(200).send({users});
    },

    async login(req,res){
        const user = await User.findOne({
            email: req.body.email,
        })

        //compare hashed password
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).send('Senha Incorreta')

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET );
        res.header('auth-token', token).send(token);
    },

    async create(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            console.log(user);
            user.save();
            res.status(200).send(user);

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