interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

const item: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99
};

console.log(`Product: ${item.name}, Price: $${item.price}`);
