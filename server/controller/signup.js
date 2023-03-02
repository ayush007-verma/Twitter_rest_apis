const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretkey = process.env.SECRET_KEY

const signup = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'Please provide all required fields' })
        }
        
        const existingUser = users.find(user => user.email === email)
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user object and add to users array
        const user = { id: users.length + 1, name, email, phone, password: hashedPassword }
        users.push(user)

        const token = jwt.sign({ id: user.id }, secretkey, { expiresIn: '1h' })
        res.json({ message: 'User created successfully', token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = signup