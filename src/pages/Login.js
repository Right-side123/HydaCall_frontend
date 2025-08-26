import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import slide1 from '../assets/slide1.svg';
import slide2 from '../assets/slide2.svg';
import slide3 from '../assets/slide3.svg';
import emailicon from '../assets/loginemail.png';
import passicon from '../assets/loginpass.png';
import showpassicon from '../assets/logineye.png';
import notshowpassicon from '../assets/eyeiconnot.png'
import logo from '../assets/rightsideLogo.png';
import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setIsAuthenticated }) => {
    const images = [slide1, slide2, slide3];
    const [current, setCurrent] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();


        if (email === "admin@test.com" && password === "1234") {
            localStorage.setItem("auth", "true");

            setIsAuthenticated(true)
            navigate("/dashboard");
        } else {
            alert("Invalid email or password");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="login_parent_container">
            <div className='login_parent_container_slide'>
                <div className="slider_container">
                    <img
                        src={images[current]}
                        alt="slider"
                        className="slider_image"
                    />
                </div>
            </div>


            <div className='login_parent_container_right'>
                <div className="login_parent_container_right_logo">
                    <img src={logo} alt="Logo" className="login_parent_container_right_logo_img" />
                </div>
                <h2 className="login_parent_container_right_login_title">Login</h2>
                <p className="login_parent_container_right_line">
                    "Securely log in to access your personalized dashboard effortlessly."
                </p>

                <form className="credential_form" onSubmit={handleSubmit}>

                    <label className="email_title">Email</label>
                    <div className=" email_inputbox">
                        <img src={emailicon} alt='email' className='loginemail_icon' />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="email_input_box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password_container">
                        <label className="password_title">Password</label><br />
                        <div className='pasword_inputbox'>
                            <img src={passicon} alt='password' className='password_icon' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="password_input_box"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                className=""
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}

                                {showPassword ? <img src={showpassicon} alt='show' className='logineye_icon' /> : <img src={notshowpassicon} alt='hidden' className='logineye_icon' />}
                            </div>
                        </div>
                    </div>

                    <div className="forgate_password">
                        Forgot Password?
                    </div>

                    <button
                        type="submit"
                        className="loginbtn"
                    >
                        Sign In
                    </button>
                </form>

                {/* <div className="">
                    Powered by <span className="">Rightside</span>
                </div> */}

            </div>
        </div>
    );
};

export default Login;
