import express from "express";
import ProductConstroller from "../controllers/ProductController";

const { createProduct, deleteProduct, findAllProducts, findProductById, updateProduct } = ProductConstroller();
const ProductRouter = express.Router();

ProductRouter.get("/", findAllProducts);
ProductRouter.get("/:id", findProductById);
ProductRouter.post("/", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;