interface Props {
    tag?: string;
    className?: string | string[];
    id?: string;
    src?: string;
    attributes?: [string, string][];
    textContent?: string;
    subNodes?: Props | Props[];
    onClick?: () => void;
    style?: Partial<CSSStyleDeclaration>;
}
export declare function createNode(props: Props): HTMLElement;
export {};
