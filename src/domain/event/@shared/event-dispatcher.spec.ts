import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreatedHandler";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
    let sut: EventDispatcher;

    beforeAll(() => {
        sut = new EventDispatcher();
    });

    it("should register an event handler", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        sut.register("ProductCreatedEvent", eventHandler);

        expect(sut.getEventHandlers).toHaveBeenCalledWith("ProductCreatedEvent", eventHandler);
        expect(sut.getEventHandlers).toHaveBeenCalledTimes(1);
    });
});