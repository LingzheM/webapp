var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createElement } from "./tools/jsxFactory";
import { ProductItem } from "./productItem";
import { CategoryList } from "./categoryList";
import { addClass } from "./decorators";
export class ProductList {
    getContent() {
        return createElement("div", { className: "container-fluid" },
            createElement("div", { className: "row" },
                createElement("div", { className: "col-3 p-2" },
                    createElement(CategoryList, { categories: this.props.categories, selectedCategory: this.props.selectedCategory, callback: this.props.filterCallback })),
                createElement("div", { className: "col-9 p-2" }, this.props.products.map(p => createElement(ProductItem, { product: p, callback: this.props.addToOrderCallback })))));
    }
}
__decorate([
    addClass("select", "bg-info", "m-1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", HTMLElement)
], ProductList.prototype, "getContent", null);
