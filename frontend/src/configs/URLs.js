const NEW_URL = `${process.env.BASE_URL || 'https://foodd-mern.vercel.app'}/api`;
const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : NEW_URL;

export const URLs = {
    getFoodData: `${BASE_URL}/home/getFoodData`,
    loginUser: `${BASE_URL}/user/login`,
    postOrder: `${BASE_URL}/order/orderCheckout`,
    getOrders: `${BASE_URL}/order/getMyOrders`,
    addUser: `${BASE_URL}/user/addUser`,
};
