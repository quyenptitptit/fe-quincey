import axiosConfig from "./axiosConfig";

const productService = {
    getProducts: () => {
        return axiosConfig.get(`/product`)
    },
    getProductById: (id) => {
        return axiosConfig.get(`/product/${id}`)
    },
    getProductByName: (name) => {
        return axiosConfig.post(`/product/search?type=${name}`) 
    },
    getProductSale: () => {
        return axiosConfig.post(`/product/sale`)
    },
    createProduct: (data) => {
        return axiosConfig.post('/product', data)
    },
    updateProduct: (id, data) => {
        return axiosConfig.put(`/product/${id}`, data)
    },
    deleteProduct: (id) => {
        return axiosConfig.delete(`/product/${id}`)
    }
}

export default productService
