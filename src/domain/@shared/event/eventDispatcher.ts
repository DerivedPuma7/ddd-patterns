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
        const eventName = event.constructor.name;
        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((handler) => {
                handler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1) {
                this.eventHandlers[eventName].splice(index,1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }
}
