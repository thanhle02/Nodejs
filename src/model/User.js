import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "member"
    }
}, { versionKey: false, timestamps: true })

export default mongoose.model("User", userSchema)