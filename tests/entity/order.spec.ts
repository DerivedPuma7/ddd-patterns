import Order from "../../src/entity/order";
import OrderItem from "../../src/entity/orderItem";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Item are required");
    });

    it("should calculate", () => {
        const item1 = new OrderItem("1", "item 1", 100);
        const item2 = new OrderItem("1", "item 2", 200);

        const order = new Order("1", "1", [item1]);

        expect(order.total()).toBe(100);

        const order2 = new Order("1", "1", [item1, item2]);

        expect(order2.total()).toBe(300);
    });
});
