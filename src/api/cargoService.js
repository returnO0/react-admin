import httpFetch from "../utils/httpFetch";
export default {
    selectCargoPage(params){
        return httpFetch.get(`/cargo/selectPage`,params)
    },

    saveCargo(params){
        return httpFetch.post(`/cargo/save`,params)
    },

    deleteCargoById(id){
        return httpFetch.delete(`/cargo/deleteCargoById/${id}`)
    }
}