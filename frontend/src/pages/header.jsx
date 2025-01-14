import {NavLink} from 'react-router-dom'
import '../style/header.css'
export const Header = () => {
    return (
        <>
           <div className="w-full self-start title flex items-center p-3">
      <img src="css/src/png college logo.png" alt="college logo" className="ml-3 college_logo" />
      <div className="college_name font-bold mx-auto" style={{ color: "#31398A" }}>
        Indian Institute of Information Technology Design & Manufacturing, Kurnool
      </div>
    </div>
        </>
    )
}