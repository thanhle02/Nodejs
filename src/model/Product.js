import mongoose from "mongoose";

const ProductSchema = new  mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    desc: {
        type: String,
        require: true
    }
},{versionKey: false, timestamps:true})

export default mongoose.model('Product', ProductSchema)
