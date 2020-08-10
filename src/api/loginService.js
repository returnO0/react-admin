import httpFetch from "../utils/httpFetch";


//登录
export default {
    login(username, password){
        return httpFetch.post("/user/login", {username, password})
    }
}


