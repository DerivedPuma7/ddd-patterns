import EventHandlerInterface from "../../@shared/eventHandlerInterface";
import EventInterface from "../../@shared/eventInterface";
import ProductCreatedEvent from "../productCreatedEvent";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: EventInterface): void {
        console.log(`Sending email to ........`);
    }
}
