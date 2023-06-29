import React, { useEffect, useState } from 'react';
import Cicon from '../images/download.png';
import { useCookies } from 'react-cookie';
import { api } from '../config/Api.jsx';
import { useGetUser } from '../hooks/customHooks.jsx'
export default function Conversation({ c }) {
    const [cookie, setCookie] = useCookies();
    const uid = c.members.find((m) => m !== cookie._un);
    const conversations = useGetUser(uid);
    return (
        <>
            <div className='conversation' onClick={() => { setCookie('_conId', c._id, { path: "/" }); setCookie('_nxtP', uid, { path: "/" }); }}>
                <span className='profileTextIcon'>{conversations.name?.charAt(0)}</span>
                <span className='conversationName' > {conversations.name}</span >
            </div >
        </>
    )
}
