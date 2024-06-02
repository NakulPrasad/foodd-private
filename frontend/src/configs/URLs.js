let BASE_URL = "http://localhost:80/api";

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    BASE_URL = process.env.VITE_BASE_URL || "http://localhost:80/api";
}

export const URLs = {
    getFoodData: `${BASE_URL}/home/getFoodData`,
    loginUser: `${BASE_URL}/user/login`,
    postOrder: `${BASE_URL}/order/orderCheckout`,
    getOrders: `${BASE_URL}/order/getMyOrders`,
    addUser: `${BASE_URL}/user/addUser`,
};
