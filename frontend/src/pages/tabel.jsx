import '../style/home.css'

export const Table = ({contestData}) => {
    // const HeadingArray = ["Rank", "Star", "Username","Score","LastAc", "p1","p2","p3","p4"]; //old
    const HeadingArray = ["Roll No", "Username", "Rating","Rank"];
    return (
        <>
            <div className="table-container">
                <div className="table">
                    {
                        <div className="table-heading">
                            {
                                HeadingArray.map((currHeading,index) => {
                                    return <h3 className={currHeading} key={index}>{currHeading}</h3>
                                })
                            }
                        </div>
                        }
                        <div className="table-data">
                            {
                                contestData?.map((currUser,idx) => {
                                    return currUser.check ? <div key={idx} className="list-items">
                                        <div><p>{currUser.rollno}</p></div>
                                        <div><p>{currUser.username}</p></div>
                                        <div><p>{currUser.rating}</p></div>
                                        <div><p>{currUser.rank}</p></div>
                                    </div> : <div key={idx} className="list-items">
                                        <div><p>{currUser.rollno}</p></div>
                                        <div><p style={{color: "red"}}>Not Attemped</p></div>
                                    </div>
                            })
                            }
                        </div>
                </div>
            </div>
        </>
    )
}