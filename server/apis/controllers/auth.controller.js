const authModel = require('../models/auth.models.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const register = async (req, res, next) => {
    const { name, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 12)
    try {
        await authModel.create({ name, email, password: hashedPassword })
        res.json({
            status: 'SUCCESS',
            message: 'user register successfully',
            credentials: req.body
        })
    } catch (err) {
        res.json({
            status: 'FAILED',
            message: err.message
        })
        console.log(err)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const currentUser = await authModel.findOne({ email })
        if (currentUser) {
            const decryptPassword = bcrypt.compareSync(password, currentUser.password)
            if (decryptPassword) {
                const jwtToken = jwt.sign({ email }, process.env.PRIVATEKEY, { expiresIn: 60 * 60 * 60 })
                res.json({
                    status: 'SUCCESS',
                    name: currentUser.name,
                    message: 'login successfull',
                    token: jwtToken,
                    id: currentUser._id
                })
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'email and password does not matched'
                })
            }
        } else {
            res.json({
                status: 'FAILED',
                message: 'user not found with this email'
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            status: 'FAILED',
            message: err.message
        })
    }
}

const profile = async (req, res) => {
    const { userId } = req.params;
    try {
        const userProfile = await authModel.findById(userId);
        if (userProfile) {
            res.json(userProfile); // Return the user profile as JSON
        } else {
            res.status(404).json({ error: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const update = async (req, res) => {
    try {
        const { userId } = req.params;
        const { updateState } = req.body;

        // console.log(updateState)
        if (updateState.newPassword.trim() !== '' || updateState.name.trim() !== '') {
            // At least one of name or password is provided
            if (updateState.newPassword.trim() !== '') {
                const decryptPassword = bcrypt.compareSync(updateState.oldPassword, updateState.prevPassword);
                // console.log(decryptPassword)
                if (decryptPassword) {
                    const hashedPassword = bcrypt.hashSync(updateState.newPassword, 12);
                    await authModel.findByIdAndUpdate(userId, { password: hashedPassword });
                } else {
                    res.json({
                        status: 'FAILED',
                        message: 'Please check your old password!'
                    });
                    return;
                }
            }

            if (updateState.name.trim() !== '') {
                await authModel.findByIdAndUpdate(userId, { name: updateState.name });
            }

            res.json({
                status: 'SUCCESS',
                message: 'Profile updated successfully!'
            });

        } else {
            // Neither name nor password is provided
            res.json({
                status: 'FAILED',
                message: 'No valid update data provided.'
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    register,
    login,
    profile,
    update
};