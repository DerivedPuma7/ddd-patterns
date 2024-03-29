import Address from "../value-object/address";
import CustomerInterface from "./customerInterface";


export default class Customer implements CustomerInterface {
    private _id: string;
    private _name: string;
    private _address!: Address
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error("Name is required");
        }
        if(this._id.length === 0) {
            throw new Error("Id is required");
        }
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get id(): string {
        return this._id;
    }

    get Address(): Address {
        return this._address;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive() {
        return this._active;
    }

    set Address(addres: Address) {
        this._address = addres;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }
}