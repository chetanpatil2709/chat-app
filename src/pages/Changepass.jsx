import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/Api';
import { validatePassword } from '../config/Validate';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

export default function Changepass() {
    const [cookie] = useCookies();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" });
    const passSchema = {
        userId: cookie._un,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    }
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        type: "",
        msg: ""
    });
    const [inputErr, setInputErr] = useState({ ...passSchema });
    const [passwordType, setPasswordType] = useState("password");
    const [passInput, setPassInput] = useState({ ...passSchema });
    const onInputChange = (e) => {
        setPassInput({ ...passInput, [e.target.name]: e.target.value })
    }
    const validatePass = () => {
        let tempErr = { ...passSchema };
        let isValid = true;
        if (!validatePassword(passInput.currentPassword)) {
            tempErr.currentPassword = 'Password length should be 8 to 16 characters'
            isValid = false;
        }
        if (!validatePassword(passInput.newPassword)) {
            tempErr.newPassword = 'Password length should be 8 to 16 characters'
            isValid = false;
        }
        if (!validatePassword(passInput.confirmPassword)) {
            tempErr.confirmPassword = 'Password length should be 8 to 16 characters'
            isValid = false;
        }
        setInputErr(tempErr)
        return isValid;
    }
    const onSubmit = async () => {
        if (validatePass()) {
            await api.post('/user/changepass', passInput)
                .then(res => {
                    console.log(res)
                    if (res.data.status === "success") {
                        setShowAlert(true)
                        setAlertMsg({ type: "success", msg: res.data.message })
                        setTimeout(() => {
                            setShowAlert(false)
                            navigate("/profile")
                        }, 2000);
                    } else if (res.data.status === "failed") {
                        setShowAlert(true)
                        setAlertMsg({ type: "danger", msg: res.data.message })
                        setTimeout(() => {
                            setShowAlert(false)
                        }, 2000);
                    }
                })
        } else {
            console.log("something wrong in validate password")
        }
    }
    const handlePasswordType = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else if (passwordType === "text") {
            setPasswordType("password")
        }
    }
    console.log(passwordType)
    return (
        <div className='home'>
            <div className='row w-100'>
                <div className='friends col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                </div>
                <div className='profile col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <div className='d-flex justify-content-center'>
                        <h4 className='mt-2'>Change Password</h4>
                    </div>
                    <form className='form'>
                        <div className='form_control'>
                            <label htmlFor='currentPassword'>Current Password:</label>
                            <div className='position-relative'>
                                <input id='currentPassword' type={passwordType} placeholder='Current Password'
                                    name='currentPassword'
                                    {...register("currentPassword", {
                                        required: "Current Password is required"
                                    })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <span className='passwordIcon' onClick={() => handlePasswordType()}>{passwordType === "text" ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                            </div>
                            {
                                errors.currentPassword && (
                                    <span className='text-danger'>{errors.currentPassword.message}</span>
                                )
                            }
                            {inputErr.currentPassword !== "" ? (
                                <span className='text-danger'>{inputErr.currentPassword}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className='form_control'>
                            <label htmlFor='newPassword'>New Password:</label>
                            <div className='position-relative'>
                                <input id='newPassword' type={passwordType} placeholder='New Password'
                                    name='newPassword'
                                    {...register("newPassword", {
                                        required: "New Password is required"
                                    })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <span className='passwordIcon' onClick={() => handlePasswordType()}>{passwordType === "text" ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                            </div>
                            {
                                errors.newPassword && (
                                    <span className='text-danger'>{errors.newPassword.message}</span>
                                )
                            }
                            {inputErr.newPassword !== "" ? (
                                <span className='text-danger'>{inputErr.newPassword}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className='form_control'>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <div className='position-relative'>
                                <input id='confirmPassword' type={passwordType} placeholder='Confirm Password'
                                    name='confirmPassword'
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required"
                                    })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <span className='passwordIcon' onClick={() => handlePasswordType()}>{passwordType === "text" ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                            </div>
                            {
                                errors.confirmPassword && (
                                    <span className='text-danger'>{errors.confirmPassword.message}</span>
                                )
                            }
                            {inputErr.confirmPassword !== "" ? (
                                <span className='text-danger'>{inputErr.confirmPassword}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        {
                            showAlert && (
                                <div className={`alert alert-${alertMsg.type} mt-2 text-center`}>
                                    <span className='m-auto'>{alertMsg.msg}</span>
                                </div>
                            )
                        }
                        <div className='d-flex flex-row gap-2'>
                            <Link to="/profile" className='cancelBtn'>Cancel
                            </Link>
                            <button type='button' className='saveBtn'
                                onClick={handleSubmit(onSubmit)}
                            >Update</button>
                        </div>
                    </form>
                </div>
                <div className='online pt-3 col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                </div>
            </div>
        </div >
    )
}
