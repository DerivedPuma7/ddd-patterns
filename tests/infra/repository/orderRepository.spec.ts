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
    let customerRepository: CustomerRepository;
    let productRepository: ProductRepository;
    let orderRepository: OrderRepository;

    beforeEach(async () => {
        customerRepository = new CustomerRepository();
        productRepository = new ProductRepository();
        orderRepository = new OrderRepository();

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

    const createDefaultCustomer = () => {
        const customer = new Customer('1234', "customer 1");
        const address = new Address("street 1", 1, "zip 1", "city 1");
        customer.changeAddress(address);
        return customer;
    }

    const createDefaultProduct = () => {
        return new Product('1', "product 1", 10);
    }

    it('should create a new order', async () => {
        const customer = createDefaultCustomer();
        const customer_id = customer.id;
        await customerRepository.create(customer);

        const product = createDefaultProduct();
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order_id = "123";
        const order = new Order(order_id, customer_id, [orderItem]);

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

    it("should find an order", async () => {
		const customer = createDefaultCustomer();
		const product = createDefaultProduct();
		const orderItem1 = new OrderItem("1", "Order Item 1", product.price, product.id, 1);
		const order = new Order("1", customer.id, [orderItem1]);
		await customerRepository.create(customer);
		await productRepository.create(product);
		await orderRepository.create(order);

		const orderFound = await orderRepository.find(order.id);

		expect(orderFound).toEqual(order);
	});

    it("should throw when order is not found", async () => {
        const fakeId = "any fake id";
		expect(async () => {
			await orderRepository.find(fakeId);
		}).rejects.toThrow(`Order with id: ${fakeId} not found`);
	});

    it("should find all orders", async () => {
		const customer = createDefaultCustomer();
        const product1 = new Product("1", "fake product 1", 10);
        const product2 = new Product("2", "fake product 2", 20);
        const product3 = new Product("3", "fake product 3", 30);
        const orderItem1 = new OrderItem("1", "fake order item 1", product1.price, product1.id, 1);
        const orderItem2 = new OrderItem("2", "fake order item 2", product2.price, product2.id, 2);
        const orderItem3 = new OrderItem("3", "Order Item 3", product3.price, product3.id, 3);
		const order1 = new Order("329", customer.id, [orderItem1, orderItem2]);
		const order2 = new Order("330", customer.id, [orderItem3]);

		await customerRepository.create(customer);
		await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);
		await orderRepository.create(order1);
		await orderRepository.create(order2);

		const orders = await orderRepository.findAll();

		expect(orders.length).toBe(2);
		expect(orders).toContainEqual(order1);
		expect(orders).toContainEqual(order2);
	});
});
