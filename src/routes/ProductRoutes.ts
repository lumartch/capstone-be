import express from "express";
import { ProductConstroller } from "../controllers/ProductController";

const productController = ProductConstroller();
const ProductRouter = express.Router();

ProductRouter.get("/", productController.findAllProducts);
ProductRouter.get("/:id", productController.findProductById);
ProductRouter.post("/", productController.createProduct);
ProductRouter.put("/:id", productController.updateProduct);
ProductRouter.delete("/:id", productController.deleteProduct);

export default ProductRouter;