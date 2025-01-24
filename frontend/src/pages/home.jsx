import { useState } from 'react'
import '../style/home.css'
import { getContestData, getCotestnames } from '../../API/getContestData';
import {useQuery} from '@tanstack/react-query'
import { Table } from './tabel';
import { Loading } from './loading';
import { ErrorPage } from './error';
import { sortByRoll } from '../functions/sortData';

export const Home = () => {
    const [sort, setSort] = useState("rank");
    const handleSortBy = (e) =>{
        const selectMethod = e.target.value;
        setSort(selectMethod);
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

    const getData = async () => {
        try {
            // console.log(name,star)
            const res = await getContestData() //new
            // let FullData = res.data.contestData; //old
            let FullData = res.data;
            return FullData
        } catch (error) {
            console.log(error)
        }
    }

    const {data, isLoading, isError} = useQuery({
        queryKey: ["queryData"],
        queryFn: getData,
        // enabled: submit && !!credentials.name && !!credentials.star
    })
    if (isError || nameError) return <ErrorPage/>
    if (isLoading || nameLoading) return <Loading/>
    // if (data && data[0][0] === "Sorry, there is no data to display") navigate('/nodataavailable') //old
    const contestData = data.data; //new
    // const contestData = data.contestData; //old
    if (sort === "rank") data && contestData.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    else if (sort === "rollno"){
        data && sortByRoll(contestData)
    }
    return (
        <>
            <h1 className='Homeheading'><b>Codechef</b> Contest <b>{Name.data && Name.data[0].codechef}</b> Data</h1>
            <div className="Option-box flex ">
                <div className="filter">
                    <select id="filterStudent" value={sort} onChange={handleSortBy}>
                        <option value="rollno">RollNo</option>
                        <option value="rank">Rank</option>
                    </select>
                </div>
            </div>
            <Table contestData={contestData}/>
        </>
    )
}