import "reflect-metadata";
export const minimumValue = (propName, min) => (constructor, methodName, descriptor) => {
    const origFunction = descriptor.value;
    descriptor.value = async function wrapper(...args) {
        let results = await origFunction.apply(this, args);
        return results.map(r => ({
            ...r, [propName]: r[propName] < min ? min : r[propName]
        }));
    };
};
export const addClass = (selector, ...className) => (constructor, methodName, descriptor) => {
    if (Reflect.getMetadata("design:returntype", constructor, methodName) === HTMLElement) {
        const origFunction = descriptor.value;
        descriptor.value = function wrapper(...args) {
            let content = origFunction.apply(this, args);
            content.querySelectorAll(selector).forEach(elem => className.forEach(c => elem.classList.add(c)));
            return content;
        };
    }
};
