import Address from "../../src/domain/entity/address";
import Customer from "../../src/domain/entity/customer";

describe("Customer unit tests", () => {
    it("should throw an error if id is not provided", () => {
        const id = "";
        const name = "fake name";

        expect(() => {
            let customer = new Customer(id, name);
        }).toThrow("Id is required");
    });

    it("should throw an error if name is not provided", () => {
        const id = "123";
        const name = "";

        expect(() => {
            let customer = new Customer(id, name);
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        // arrange
        const id = "123";
        const name = "fake name";
        const newName = "fake new name";
        
        // act
        const sut = new Customer(id, name);
        sut.changeName(newName);

        // assert
        expect(sut.name).toBe(newName);
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "name");
        const address = new Address("fake street", 123, "fake zip", "fake city");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "name");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when activating and address is undefined", () => {
        const customer = new Customer("1", "name");

        expect(() => {
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should set reward points to zero to new customers", () => {
        const customer = new Customer("1", "name");
        expect(customer.rewardPoints).toBe(0);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "name");

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(110);
    });
});