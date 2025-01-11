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
    const [name, setName] = useState("START168");
    const [star, setStar] = useState("");
    // const [credentials, setCredentials] = useState({})
    // const [submit, setSubmit] = useState(false);
    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(name,star)
    //     setCredentials({name,star})
    //     setSubmit(true);
    //     setName("");
    //     setStar("");
    // }

    // useEffect(() => {
    //     if (isCodeChef){
    //         setCredentials({name: cont, star: "D"})
    //         setSubmit(true)
    //     }
    // },[])

    const getData = async () => {
        try {
            // console.log(name,star)
            const res = await getContestData()
            let FullData = res.data.contestData;
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
    if (isError) return <ErrorPage/>
    if (isLoading) return <Loading/>
    if (data && data[0][0] === "Sorry, there is no data to display") navigate('/nodataavailable')
    const contestData = data;
    data && contestData.sort((a, b) => parseInt(a.Rank) - parseInt(b.Rank));
    console.log(contestData);
    return (
        <>
            {/* {!isCodeChef && <div className="container">
                <form className="ContestForm">
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
            </div>} */}
            <h1 className='Homeheading'><b>Codechef</b> Contest <b>{name}</b> Data</h1>
            <Table contestData={contestData}/>
        </>
    )
}