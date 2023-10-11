import axiosConfig from "./axiosConfig";

const orderService = {
  createOrder: (order) => {
    return axiosConfig.post("/order", order);
  },
  getOrders: () => {
    return axiosConfig.get("/order");
  },
  getOrderByCustomer: (customer) => {
    return axiosConfig.post(`/order/search?customer=${customer}`)
  },
  updateOrder: (id, order) => {
    return axiosConfig.put(`order/${id}`, order)
  }
};

export default orderService;
