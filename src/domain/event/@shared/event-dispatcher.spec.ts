import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreatedHandler";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const handlers = eventDispatcher.getEventHandlers();
        expect(handlers["ProductCreatedEvent"]).toBeDefined();
        expect(handlers["ProductCreatedEvent"].length).toBe(1);
        expect(handlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
});