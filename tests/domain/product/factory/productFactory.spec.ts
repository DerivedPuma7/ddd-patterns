import ProductFactory from "../../../../src/domain/product/factory/productFactory";

describe("Product Factory unit tests", () => {
    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Product A", 1);
        
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type b", () => {
        const product = ProductFactory.create("b", "Product B", 2);
        
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(4);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw when product type is not supported", () => {
        expect(() => {
            ProductFactory.create("c", "Product B", 2);
        }).toThrow("Product type not supported")
    });
});
