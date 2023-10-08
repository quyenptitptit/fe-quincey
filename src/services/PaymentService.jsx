import axiosConfig from "./axiosConfig";

const paymentService = {
  payment: (pay) => {
    return axiosConfig.post("/payment/create_payment_url", pay);
  },
};

export default paymentService;
