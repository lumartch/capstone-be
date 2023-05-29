import { ProductModel } from "../models/ProductModel"
import { IProduct } from "../models/Types";

export const ProductService = () => {

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

    return { findAllProducts, findProductById, createProduct };
}
