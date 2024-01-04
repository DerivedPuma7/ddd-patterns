import ProductModel from "../../../src/infrastructure/db/sequelize/model/productModel";
import ProductRepository from "../../../src/infrastructure/repository/productRepository";
import Product from "../../../src/domain/entity/product"

import { Sequelize } from "sequelize-typescript";

describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "product 1",
            price: 100
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "product 1", 100);

        await productRepository.create(product);
        product.changeName("product 2");
        product.changePrice(200);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "product 2",
            price: 200
        });
    });
});