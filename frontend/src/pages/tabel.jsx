import '../style/home.css'

export const Table = ({contestData}) => {
    console.log(contestData)
    const HeadingArray = ["Rank", "Star", "Username","Score","LastAc", "p1","p2","p3","p4"];
    return (
        <>
            <div className="table-container">
                <div className="table">
                    {
                        <div className="table-heading">
                            {
                                HeadingArray.map((currHeading,index) => {
                                    return <h3 key={index}>{currHeading}</h3>
                                })
                            }
                        </div>
                        }
                        <div className="table-data">
                            {
                                contestData?.map((currUser,idx) => {
                                    return <div key={idx} className="list-items">
                                        {HeadingArray.map((currHeading,index) => {
                                            return <div key={index}><p>{currUser[currHeading]}</p></div>
                                        })}
                                    </div>
                            })
                            }
                        </div>
                </div>
            </div>
        </>
    )
}