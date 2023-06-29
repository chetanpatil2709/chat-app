import React from 'react';
import { Link } from 'react-router-dom';
import { BiMessageDetail, BiBell } from 'react-icons/bi'
import { useCookies } from 'react-cookie';
import { useGetUser } from '../hooks/customHooks.jsx';

export default function Navbar() {
    const [cookie, removeCookie] = useCookies();
    const user = useGetUser(cookie._un)
    return (
        <div className='navbar_top'>
            <div className='row w-100'>
                <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center'>
                    <Link to='/' className='brand_name' onClick={() => { removeCookie('_conId'); removeCookie('_nxtP') }}>Be Social</Link>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center'>
                    {/* <input type='text' className="search_bar mt-2" placeholder="search...." /> */}
                </div>
                <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex d-flex align-items-center justify-content-center'>
                    <div>
                        <Link className='header_icon'><BiMessageDetail /></Link>
                        <Link className='header_icon'><BiBell /></Link>
                        <Link className='profileTextIcon text-decoration-none' to="/profile">{user.name?.charAt(0)}</Link>
                    </div>
                </div>

            </div>
        </div >
    )
}
