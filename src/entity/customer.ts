class Customer {
    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this.id;
    }

    get name(): string {
        return this.name;
    }

    get address(): string {
        return this.address;
    }

    set name(name: string) {
        this.name = name;
    }

    set addres(addres: string) {
        this.addres = addres;
    }
}