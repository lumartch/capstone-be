import { ProductModel } from "../models/ProductModel"
import { IProduct } from "../models/Types";

const ProductService = () => {

    const findAllProducts = async () => {
        return ProductModel.find().lean().exec();
    }
    
    const findProductById = async (id: string) => {
        return ProductModel.findById(id).lean().exec();
    }

    const createProduct = async (product: IProduct) => {
        const newProduct = new ProductModel({
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price,
        });
        return await newProduct.save();
    }

    const updateProduct = async (id: string, product: IProduct) => {
        return await ProductModel.findByIdAndUpdate(id, product, { new: true } ).lean().exec();
    }
    
    const deleteProduct = async (id: string) => {
        return await ProductModel.findByIdAndDelete(id).lean().exec();
    }

    return { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct };
}

export default ProductService;