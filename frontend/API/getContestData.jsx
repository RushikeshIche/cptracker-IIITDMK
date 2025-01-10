import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3005"
})

export const getContestData = (name,star) => {
    console.log(name,star)
    return api.get(`/scrape?contestName=${name}&category=${star}`)
}

const codeforces = axios.create({
    baseURL: "https://codeforces.com"
})

export const getCodeforcesData = (username) => {
    return api.get('/codeforces')
}