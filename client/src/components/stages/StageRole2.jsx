import React from "react";

const StageRole2 = ({ handleChange, nextStep }) => {
    const inputClass =
        "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-3";

    return (
        <div>
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className={inputClass} 
                onChange={handleChange} 
                required 
            />

            <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                className={inputClass} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                className={inputClass} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="date" 
                name="dob" 
                className={inputClass} 
                onChange={handleChange} 
                required 
            />

            <div className="flex justify-between mt-6 w-full">
                <button 
                    onClick={nextStep} 
                    type="button" 
                    className="bg-blue-500 w-full text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    );
};

export default StageRole2;