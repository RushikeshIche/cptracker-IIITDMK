import { useState } from "react"
import { getCodeforcesData } from "../../API/getContestData"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "./loading"

export const CodeForces = () => {
    const getData = async () => {
        try {
            const res = await getCodeforcesData()
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const {data, isLoading, isError} = useQuery({
        queryKey: ["codeforces"],
        queryFn: getData,
    })

    if (isLoading) return <Loading/>
    data && console.log(data)
    return (
        <>
            <div className="codeforces-container">
                <div className="codeforces-box">
                    <div className="table">
                        <ul className="heading">
                            <li>Username</li>
                            <li>Rating</li>
                            <li>Ranking</li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}