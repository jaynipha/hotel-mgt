import { UserModel } from '../models/user.js';
import { hashPassword, createToken, comparePassword } from '../utils/toolbox.js'

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const checkExistingUser = await UserModel.findOne({ email });
        if (checkExistingUser !== null) {
            return res.status(400).json({
                status: false,
                message: "User Exist!!",
            })
        }

        const data = {
            role,
            email,
            lastName,
            firstName,
            password: hashPassword(password),
        }

        const newUser = await UserModel.create(data);
        await newUser.save();

        const token = createToken({ role, email, id: newUser.id })
        return res.status(201).send({ status: true, data: newUser, token })
    } catch (error) {
        return res.status(404).json(error.message);
    }
}


export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkExistingUser = await UserModel.findOne({ email });

        if (checkExistingUser.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        const checkPasswordValidity = comparePassword(password, checkExistingUser.password);

        if (!checkPasswordValidity) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        const token = createToken({ role: checkExistingUser.role, email, id: checkExistingUser.id });
        return res.status(200).send({ status: true, data: checkExistingUser, token })

    } catch (error) {
        return res.status(404).json(error.message);
    }
}

export const deleteUser = async (req, res) => {
    const { email } = req.query;

    try {
        const checkExistingUser = await UserModel.findOne({ email });

        if (checkExistingUser === null) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        await UserModel.deleteOne({ email })
        return res.status(200).send({ status: true, message: `User with ${email} deleted !!` })
    } catch (error) {
        return res.status(404).json(error.message);
    }
}

export const getAllUser = async (req, res) => {
    try {

        const users = await UserModel.find()
        return res.status(200).send({ status: true, data: users })
    } catch (error) {
        return res.status(404).json(error.message);
    }
}

