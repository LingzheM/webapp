import { LoadDataSource } from "./data/loadDataSource";
import { HtmlDisplay } from "./htmlDisplay";
import "bootstrap/dist/css/bootstrap.css";
let ds = new LoadDataSource();
async function displayData() {
    let display = new HtmlDisplay();
    display.props = {
        dataSource: ds
    };
    return display.getContent();
}
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        displayData().then(elem => {
            let rootElement = document.getElementById("app");
            rootElement.innerHTML = "";
            rootElement.appendChild(elem);
        });
    }
};
