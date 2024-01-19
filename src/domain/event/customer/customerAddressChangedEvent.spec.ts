import Address from "../../entity/address";
import EventDispatcher from "../@shared/eventDispatcher";
import CustomerCreatedEvent from "./customerCreatedEvent";
import EnviaConsoleLogHandler from "./handler/enviaConsoleLogHandler";

describe("Customer changed address event tests", () => {
    it("should notify when a customer changes its address", () => {
        const eventDispatcher = new EventDispatcher();
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: 'any id',
            name: 'any name',
            address: new Address('any street', 123, 'any zip', 'any city')
        });
        const handler = new EnviaConsoleLogHandler();
        const eventHandlerSpy = jest.spyOn(handler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", handler);

        eventDispatcher.notify(customerCreatedEvent);

        expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
    });
});
