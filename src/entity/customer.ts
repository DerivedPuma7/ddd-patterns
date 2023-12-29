import Address from "./address";


export default class Customer {
    private id: string;
    private name: string;
    private address!: Address
    private active: boolean = false;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    validate() {
        if(this.name.length === 0) {
            throw new Error("Name is required");
        }
        if(this.id.length === 0) {
            throw new Error("Id is required");
        }
    }

    changeName(name: string) {
        this.name = name;
        this.validate();
    }

    activate() {
        if(this.address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    set Address(addres: Address) {
        this.address = addres;
    }
}