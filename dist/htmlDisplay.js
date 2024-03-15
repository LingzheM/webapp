import { createElement } from "./tools/jsxFactory";
import { Order } from "./data/entities";
import { ProductList } from "./productList";
import { Header } from "./header";
import { OrderDetails } from "./orderDetails";
import { Summary } from "./summary";
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["List"] = 0] = "List";
    DisplayMode[DisplayMode["Details"] = 1] = "Details";
    DisplayMode[DisplayMode["Complete"] = 2] = "Complete";
})(DisplayMode || (DisplayMode = {}));
export class HtmlDisplay {
    constructor() {
        this.mode = DisplayMode.List;
        this.addToOrder = (product, quantity) => {
            this.props.dataSource.order.addProduct(product, quantity);
            this.updateContent();
        };
        this.selectCategory = (selected) => {
            this.selectedCategory = selected === "All" ? undefined : selected;
            this.updateContent();
        };
        this.showDetails = () => {
            this.mode = DisplayMode.Details;
            this.updateContent();
        };
        this.showList = () => {
            this.mode = DisplayMode.List;
            this.updateContent();
        };
        this.submitOrder = () => {
            this.props.dataSource.storeOrder().then(id => {
                this.orderId = id;
                this.props.dataSource.order = new Order();
                this.mode = DisplayMode.Complete;
                this.updateContent();
            });
        };
        this.containerElem = document.createElement("div");
    }
    async getContent() {
        await this.updateContent();
        return this.containerElem;
    }
    async updateContent() {
        let products = await this.props.dataSource.getProducts("id", this.selectedCategory);
        let categories = await this.props.dataSource.getCategories();
        this.containerElem.innerHTML = "";
        let contentElem;
        switch (this.mode) {
            case DisplayMode.List:
                contentElem = this.getListContent(products, categories);
                break;
            case DisplayMode.Details:
                contentElem = createElement(OrderDetails, { order: this.props.dataSource.order, cancelCallback: this.showList, sumbitCallback: this.submitOrder });
                break;
            case DisplayMode.Complete:
                contentElem = createElement(Summary, { orderId: this.orderId, callback: this.showList });
                break;
        }
        let content = createElement("div", null,
            createElement(ProductList, { products: products, categories: categories, selectedCategory: this.selectedCategory, addToOrderCallback: this.addToOrder, filterCallback: this.selectCategory }));
        this.containerElem.appendChild(content);
    }
    getListContent(products, categories) {
        console.log(`加载Header`);
        return createElement("div", null,
            createElement(Header, { order: this.props.dataSource.order, submitCallback: this.showDetails }),
            createElement(ProductList, { products: products, categories: categories, selectedCategory: this.selectedCategory, addToOrderCallback: this.addToOrder, filterCallback: this.selectCategory }) // 修改这里
        ,
            " // \u4FEE\u6539\u8FD9\u91CC");
    }
}
