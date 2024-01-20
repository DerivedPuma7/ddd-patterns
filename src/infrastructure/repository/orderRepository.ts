import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/orderItemModel";
import OrderModel from "../db/sequelize/model/orderModel";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items:entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })),
            },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        const updatedItems = entity.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        });

		const itemsModel = await OrderItemModel.findAll({ where: { order_id: entity.id } });
        for (const itemOnDB of itemsModel) {
            await OrderItemModel.destroy({ where: { id: itemOnDB.id } });
		}

		for (const updatedItem of updatedItems) {
            console.log('updatedItem', updatedItem);
            
            await OrderItemModel.create({
                id: updatedItem.id,
                product_id: updatedItem.productId,
                order_id: entity.id,
                quantity: updatedItem.quantity,
                name: updatedItem.name,
                price: updatedItem.price
            });
		}

		await OrderModel.update({ total: entity.total() }, { where: { id: entity.id } });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                include: [{ model: OrderItemModel }],
                rejectOnEmpty: true,
            });
		} catch (error) {
			throw new Error(`Order with id: ${id} not found`);
		}

        const items = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });
        const order = new Order(orderModel.id, orderModel.customer_id, items);
        return order;
    }
    
    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });
		const orders = ordersModel.map((orderOnDB) => {
			const items = orderOnDB.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });
			const order = new Order(orderOnDB.id, orderOnDB.customer_id, items);
			return order;
		});
		return orders;
    }
}
