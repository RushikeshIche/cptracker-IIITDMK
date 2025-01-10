import { useNavigate } from 'react-router-dom'
import '../style/Error.css'
export const NotFound = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <>
        <div className="notfound-box">
            <h1>No Data Available for this division</h1>
        </div>
        <div className="go-back">
            <button onClick={handleGoBack}>Go Back</button>
        </div>
        </>
    )
}