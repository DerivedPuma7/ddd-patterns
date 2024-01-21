import OrderFactory from "../../../../src/domain/checkout/factory/orderFactory";

import { v4 as uuid } from "uuid";

describe("Order Factory unit tests", () => {
    it("should create an Order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
});
