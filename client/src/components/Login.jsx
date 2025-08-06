import React from 'react';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const defaultValues = {
        email: "",
        password: "",
        role: "user",
    }

    const [userData, setUserData] = React.useState(defaultValues);
    const navigate = useNavigate();

    const roles = ["User", "HR", "Doctor", "Admin"];

    const handleRoleChange = (role) => {
        const roleMap = {
            "User": "user",
            "HR": "hr", 
            "Doctor": "doctor",
            "Admin": "admin"
        };
        setUserData({ ...userData, role: roleMap[role] });
    };

    const handleLogin = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);

                if (data.role === "user")
                    window.location.href = "https://rad-capybara-2763b4.netlify.app/";
                else if (data.role === "hr")
                    window.location.href = "https://ad-s97e-git-main-adithya-varma-ais-projects.vercel.app/dashboard/hr";
                else if (data.role === "doctor")
                    window.location.href = "https://ad-s97e-git-main-adithya-varma-ais-projects.vercel.app/dashboard/doctor";
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-black">Login</h1>
                
                {/* Role Selection */}
                <div className="flex justify-center items-center gap-8 mb-8">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={`text-lg font-medium transition-all duration-200 ${
                                userData.role === role.toLowerCase() 
                                    ? "text-black font-semibold border-b-2 border-black pb-1" 
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        className="w-full rounded-lg border border-teal-300 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-base"
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={userData.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                        className="w-full rounded-lg border border-teal-300 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-base"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg py-4 px-8 font-semibold shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200 text-lg mt-2"
                    >
                        Sign In
                    </button>
                </form>
                
                <button
                    onClick={() => navigate("/create-account")}
                    className="text-gray-500 hover:text-gray-700 mt-6 text-sm"
                >
                    Don't have an account? <span className="font-semibold">Register</span>
                </button>
            </div>
        </div>
    )
}

export default Login
