import EventHandlerInterface from "../../../@shared/event/eventHandlerInterface";
import EventInterface from "../../../@shared/event/eventInterface";
import CustomerAddressChangedEvent from "../customerAddressChangedEvent";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: EventInterface): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.street}`);
    }
}
