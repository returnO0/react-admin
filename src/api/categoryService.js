import httpFetch from "../utils/httpFetch";

export default {
    /**
     * 获取商品列表
     * @param parentId 父类别id或者0
     */
    getProductCategoryList(parentId){
        return httpFetch.get(`/productCategory/${parentId}`);
    },

    /**
     * 添加分类
     * @param params
     */
    insertProductCategory(params){
        return httpFetch.post(`/productCategory`,params);
    },

    /**
     * 修改分类
     * @param params
     */
    updateProductCategory(params){
        return httpFetch.put(`/productCategory`,params);
    },

    /**
     * 删除一个分类
     * @id 商品类别id
     * @returns {Promise | Promise<unknown>}
     */
    deleteProductCategoryById(id){
        return httpFetch.delete(`/productCategory/${id}`);
    },
}
