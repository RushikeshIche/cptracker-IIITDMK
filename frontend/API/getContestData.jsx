import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3005"
})

export const getContestData = () => {
    return api.get(`/codechef/show`)
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