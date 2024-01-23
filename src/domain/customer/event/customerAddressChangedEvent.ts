import Address from "../value-object/address";
import EventInterface from "../../@shared/event/eventInterface";

export type CustomerAddressChangedEventData = {
    dateTimeOccurred: Date,
    data: {
        id: string,
        name: string,
        address: Address
    }
}

export default class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: CustomerAddressChangedEventData) {
        this.dataTimeOccurred = eventData.dateTimeOccurred;
        this.eventData = eventData.data;
    }
}