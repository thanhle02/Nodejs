import Product from "../model/Product"
import productSchema from "../validations/product";

export const create = async (req, res) => {
    try {
        
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const data = await Product.create(body);
        if (!data) {
            throw new Error("Failed");
        }

        return res.status(200).json({
            message: "Success",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getAll = async(req,res)=>{
    try {
        const data = await Product.find({})
        if (!data) {
            return res.status(404).json({
                message: " getAll product fail"
            })
            
        }

        return res.status(200).json({
            message: "getAll product success",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const getDetail = async(req,res)=>{
    try {

        const data = await Product.findById( req.params.id)
        if (!data) {
            return res.status(404).json({
                message: " getdetail product fail"
            })
            
        }

        return res.status(200).json({
            message: "getdetail product success",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                message: "Xoá sản phẩm thất bại!",
            });
        }

        return res.status(200).json({
            message: "Xoá sản phẩm thành công!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Xoá sản phẩm thất bại!",
        });
    }
};
export const update = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;

        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const data = await Product.findByIdAndUpdate(id, body, { new: true });
        if (!data) {
            return res.status(404).json({
                message: "Cập nhật sản phẩm thất bại!",
            });
        }

        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công!",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};