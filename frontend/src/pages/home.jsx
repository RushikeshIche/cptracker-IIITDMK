import { useEffect, useState } from 'react'
import '../style/home.css'
import { getContestData } from '../../API/getContestData';
import {useQuery} from '@tanstack/react-query'
import { Table } from './tabel';
import { Loading } from './loading';
import { ErrorPage } from './error';
import { useNavigate } from 'react-router-dom';

export const Home = ({isCodeChef, cont}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [star, setStar] = useState("");
    const [credentials, setCredentials] = useState({})
    const [submit, setSubmit] = useState(false);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(name,star)
        setCredentials({name,star})
        setSubmit(true);
        setName("");
        setStar("");
    }

    useEffect(() => {
        if (isCodeChef){
            setCredentials({name: cont, star: "D"})
            setSubmit(true)
        }
    },[])

    const ErrorCheck = (ResData) => {
        return ResData.data.contestData[0][0] === "Sorry, there is no data to display" ? true : false
    }
    const getData = async () => {
        try {
            console.log(name,star)
            const res = await getContestData(credentials.name,credentials.star)
            let FullData = res.data.contestData;
            if (isCodeChef){
                const res1 = await getContestData(credentials.name, "A")
                const res2 = await getContestData(credentials.name, "B")
                const res3 = await getContestData(credentials.name, "C")
                const err1 = ErrorCheck(res1);
                const err2 = ErrorCheck(res2);
                const err3 = ErrorCheck(res3);
                if (!err1) FullData = [...FullData, ...res1.data.contestData];
                if (!err2) FullData = [...FullData, ...res2.data.contestData];
                if (!err3) FullData = [...FullData, ...res3.data.contestData];
            }
            isCodeChef=false;
            return FullData
        } catch (error) {
            console.log(error)
        }
    }

    const {data, isLoading, isError} = useQuery({
        queryKey: ["queryData", credentials],
        queryFn: getData,
        enabled: submit && !!credentials.name && !!credentials.star
    })
    const extractData = (dataArray) => {
        const Rank = dataArray[0]?.split('\n\n')[1]?.trim();
        const OtherData = dataArray[1]?.split('\n');
        const Star = OtherData[1]?.trim()?.slice(0,2);
        const Username = OtherData[1]?.trim()?.slice(2)
        const Institute = OtherData[3]?.trim();
        const Score = dataArray[2]?.split('\n')[1]?.trim();
        const LastAc = dataArray[3]?.split('\n\n')[1]?.trim();
        const p1 = dataArray[4]?.split('\n')[1]?.trim(); 
        const p2 = dataArray[5]?.split('\n')[1]?.trim(); 
        const p3 = dataArray[6]?.split('\n')[1]?.trim(); 
        const p4 = dataArray[7]?.split('\n')[1]?.trim(); 
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
          p4
        };
      };

    const MapData = (DataArray) => {
        const ContestRankingData = DataArray.map(currElement => {
            return extractData(currElement)
        })
        return ContestRankingData
    }
    if (isError) return <ErrorPage/>
    if (isLoading) return <Loading/>
    if (data && data[0][0] === "Sorry, there is no data to display") navigate('/nodataavailable')
    const contestData = data && MapData(data)
    data && contestData.sort((a, b) => parseInt(a.Rank) - parseInt(b.Rank));
    console.log(contestData);
    return (
        <>
            {!isCodeChef && <div className="container">
                <form onSubmit={handleFormSubmit} className="ContestForm">
                    <div className="input-box contestName">
                        <label htmlFor="name">Contest Name</label>
                        <input type="text" name="contestname" id="name" value={name} placeholder='START167' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-box Star">
                        <label htmlFor="star">Star</label>
                        <input type="text" name="star" id="star" value={star} placeholder='A/B/C/D' onChange={(e) => setStar(e.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>}
            <Table contestData={contestData}/>
        </>
    )
}