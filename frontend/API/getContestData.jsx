import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3005"
})

export const getContestData = () => {
    return api.get(`/scrape`)
}

export const getIndUserData = (name,star) => {
    return api.get(`/scrape/individual?contestName=${name}&category=${star}`)
}

const codeforces = axios.create({
    baseURL: "https://codeforces.com"
})

export const getCodeforcesData = () => {
    return api.get('/codeforces/show')
}