import { useNavigate } from "react-router-dom";
import "../style/division.css";
import { useState } from "react";
import { getContestData, getCotestnames, getIndUserData } from "../../API/getContestData";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { ErrorPage } from "./error";
import { Table } from "./tabel";
import { sortByRoll } from "../functions/sortData";

export const Division = () => {
    const navigate = useNavigate();
    const [div, setDiv] = useState("D");
    const [sort, setSort] = useState("rank");
    const object = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4
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
        queryKey: ["codeforcesName"],
        queryFn: contestName
    })
    const handleSortBy = (e) =>{
        const selectMethod = e.target.value;
        setSort(selectMethod);
    }
    const filterDiv = (data,div) => {
        const FilteredData = data.filter(currdata => currdata.code[currdata.code.length-1]===div)
        return FilteredData
    }
    const getData = async () => {
        try {
            // const res = await getIndUserData(name, div); //old
            const res = await getContestData(); //new
            // console.log(res);
            // return res.data.contestData; //old
            const returnData = filterDiv(res.data.data, div) //new
            return returnData //new
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["ContestData", div],
        queryFn: getData,
        enabled: !!div,
    });

    const handleDiv = (e) => {
        const selectedDiv = e.target.name;
        setDiv(selectedDiv);
    };

    if (isLoading || nameLoading) return <Loading />;
    if (!data) navigate('/nodataavailable')
    if (isError || nameError) return <ErrorPage />;
    const contestData = data;
    if (sort === "rank") data && contestData.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    else if (sort === "rollno"){
        data && sortByRoll(contestData)
    }
    return (
        <>
            <div className="division-container">
                <div className="division-box">
                    <button name="A" onClick={handleDiv}>DIV 1</button>
                    <button name="B" onClick={handleDiv}>DIV 2</button>
                    <button name="C" onClick={handleDiv}>DIV 3</button>
                    <button name="D" onClick={handleDiv}>DIV 4</button>
                </div>
            </div>
            <h1 className='Homeheading'><b>Codechef</b> Contest <b>{Name.data && Name.data[0].codechef}</b> Data</h1>
            <div className="currentDiv">
                <button>DIV {object[div]}</button>
            </div>
            <div className="Option-box flex ">
                <div className="filter">
                    <select id="filterStudent" value={sort} onChange={handleSortBy}>
                        <option value="rollno">RollNo</option>
                        <option value="rank">Rank</option>
                    </select>
                </div>
            </div>
            {data && <Table contestData={contestData} />}
        </>
    );
};
