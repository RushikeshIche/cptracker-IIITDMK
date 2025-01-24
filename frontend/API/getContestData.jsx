import axios from "axios"

const api = axios.create({
    // baseURL: "http://localhost:3005"
    baseURL: "https://backend-1-aup4.onrender.com"
})

export const getContestData = () => {
    // return api.get(`/codechef/show`) //old
    return api.get(`/cf/show`) //new
}

export const getIndUserData = (name,star) => {
    return api.get(`/codechef/individual?contestName=${name}&category=${star}`)
}

export const getCodeforcesData = () => {
    return api.get('/codeforces/show')
}

export const getLeetcodeData = () => {
    return api.get(`/leetcode/show`)
}

export const getCotestnames = () => {
    return api.get('/currentcontest/show')
}