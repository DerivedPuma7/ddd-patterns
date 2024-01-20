import EventHandlerInterface from "../../../@shared/event/eventHandlerInterface";
import EventInterface from "../../../@shared/event/eventInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: EventInterface): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}
