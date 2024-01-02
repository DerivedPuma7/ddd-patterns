import OrderItem from "../../src/entity/orderItem";
import Order from "../../src/entity/order";
import OrderService from "../../src/service/orderService";

describe("Order service unit tests", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "item 1", 100, "1", 1);
        const item2 = new OrderItem("1", "item 1", 200, "1", 2);
        const order1 = new Order("1", "customer1", [item1]);
        const order2 = new Order("2", "customer1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });
});