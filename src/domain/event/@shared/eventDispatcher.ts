import EventDispatcherInterface from "./eventDispatcherInterface";
import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: {
        [eventName: string]: EventHandlerInterface[]
    } = {};

    getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        throw new Error("Method not implemented.");
    }

    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }
}
