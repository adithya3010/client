import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const defaultValues = {
        email: "",
        password: "",
    }

    const [visible, setVisible] = React.useState(false);
    const [userData, setUserData] = React.useState(defaultValues);
    const navigate = useNavigate();

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);

                if (data.role === "user")
                    navigate("/user");
                else if (data.role === "hr")
                    navigate("/hr");
                else if (data.role === "doctor")
                    navigate("/doctor");
                else
                    navigate("/admin");
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Error logging in");
        }
    };

    return (
        <>
            <div className='bg-gray-900 h-screen flex items-center justify-center'>
                <div className='bg-gray-200 p-10 rounded-2xl shadow-lg w-96 h-[60vh] flex flex-col items-center'>
                    <h1 className='text-2xl tracking-wider font-semibold'>Login</h1>
                    <div className='w-full mt-8 flex flex-col space-y-4'>
                        <input
                            type='email'
                            placeholder='email'
                            name={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className='w-full p-2.5 mt-4 border-2 border-gray-800 rounded-lg outline-none focus:border-green-600 transition-all duration-300 ease-in-out'
                        />
                        <input
                            type={visible ? 'text' : 'password'}
                            placeholder='password'
                            name={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className='w-full p-2.5 mt-4 border-2 border-gray-800 rounded-lg outline-none focus:border-green-600 transition-all duration-300 ease-in-out'
                        />
                    </div>
                    <button
                        onClick={toggleVisibility}
                        className='absolute right-[41%] pt-2 top-1/2 -translate-y-1/2 cursor-pointer'
                    >
                        <AnimatePresence mode="wait">
                            {visible ? (
                                <motion.div
                                    key="invisible"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AiOutlineEyeInvisible className='text-2xl' />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="visible"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AiOutlineEye className='text-2xl' />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        onClick={handleLogin}
                        className='w-full bg-gray-800 text-white p-2 mt-6 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer tracking-wider'
                    >
                        Submit
                    </button>

                    <p className='mt-4 tracking-wide text-blue-600 underline underline-offset-2 cursor-pointer'>Forgot Your Password?</p>

                    <button
                        onClick={() => navigate("/create-account")}
                        className='w-full bg-gray-800 text-white p-2 mt-4 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer tracking-wider'
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login