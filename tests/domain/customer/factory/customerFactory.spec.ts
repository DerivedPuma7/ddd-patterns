import CustomerFactory from "../../../../src/domain/customer/factory/customerFactory";
import Address from "../../../../src/domain/customer/value-object/address";

describe("Customer Factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer", () => {
        const address = new Address("Street", 1, "zip", "city");
        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    });
});
