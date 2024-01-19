import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../product/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
    let sut: EventDispatcher;

    beforeEach(() => {
        sut = new EventDispatcher();
    });

    it("should register an event handler", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        sut.register("ProductCreatedEvent", eventHandler);

        const handlers = sut.getEventHandlers();

        expect(handlers["ProductCreatedEvent"]).toBeDefined();
        expect(handlers["ProductCreatedEvent"].length).toBe(1);
        expect(handlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        sut.register("ProductCreatedEvent", eventHandler);

        sut.unregister("ProductCreatedEvent", eventHandler);

        const handlers = sut.getEventHandlers();
        expect(handlers["ProductCreatedEvent"]).toBeDefined();
        expect(handlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        sut.register("ProductCreatedEvent", eventHandler);

        sut.unregisterAll();

        const handlers = sut.getEventHandlers();
        expect(handlers["ProductCreatedEvent"]).toBeUndefined();
        expect(handlers).toMatchObject({});
    });

    it("should notify all event handlers", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
        const productCreatedEvent = new ProductCreatedEvent({ name: "product 1", description: "product 1 description" });
        sut.register("ProductCreatedEvent", eventHandler);

        sut.notify(productCreatedEvent);

        expect(eventHandlerSpy).toHaveBeenCalled();
        expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
    });
});
