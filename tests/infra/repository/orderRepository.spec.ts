import Address from "../../../src/domain/entity/address";
import Customer from "../../../src/domain/entity/customer";
import Product from "../../../src/domain/entity/product";
import OrderItem from "../../../src/domain/entity/orderItem";
import Order from "../../../src/domain/entity/order";

import CustomerModel from "../../../src/infrastructure/db/sequelize/model/customerModel";
import OrderItemModel from "../../../src/infrastructure/db/sequelize/model/orderItemModel";
import OrderModel from "../../../src/infrastructure/db/sequelize/model/orderModel";
import ProductModel from "../../../src/infrastructure/db/sequelize/model/productModel";
import CustomerRepository from "../../../src/infrastructure/repository/customerRepository";

import ProductRepository from "../../../src/infrastructure/repository/productRepository";
import OrderRepository from "../../../src/infrastructure/repository/orderRepository";

import { Sequelize } from "sequelize-typescript";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository();
        const customer_id = "1234";
        const customer = new Customer(customer_id, "customer 1");
        const address = new Address("street 1", 1, "zip 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', "product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order_id = "123";
        const order = new Order(order_id, customer_id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order_id,
            customer_id: customer_id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id
                }
            ]
        });
    });
});
