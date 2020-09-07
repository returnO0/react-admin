import httpFetch from "../utils/httpFetch";
export default {
    selectCustomerPage(params){
        return httpFetch.get(`/customer/selectPage`,params);
    },

    saveCustomer(params){
        return httpFetch.post(`/customer/save`,params);
    },

    deleteCustomerById(id){
        return httpFetch.delete(`/customer/deleteCustomerById/${id}`)
    }
}