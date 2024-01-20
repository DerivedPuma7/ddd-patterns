import EventDispatcher from "../../@shared/event/eventDispatcher";
import CustomerCreatedEvent from "./customerCreatedEvent";
import EnviaConsoleLog1Handler from "./handler/enviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "./handler/enviaConsoleLog2Handler";

describe("Customer created event tests", () => {
    it("should notify when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const customerCreatedEvent = new CustomerCreatedEvent({ anyData: ['some data']} );
        const handler1 = new EnviaConsoleLog1Handler();
        const handler2 = new EnviaConsoleLog2Handler();
        const eventHandler1Spy = jest.spyOn(handler1, "handle");
        const eventHandler2Spy = jest.spyOn(handler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        eventDispatcher.notify(customerCreatedEvent);

        expect(eventHandler1Spy).toHaveBeenCalledTimes(1);
		expect(eventHandler2Spy).toHaveBeenCalledTimes(1);
    });
});
