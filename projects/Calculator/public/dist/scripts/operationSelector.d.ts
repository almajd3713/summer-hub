declare type operations = "add" | "substract" | "multipy" | "divide";
declare const _default: (action: operations) => (oldVal: number, addedVal: number) => number;
export default _default;
