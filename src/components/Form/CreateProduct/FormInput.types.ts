export interface IFormInput {
    productName:string;
    price:number;
    shipping:string;
    discount:number;
    quantity:number;
    productCategory:string;
    brand:string;
    colors:{ value: string; label: string }[] | string;
    sizes:{ value: string; label: string }[] | string;
    subCategory:{ value: string; label: string }[] |string;
    description:string;
    productImg:string;
}