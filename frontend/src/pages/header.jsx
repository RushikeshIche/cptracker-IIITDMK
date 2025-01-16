import {NavLink} from 'react-router-dom'
import '../style/header.css'
import '../style/student.css'
export const Header = () => {
    return (
        <>
            <div className="w-full self-start title flex items-center p-3">
                <img src="src/assets/png college logo.png" alt="college logo" className="ml-3 college_logo" />
                <div className="college_name font-bold mx-auto" >
                    Indian Institute of Information Technology Design & Manufacturing, Kurnool
                </div>
            </div>
            <nav>
            <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className=" mix-blend-screen:ml-6 md:block">
                    <div className="sm:ml-16 container1 flex">
                        <NavLink className="anchor outline-none" to="/">HOME</NavLink>
                        <NavLink className="anchor outline-none" to="/leetcode">Leetcode</NavLink>
                        <NavLink className="anchor outline-none" to="/codeforces">Codeforces</NavLink>
                        <NavLink className="anchor outline-none" to="/codechef">Codechef</NavLink>
                    </div>
                    </div>
                </div>
                </div>
            </div>


            </nav>
            <center>

            <hr className='w-11/12 '
                            style={{
                            border: "1px solid black" ,
                            }}
                            />
            </center>
        </>
    )
}