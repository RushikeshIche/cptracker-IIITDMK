import { NavLink, useNavigate } from "react-router-dom";
import "../style/division.css";
import { useState, useEffect } from "react";
import { getContestData } from "../../API/getContestData";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { ErrorPage } from "./error";
import { Table } from "./tabel";

export const Division = () => {
    const navigate = useNavigate();
    const [div, setDiv] = useState("D");
    const [name, setName] = useState("START167");
    const object = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4
    }
    const extractData = (dataArray) => {
        const Rank = dataArray[0]?.split("\n\n")[1]?.trim();
        const OtherData = dataArray[1]?.split("\n");
        const Star = OtherData[1]?.trim()?.slice(0, 2);
        const Username = OtherData[1]?.trim()?.slice(2);
        const Institute = OtherData[3]?.trim();
        const Score = dataArray[2]?.split("\n")[1]?.trim();
        const LastAc = dataArray[3]?.split("\n\n")[1]?.trim();
        const p1 = dataArray[4]?.split("\n")[1]?.trim();
        const p2 = dataArray[5]?.split("\n")[1]?.trim();
        const p3 = dataArray[6]?.split("\n")[1]?.trim();
        const p4 = dataArray[7]?.split("\n")[1]?.trim();
        return {
            Rank,
            Username,
            Star,
            Institute,
            Score,
            LastAc,
            p1,
            p2,
            p3,
            p4,
        };
    };

    const MapData = (DataArray) => {
        return DataArray.map((currElement) => extractData(currElement));
    };

    const getData = async () => {
        try {
            console.log(name, div);
            const res = await getContestData(name, div);
            return res.data.contestData;
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["ContestData", name, div],
        queryFn: getData,
        enabled: !!name && !!div,
    });

    const handleDiv = (e) => {
        const selectedDiv = e.target.name;
        setDiv(selectedDiv);
    };

    if (isLoading) return <Loading />;
    if (data && data[0][0] === "Sorry, there is no data to display") navigate('/nodataavailable')
    if (isError) return <ErrorPage />;
    const contestData = data && MapData(data);

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
            <div className="currentDiv">
                <button>DIV {object[div]}</button>
            </div>
            {contestData && <Table contestData={contestData} />}
        </>
    );
};
