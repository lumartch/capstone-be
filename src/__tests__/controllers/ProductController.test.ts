import Chance from 'chance';
import { ProductConstroller } from '../../controllers/ProductController';
import { ProductService } from '../../services/ProductService';

const productController = ProductConstroller();

//Dependencies

const projectService = ProductService();

const chance = new Chance();

// Mocked dependencies
jest.mock("../../services/ProductService");

describe("", () => {
    it("", () => {
        
    })
});