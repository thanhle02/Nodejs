import User from "../model/User"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { signInValid, signUpValid } from "../validations/user"
dotenv.config()
const { SECRET_KEY } = process.env
export const signUp = async(req,res)=>{
    try {
       const {error}= signUpValid.validate(req.body,{abortEarly:false})
       if (error) {
        const errors = error.details.map(err => err.message)
        return res.status(400).json({
            messages: errors
        })
    }
    const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?"
            })
        }
        const hashPassword = await bcryptjs.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        user.password = undefined
        return res.status(200).json({
            message: "Tạo tài khoản thành công!",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}
export const signIn = async (req, res) => {
    try {
        const { error } = signInValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                messages: errors
            })
        }
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: "Email này chưa được đăng ký, mời bạn tạo tài khoản "
            })
        }
        const isMatch = await bcryptjs.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu bạn nhập chưa đúng mời bạn nhập lại  "
            })
        }
        const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY, { expiresIn: "1d" })
        user.password = undefined
        return res.status(200).json({
            message: "Bạn đã đăng nhập thành công",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}