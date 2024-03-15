var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Order } from "./entities";
import { minimumValue } from "../decorators";
export class AbstractDataSource {
    constructor() {
        this._products = [];
        this._categories = new Set();
        this.order = new Order();
        this.loading = this.getData();
    }
    async getProducts(sortProp = "id", category) {
        await this.loading;
        return this.selectProducts(this._products, sortProp, category);
    }
    async getData() {
        this._products = [];
        this._categories.clear();
        const rawData = await this.loadProducts();
        rawData.forEach(p => {
            this._products.push(p);
            this._categories.add(p.category);
        });
    }
    selectProducts(prods, sortProp, category) {
        return prods.filter(p => category === undefined || p.category === category)
            .sort((p1, p2) => p1[sortProp] < p2[sortProp]
            ? -1 : p1[sortProp] > p2[sortProp] ? 1 : 0);
    }
    async getCategories() {
        await this.loading;
        return [...this._categories.values()];
    }
}
__decorate([
    minimumValue("price", 30),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AbstractDataSource.prototype, "getProducts", null);
