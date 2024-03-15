import { AbstractDataSource } from "./abstractDataSource";
import Axios from "axios";
// const protocol = "http";
// const hostname = "localhost";
// const port = 4600;
const urls = {
    products: "api/products",
    orders: "api/orders"
};
export class RemoteDataSource extends AbstractDataSource {
    loadProducts() {
        return Axios.get(urls.products).then(response => response.data);
    }
    storeOrder() {
        let orderData = {
            lines: [...this.order.orderLines.values()].map(ol => ({
                productId: ol.product.id,
                productName: ol.product.name,
                quantity: ol.quantity
            }))
        };
        return Axios.post(urls.orders, orderData).then(response => response.data.id);
    }
}
