import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/Api';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

export default function RegisterUser() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onBlur" });
    const [cookie, setCookie] = useCookies();

    const [userInput, setuserInput] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        type: "",
        msg: ""
    })
    const onInputChange = (e) => {
        setuserInput({ ...userInput, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        // console.log(userInput)
        api.post('user/signup/', userInput)
            .then(res => {
                if (res.data.status !== "success") {
                    setShowAlert(true);
                    setAlertMsg({ type: "danger", msg: res.data.message })
                    setTimeout(() => {
                        setShowAlert(false)
                        setAlertMsg({ type: "", msg: "" });
                    }, 2000);

                } else if (res.data.status !== "failed") {
                    setShowAlert(true);
                    setAlertMsg({ type: "success", msg: res.data.message })
                    setTimeout(() => {
                        setShowAlert(false)
                        setAlertMsg({ type: "", msg: "" })
                        navigate('/login')
                    }, 2000);
                }
            })
    }
    console.log(showAlert)
    return (
        <div className="login_screen modal-dialog-centered">
            <div className="login_screen_content">
                <div>
                    <div className='d-flex justify-content-center'>
                        <h4>Register</h4>
                    </div>
                    <form className='form'>
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
                            <label htmlFor='userName'>Username:</label>
                            <input id='userName' type='text' placeholder='username'
                                name='userName'
                                {...register("userName", {
                                    required: "Username is required"
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
                        <div className='form_control'>
                            <label htmlFor='password'>Password:</label>
                            <input id='password' type='password' placeholder='********'
                                name='password'
                                {...register("password", {
                                    required: "Password is required"
                                })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {
                                errors.password && (
                                    <span style={{ color: "red" }}>{errors.password.message}</span>
                                )
                            }
                        </div>
                        <div className='form_control'>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <input id='confirmPassword' type='password' placeholder='********'
                                name='confirmPassword'
                                {...register("confirmPassword", {
                                    required: "Confirm password is required"
                                })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {
                                errors.confirmPassword && (
                                    <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
                                )
                            }
                        </div>
                        {
                            showAlert && (
                                <div className={`alert alert-${alertMsg.type} mt-2`}>
                                    <span>{alertMsg.msg}</span>
                                </div>
                            )
                        }
                        <button type='button'
                            onClick={handleSubmit(onSubmit)}
                        >Register</button>
                    </form>
                    <div className='d-flex justify-content-center'>
                        <Link to="/login">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}