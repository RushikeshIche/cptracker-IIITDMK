import {NavLink} from 'react-router-dom'
import '../style/header.css'
export const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="header-box">
                    <ul>
                        <NavLink className="navlinks" to="/"><li>Home</li></NavLink>
                        <NavLink className="navlinks" to="/codechef"><li>CodeChef</li></NavLink>
                        <NavLink className="navlinks" to="/codeforces"><li>CodeForces</li></NavLink>
                        <NavLink className="navlinks" to="/leetcode"><li>LeetCode</li></NavLink>
                    </ul>
                </div>
            </div>
        </>
    )
}