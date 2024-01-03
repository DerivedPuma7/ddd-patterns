import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            const currentPrice = product.price;
            const newPrice = currentPrice * (1 + percentage / 100);
            product.changePrice(newPrice);
        });
    }
}