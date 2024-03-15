import { createElement } from "./tools/jsxFactory";
export class Header {
    getContent() {
        let count = this.props.order.productCount;
        console.log(`Header's count: ${count}`);
        return createElement("div", { className: "p-1 bg-secondary text-white text-right" },
            count === 0 ? "(No Selection)" : `${count} product(s), $${this.props.order.total.toFixed(2)}`,
            createElement("button", { className: "btn btn-sm btn-primary m-1", onClick: this.props.submitCallback }, "Submit Order"));
    }
}
