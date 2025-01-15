import '../style/home.css'

export const Table = ({contestData}) => {
    console.log(contestData)
    const HeadingArray = ["Rank", "Star", "Username","Score","LastAc", "p1","p2","p3","p4"];
    return (
        <>
                <center className='text-4xl mt-7'>STUDENT RANKING</center>
            <div className="table-container">
                <div className="table">
                    {
                        <div className="table-heading grid grid-cols-9 justify-between" >
                            {
                                HeadingArray.map((currHeading,index) => {
                                    return <h3 key={index}>{currHeading}</h3>
                                })
                            }
                        </div>
                        }
                        <div className="table-data grid grid-cols-9">
                            {
                                contestData?.map((currUser) => (
                                    HeadingArray.map((currHeading,index) => {
                                        return <div key={index}><p>{currUser[currHeading]}</p></div>
                                    })
                                ))
                            }
                        </div>
                </div>
            </div>
        </>
    )
}