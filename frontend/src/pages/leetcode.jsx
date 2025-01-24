import { getCotestnames, getLeetcodeData } from "../../API/getContestData"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "./loading"
import '../style/codeforces.css'
import { ErrorPage } from "./error";
import { useState } from "react";
import { sortByRoll } from "../functions/sortData";

export const LeetCode = () => {
    const [sort, setSort] = useState("rank");
    const handleSortBy = (e) =>{
        const selectMethod = e.target.value;
        setSort(selectMethod);
    }
    const getData = async () => {
        try {
            const res = await getLeetcodeData()
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const contestName = async () => {
        try {
            const data = await getCotestnames()
            return data.data
        } catch (error) {
            console.error(error)
        }
    }
    const {data: Name, isLoading: nameLoading, isError: nameError} = useQuery({
        queryKey: ["leetcodeName"],
        queryFn: contestName
    })
    const {data, isLoading, isError} = useQuery({
        queryKey: ["codeforces"],
        queryFn: getData,
    })

    if (isLoading || nameLoading) return <Loading/>
    if (isError || nameError) return <ErrorPage/>
    if (sort === "rank") data.data && data.data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    else if (sort === "rollno"){
        data.data && sortByRoll(data.data)
    }
    return (
        <>
            <div className="codeforces-container">
                <div className="codeforces-box">
                    <h1 className="codeforces text-3xl mt-6"><b>Leetcode</b> Contest <b>{Name.data && Name.data[0].leetcode}</b> Data</h1>
                    <div className="filter">
                        <select id="filterStudent" value={sort} onChange={handleSortBy}>
                            <option value="rollno">RollNo</option>
                            <option value="rank">Rank</option>
                        </select>
                    </div>
                    <div className="codeforces-table">
                        <ul className="heading">
                            <li>RollNo</li>
                            <li>Username</li>
                            <li className="oldrating">OldRating</li>
                            <li>NewRating</li>
                            <li>Rank</li>
                        </ul>
                        {
                            data && data.data.map((currUser,index) => {
                                return currUser.contest_id === "none" ? (<ul key={index} className="tablecontent">
                                    <li>{currUser.rollno}</li>
                                    <li>{currUser.username}</li>
                                    <li style={{gridColumn: "3/5", justifySelf: "center", color: "red"}}>Not Attempt</li>
                                </ul>) :
                                <ul key={index} className="tablecontent">
                                    <li>{currUser.rollno}</li>
                                    <li>{currUser.username}</li>
                                    <li className="oldrating">{parseInt(currUser.old_rating).toFixed(2)}</li>
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