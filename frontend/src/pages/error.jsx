import { useNavigate } from 'react-router-dom';
import '../style/Error.css'

export const ErrorPage = () => {
    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <>
            <section className="page_404">
                <div className="box">
                    <div className="four_zero_four_bg">
                        <h1 style={{textAlign: "center"}}>404</h1>
                    </div>
                    <div className="contant_box_404">
                        <h3 className="h2">
                            Look like you're lost
                        </h3>

                        <p>the page you are looking for not avaible!</p>
                        
                        <button className='link_404' onClick={handleGoBack}>Go Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}