import { getLeetcodeData } from "../../API/getContestData"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "./loading"
import '../style/codeforces.css'
import { ErrorPage } from "./error";

export const LeetCode = () => {
    const getData = async () => {
        try {
            const res = await getLeetcodeData()
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
    if (isError) return <ErrorPage/>
    data && console.log(data)
    data.data && data.data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    return (
        <>
            <div className="codeforces-container">
                <div className="codeforces-box">
                    <h1 className="codeforces text-3xl mt-6"><b>Leetcode</b> Contest <b>{data && data.data[0].contest_name}</b> Data</h1>
                    <div className="codeforces-table">
                        <ul className="heading">
                            <li>Username</li>
                            <li>OldRating</li>
                            <li>NewRating</li>
                            <li>Rank</li>
                        </ul>
                        {
                            data && data.data.map((currUser,index) => {
                                return currUser.contest_id === "none" ? (<ul key={index} className="tablecontent">
                                    <li>{currUser.username}</li>
                                    <li style={{gridColumn: "2/5", justifySelf: "center", color: "red"}}>Not Attempt</li>
                                </ul>) :
                                <ul key={index} className="tablecontent">
                                    <li>{currUser.username}</li>
                                    <li>{parseInt(currUser.old_rating).toFixed(2)}</li>
                                    <li>{parseInt(currUser.new_rating).toFixed(2)}</li>
                                    <li>{currUser.rank}</li>
                                </ul>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}