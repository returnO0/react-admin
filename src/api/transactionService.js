import httpFetch from "../utils/httpFetch";
export default {
    selectTransactionPage(params){
        return httpFetch.get(`/transaction/selectPage`,params);
    },

    saveTransaction(params){
        return httpFetch.post(`/transaction/save`,params)
    },

    deleteTransactionById(id){
        return httpFetch.delete(`/transaction/deleteTransactionById/${id}`)
    }
}
