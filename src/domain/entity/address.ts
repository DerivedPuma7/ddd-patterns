/**
 * Object Value
 * Note que todos os atributos são privados e não temos setters. 
 * Portanto, a única forma de atribuir um endereço diferente para o cliente, 
 * é criando um novo endereço;
 */

export default class Address {
    _street: string;
    _number: number;
    _zip: string;
    _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    validate() {
        if(this._street.length === 0) {
            throw new Error("Street is required");
        }
        if(this._number === 0) {
            throw new Error("Number is required");
        }
        if(this._zip.length === 0) {
            throw new Error("Zip is required");
        }
        if(this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city},`;
    }

    toStringPadraoBrasileiro() {
        return `${this._street}, ${this._number}, ${this._city}, ${this._zip}`;
    }
}