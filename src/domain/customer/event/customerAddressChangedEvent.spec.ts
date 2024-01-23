import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/eventDispatcher";
import CustomerAddressChangedEvent from "./customerAddressChangedEvent";
import EnviaConsoleLogHandler from "./handler/enviaConsoleLogHandler";

describe("Customer changed address event tests", () => {
    it("should notify when a customer changes its address", () => {
        const eventDispatcher = new EventDispatcher();
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            dateTimeOccurred: new Date(),
            data: {
                id: 'any id',
                name: 'any name',
                address: new Address('any street', 123, 'any zip', 'any city')
            }
        });
        const handler = new EnviaConsoleLogHandler();
        const eventHandlerSpy = jest.spyOn(handler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", handler);

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
        expect(eventHandlerSpy).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
});
