import React from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { TabsLoginDemo } from "./ui/TabsLoginDemo";

const Login = () => {

    const defaultValues = {
        email: "",
        password: "",
        role: "",
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-white to-purple-200">
            <div className="bg-white/80 p-10 sm:p-16 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-8">Login</h1>
                <TabsLoginDemo
                  onTabChange={role => setUserData({ ...userData, role })}
                />
                <form className="w-full flex flex-col gap-5 mt-8" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        className="rounded-full border-2 border-teal-200 p-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-lg"
                        required
                    />
                    <div className="relative">
                        <input
                            type={visible ? 'text' : 'password'}
                            placeholder='Password'
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                            className="rounded-full border-2 border-teal-200 p-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-lg w-full pr-12"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full py-4 px-8 font-semibold shadow hover:from-teal-600 hover:to-purple-600 transition text-xl mt-2"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    onClick={() => navigate("/create-account")}
                    className="text-teal-600 hover:underline mt-4 text-base"
                >
                    Don't have an account? Register
                </button>
            </div>
        </div>
    )
}

export default Login