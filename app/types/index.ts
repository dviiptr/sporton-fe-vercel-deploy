export interface Category {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    createAt: string;
    updateAt: string;   
}

export interface Product {
     _id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    stock: number;
    price: number;
    createAt: string;
    updateAt: string;  
}

export interface Bank {
    _id: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    createAt: string;
    updateAt: string;

}

export interface Transaction {
    _id: string;
    paymentProof: string;
    status: "pending" | "paid" | "rejected";
    purchasedItems:  {
        productId: string;
        qty: number;
    },
    totalPayment: string;
    customerName: string;
    customerContact: number | null;
    customerAddress: string;
    createAt: string;
    updateAt: string;
}