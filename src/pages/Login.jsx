import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/Api';
import { useCookies } from 'react-cookie';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

export default function Login() {
    const [cookie, setCookie] = useCookies();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ mode: "onBlur" });
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        type: "",
        msg: ""
    });
    const [credentials, setCredentials] = useState({
        gmail: "",
        password: ""
    });
    const [passwordType, setPasswordType] = useState("password");
    const handlePasswordType = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else if (passwordType === "text") {
            setPasswordType("password")
        }
    }
    const onInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            api.post('user/signin/', credentials)
                .then(res => {
                    if (res.data.status !== "success") {
                        setAlertMsg({ type: "danger", msg: res.data.message })
                        setShowAlert(true)
                        setLoading(false)
                        setCookie("_in", false, { path: "/" })
                        setTimeout(() => {
                            setShowAlert(false)
                            setAlertMsg({ type: "", msg: "" })
                        }, 2000);
                    } else if (res.data.status !== "failed") {
                        setAlertMsg({ type: "success", msg: res.data.message })
                        setCookie("_in", true, { path: "/" })
                        setCookie("_un", res.data.userId, { path: "/" })
                        setShowAlert(true)
                        setLoading(false)
                        setTimeout(() => {
                            setShowAlert(false)
                            setAlertMsg({ type: "", msg: "" })
                            navigate("/")
                        }, 2000);
                    }
                })

        }, 1000);
    }
    console.log(showAlert)
    return (
        <div className="login_screen modal-dialog-centered">
            <div className="login_screen_content">
                <div>
                    <div className='d-flex justify-content-center'>
                        <h4>Login</h4>
                    </div>
                    <form className='form'>
                        <div className='form_control'>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' type='text' placeholder='eamil'
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
                            <div className='position-relative'>
                                <input id='password' type={passwordType} placeholder='********'
                                    name='password'
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <span className='passwordIcon' onClick={() => handlePasswordType()}>{passwordType === "text" ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                            </div>
                            {
                                errors.password && (
                                    <span style={{ color: "red" }}>{errors.password.message}</span>
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
                        {
                            loading ?
                                <button type='button' className='saveBtn'
                                >Processing</button>
                                : <button type='button' className='saveBtn'
                                    onClick={handleSubmit(onSubmit)}
                                >Login</button>
                        }
                    </form>
                    <div className='d-flex justify-content-center'>
                        <Link to="/register">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
