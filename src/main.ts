import OrderItem from "./domain/checkout/entity/orderItem";
import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";

// agregado de Customer
// relação: ID
let customer = new Customer("123", "Gustavo Figueiredo");
let address = new Address("Rua Evaristo Alvarenga", 193, "37200-490", "Lavras");
customer.Address = address;
customer.activate();

// agregado de Order
// relação: Objeto, Entidade
let item1 = new OrderItem("1", "item 1", 10, "123", 2);
let item2 = new OrderItem("2", "item 2", 15, "321", 1);
let order = new Order("1", "123", [item1, item2]);