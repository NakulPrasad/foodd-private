let BASE_URL = "http://localhost:3000/apiv1";
if (import.meta.env.VITE_NODE_ENV === "production") {
  BASE_URL =
  import.meta.env.VITE_BASE_URL || "error";
}

const URLs = {
  getFoodData: `${BASE_URL}/food/getAllFoodItems`,
  getAllFoodCategory: `${BASE_URL}/food/getAllFoodCategory`,
  loginUser: `${BASE_URL}/user/login`,
  postOrder: `${BASE_URL}/order/orderCheckout`,
  getOrders: `${BASE_URL}/order/getMyOrders`,
  addUser: `${BASE_URL}/user/addUser`,
};

export default URLs;
