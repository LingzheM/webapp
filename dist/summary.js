import { createElement } from "./tools/jsxFactory";
export class Summary {
    getContent() {
        return createElement("div", { className: "m-2 text-center" },
            createElement("h2", null, "Thanks!"),
            createElement("p", null, "Thanks for placing your order."),
            createElement("p", null,
                "Your order is #",
                this.props.orderId),
            createElement("p", null, "We will ship your goods as soon as possible"),
            createElement("button", { className: "btn btn-primary", onclick: this.props.callback }, "OK"));
    }
}
