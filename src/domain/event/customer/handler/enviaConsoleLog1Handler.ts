import EventHandlerInterface from "../../@shared/eventHandlerInterface";
import EventInterface from "../../@shared/eventInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: EventInterface): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}
