import EventHandlerInterface from "../../../@shared/event/eventHandlerInterface";
import EventInterface from "../../../@shared/event/eventInterface";
import ProductCreatedEvent from "../productCreatedEvent";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: EventInterface): void {
        console.log(`Sending email to ........`);
    }
}
