import React from 'react';
import Cicon from '../images/download.png';
export default function OnlineFriends() {
    return (
        <div className='onlineFriends'>
            <div className='position-relative'>
                <img className='onlineFriendsImg' src={Cicon} alt='icon' />
                <p className='onlineFriendsBadge'></p>
            </div>
            <span className='onlineFriendsName mt-2'>Joe Doe</span>
        </div>
    )
}
