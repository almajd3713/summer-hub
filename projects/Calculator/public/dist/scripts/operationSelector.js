export default (action) => {
    switch (action) {
        case "add":
            return (oldVal, addedVal) => oldVal + addedVal;
    }
};
//# sourceMappingURL=operationSelector.js.map