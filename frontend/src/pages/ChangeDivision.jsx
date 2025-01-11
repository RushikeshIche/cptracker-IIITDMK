import { NavLink, useNavigate } from "react-router-dom";
import "../style/division.css";
import { useState, useEffect } from "react";
import { getIndUserData } from "../../API/getContestData";
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
    const getData = async () => {
        try {
            console.log(name, div);
            const res = await getIndUserData(name, div);
            console.log(res);
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
    if (!data) navigate('/nodataavailable')
    if (isError) return <ErrorPage />;
    // const contestData = data && MapData(data);
    const contestData = data;
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
            {data && <Table contestData={contestData} />}
        </>
    );
};
