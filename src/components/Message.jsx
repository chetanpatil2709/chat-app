import React from 'react'
import Cicon from '../images/download.png'
import { useGetUser } from '../hooks/customHooks'
import { useCookies } from 'react-cookie'

export default function Message({ i, nextP, own }) {
    const [cookie] = useCookies();
    const user = useGetUser(cookie._un)
    const nextPerson = useGetUser(nextP)
    return (
        <div className={own ? "own" : ""}>
            <div className='msg'>
                <div className="msgTop">
                    <span className='msgTextIcon'>
                        {own ? user.name?.charAt(0) : nextPerson.name?.charAt(0).toUpperCase()}
                    </span>
                    <div className="msgBottom">
                        <p className='msgText'>{i.text}</p>
                        <p className='msgTime'>{i.sendAt}</p>
                    </div>
                </div>
                {/* <div className="msgBottom">
                    <p>1 hr ago</p>
                </div> */}
            </div>
        </div>
    )
}
