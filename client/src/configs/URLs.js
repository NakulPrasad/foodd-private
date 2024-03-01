const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:80/api" : "/api/"

export const URLs = {
    
    getFoodData : `${BASE_URL}/home/getFoodData`,
    loginUser :  `${BASE_URL}/user/login`,
}