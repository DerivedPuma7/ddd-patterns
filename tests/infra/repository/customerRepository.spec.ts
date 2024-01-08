import CustomerModel from "../../../src/infrastructure/db/sequelize/model/customerModel";
import CustomerRepository from "../../../src/infrastructure/repository/customerRepository";
import Customer from "../../../src/domain/entity/customer";
import Address from "../../../src/domain/entity/address";

import { Sequelize } from "sequelize-typescript";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "name");
        const address = new Address("street 1", 1, "zip", "city");
        customer.Address = address;
        
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "name");
        const address = new Address("street 1", 1, "zip", "city");
        customer.Address = address;
        await customerRepository.create(customer);
        
        customer.changeName("name 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "name");
        const address = new Address("street 1", 1, "zip", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("any fake id")
        }).rejects.toThrow("Customer not found")
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        
        const customer1 = new Customer("1", "name 1");
        const address1 = new Address("street 1", 1, "zip 1", "city 1");
        customer1.Address = address1;
        const customer2 = new Customer("2", "name 2");
        const address2 = new Address("street 2", 2, "zip 2", "city 2");
        customer2.Address = address2;

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer1, customer2];

        expect(customers).toEqual(foundCustomers);
        foundCustomers.forEach(foundCustomer => expect(foundCustomer).toBeInstanceOf(Customer));
    });
});