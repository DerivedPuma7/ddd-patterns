import EventDispatcherInterface from "./eventDispatcherInterface";
import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

export default class EventDispatcher implements EventDispatcherInterface {
    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        throw new Error("Method not implemented.");
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        throw new Error("Method not implemented.");
    }

    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }
}
