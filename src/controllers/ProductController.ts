import { Request, Response } from "express";
import ProductService from "../services/ProductService";

const ProductConstroller = () => {
    const productService = ProductService();
    
    const findAllProducts = async (req: Request, res: Response) => {
        try {
            let products = await productService.findAllProducts();
            res.json({ products });
        } catch (e){
            res.status(500).json({
                message: e,
            });
        }
    }

    const findProductById = async (req: Request, res: Response) => {
        const { id } = req.params; 
        if (!isIdValid(id)) {
            res.status(400).json({
                message: "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer.",
            });
            return;
        }
        try {
            let project = await productService.findProductById(id);
            if(!project){
                res.status(404).json({
                    message: "Project not found.",
                });
            } else{ 
                res.json(project);
            }
        } catch (e) {
            res.status(500).json({
                message: "Internal error.",
            });
        }
    }

    const createProduct = async (req: Request, res: Response) => {
        try {
            let product = await productService.createProduct(req.body);
            res.status(201).json({
                message: "Product created",
                product: product,
            });
        } catch (e) {
            res.status(400).json({
                message: e,
            });
        }
    }

    const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        if(!isIdValid(id)){
            res.status(400).json({
                message: "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer.",
            });
            return;
        }
        const projectData = req.body;
        try {
            const updatedProjecData = await productService.updateProduct(id, projectData);
            res.status(200).json(updatedProjecData);
        } catch (e) {
            console.error("Error: ", e);
            res.status(500).json({
                message: "Internal error",
            });
        }
    }

    const deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        if(!isIdValid(id)){
            res.status(400).json({
                message: "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer.",
            });
            return;
        }
        try {
            await productService.deleteProduct(id);
            res.status(204).json();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal error" });
        }
    }

    const isIdValid = (id: string) => id.match(/^[0-9a-fA-F]{24}$/);

    return { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct };
}

export default ProductConstroller;