import Chance from "chance";

import ProductService from "../../services/ProductService";
import { ProductModel } from "../../models/ProductModel";
import { IProduct } from "../../models/Types";

const chance = new Chance();
const productService = ProductService();
const productModel = new ProductModel();

jest.mock('../../models/ProductModel');

describe('ProductService Unit Test', () => {
    let id: string, productData: IProduct, updatedProduct: IProduct;
    beforeEach(() => {
        id = chance.guid();
        productData = {
            name: chance.name(),
            imageUrl: chance.string(),
            price: chance.age(),
            description: chance.string(),
        }
        updatedProduct = productData;
        global.console = { log: jest.fn(), error: jest.fn() }
        ProductModel.find = jest.fn().mockReturnThis();
        ProductModel.findById = jest.fn().mockReturnThis();
        productModel.save = jest.fn().mockReturnValue(productData);
        ProductModel.findByIdAndUpdate = jest.fn().mockReturnThis();
        ProductModel.findByIdAndDelete = jest.fn().mockReturnThis();
        ProductModel.lean = jest.fn().mockReturnThis();
    })
    it('should return all products', async() => {
        ProductModel.exec = jest.fn().mockResolvedValue([productData]);
        const data = await productService.findAllProducts();
        expect(data.length).toBe(1);
    });

    it('should return a product by ID', async() => {
        ProductModel.exec = jest.fn().mockResolvedValue(productData);
        await productService.findProductById(id);
        expect(ProductModel.findById).toBeCalledWith(id);
    });

    it('should return an updated product', async() => {
        ProductModel.exec = jest.fn().mockResolvedValue(productData);
        const data = await productService.updateProduct(id, productData);
        expect(data).toEqual(updatedProduct)
    });

    it("Should call findById with an ID property", async () => {
        await productService.deleteProduct(id);
        expect(ProductModel.findByIdAndDelete).toBeCalledWith(id);
    });
});