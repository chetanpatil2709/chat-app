import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useGetUser } from '../hooks/customHooks';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/Api';

export default function Profile() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        type: "",
        msg: ""
    })
    const [updateProfile, setUpdateProfile] = useState(false);
    const [cookie, removeCookie] = useCookies();
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" });
    const [profileInput, setProfileInput] = useState({
        userId: cookie._un,
        name: "",
        userName: "",
        gmail: ""
    });
    const profile = useGetUser(cookie._un);
    // console.log("profile", profile)
    const onInputChange = (e) => {
        setProfileInput({ ...profileInput, [e.target.name]: e.target.value })
    }
    const onSubmit = async () => {
        await api.post('/user/', profileInput)
            .then(res => {
                if (res.data.status === "success") {
                    setShowAlert(true)
                    setAlertMsg({ type: "success", msg: res.data.message })
                    setTimeout(() => {
                        setShowAlert(false)
                        setUpdateProfile(false)
                    }, 2000);
                } else if (res.data.status === "faild") {
                    setShowAlert(true)
                    setAlertMsg({ type: "danger", msg: res.data.message })
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 2000);
                }
            })
    }
    const handleLogOut = () => {
        removeCookie('_in')
        removeCookie('_un')
        removeCookie('_conId')
        removeCookie('_nxtP')
        navigate("/")
    }
    return (
        <div className='home'>
            <div className='row w-100'>
                <div className='friends col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                </div>
                <div className='profile col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <div className='d-flex justify-content-center'>
                        <h4 className='mt-2'>Profile</h4>
                    </div>
                    <div className='d-flex justify-content-end m-0 p-0'>
                        <Link to="/" className='logOutBtn'
                            onClick={handleLogOut}
                        >Log Out</Link>
                    </div>
                    <form className='form'>
                        {
                            updateProfile ?
                                <div className='form_control'>
                                    <label htmlFor='name'>Name:</label>
                                    <input id='name' type='text' placeholder='name'
                                        name='name'
                                        {...register("name", {
                                            required: "Name is required"
                                        })}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {
                                        errors.name && (
                                            <span style={{ color: "red" }}>{errors.name.message}</span>
                                        )
                                    }
                                </div>
                                :
                                <div className='form_control'>
                                    <label htmlFor='name'>Name:</label>
                                    <input id='name' type='text' placeholder='name'
                                        name='name' defaultValue={profile?.name} disabled={true} />
                                </div>
                        }
                        <div className='form_control'>
                            <label htmlFor='userName'>Username:</label>
                            <input id='userName' className='opacity-75' type='text' placeholder='userName' defaultValue={profile.userName} disabled={true} />
                        </div>
                        <div className='form_control'>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' className='opacity-75' type='text' placeholder='email' defaultValue={profile.email} disabled={true} />
                        </div>
                        {
                            showAlert && (
                                <div className={`alert alert-${alertMsg.type} mt-2`}>
                                    <span>{alertMsg.msg}</span>
                                </div>
                            )
                        }
                        {
                            updateProfile ?
                                <div className='d-flex flex-row gap-2'>
                                    <button type='button' className='cancelBtn'
                                        onClick={() => setUpdateProfile(false)}
                                    >Cancel</button>
                                    <button type='button' className='saveBtn'
                                        onClick={handleSubmit(onSubmit)}
                                    >Save</button>
                                </div>
                                :
                                <button type='button' className='saveBtn'
                                    onClick={() => setUpdateProfile(true)}
                                >Update Profile</button>

                        }
                    </form>
                    {
                        updateProfile ? <></> :
                            <div className='text-center'>
                                <Link to="/changepass" className='pe-auto'>Change password?</Link>
                            </div>
                    }
                    {/* <form className='form'>
                        <div className='form_control'>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' type='text' placeholder='name'
                                name='name'
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {
                                errors.name && (
                                    <span style={{ color: "red" }}>{errors.name.message}</span>
                                )
                            }
                        </div>
                        <div className='form_control'>
                            <label htmlFor='userName'>userName:</label>
                            <input id='userName' type='text' placeholder='userName'
                                name='userName'
                                {...register("userName", {
                                    required: "userName is required"
                                })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {
                                errors.userName && (
                                    <span style={{ color: "red" }}>{errors.userName.message}</span>
                                )
                            }
                        </div>
                        <div className='form_control'>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' type='text' placeholder='email'
                                name='email'
                                {...register("email", {
                                    required: "Email is required"
                                })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {
                                errors.email && (
                                    <span style={{ color: "red" }}>{errors.email.message}</span>
                                )
                            }
                        </div>
                        <button type='button'
                            onClick={setUpdate(true)}
                        >Update</button>
                    </form> */}
                </div>
                <div className='online pt-3 col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                </div>
            </div>
        </div >
    )
}
