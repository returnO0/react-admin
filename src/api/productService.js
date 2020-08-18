import httpFetch from "../utils/httpFetch";
export default {
    selectList(params){
        return httpFetch.get(`/product/selectList`,params);
    },

    selectListByName(params){
        return httpFetch.get(`/product/selectListByName`,params);
    },

    selectListByDescription(params){
        return httpFetch.get(`/product/selectListByDescription`,params);
    },

    // 更新商品的状态上架/下架
    updateStatus(params){
        return httpFetch.get(`/product//updateStatus/${params}`)
    }
}