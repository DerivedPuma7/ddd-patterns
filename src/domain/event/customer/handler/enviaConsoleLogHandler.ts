import EventHandlerInterface from "../../@shared/eventHandlerInterface";
import EventInterface from "../../@shared/eventInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}`);
    }
}
