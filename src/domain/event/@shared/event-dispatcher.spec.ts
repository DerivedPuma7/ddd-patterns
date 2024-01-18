import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreatedHandler";
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
});
