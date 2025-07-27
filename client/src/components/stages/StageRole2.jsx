import React from "react";

const StageRole2 = ({ role, formData, handleChange, nextStep, prevStep, setFormData }) => {
    const inputClass =
        "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-3";

    return (
        <div>
            {/* Common email field */}
            <input type="email" name="email" placeholder="Email" className={inputClass} onChange={handleChange} />

            {role === "user" && (
                <>
                    <input type="text" name="firstName" placeholder="First Name" className={inputClass} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" className={inputClass} onChange={handleChange} />
                    <input type="date" name="dob" className={inputClass} onChange={handleChange} />
                </>
            )}

            {role === "admin" && (
                <>
                    <input type="text" name="firstName" placeholder="First Name" className={inputClass} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" className={inputClass} onChange={handleChange} />
                </>
            )}

            {role === "hr" && (
                <>
                    <input type="text" name="companyName" placeholder="Company Name" className={inputClass} onChange={handleChange} />
                    <input type="text" name="hrName" placeholder="HR Name" className={inputClass} onChange={handleChange} />
                    <input type="date" name="established" placeholder="Established Date" className={inputClass} onChange={handleChange} />
                    <textarea name="address" placeholder="Company Address" className={`${inputClass} resize-none h-20`} onChange={handleChange} />
                    <input type="number" name="size" placeholder="Company Size" className={inputClass} onChange={handleChange} />
                </>
            )}

            {role === "doctor" && (
                <>
                    <input type="text" name="firstName" placeholder="First Name" className={inputClass} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" className={inputClass} onChange={handleChange} />
                    <input type="text" name="specialization" placeholder="Specialization" className={inputClass} onChange={handleChange} />
                    <input type="number" name="experience" placeholder="Years of Experience" className={inputClass} onChange={handleChange} />
                    <input type="file" name="documents" accept=".pdf" className={inputClass} onChange={(e) => setFormData({ ...formData, documents: e.target.files[0] })} />
                    <input type="text" name="timings" placeholder="Available Timings" className={inputClass} onChange={handleChange} />
                </>
            )}

            <div className="flex justify-between mt-6">
                <button onClick={prevStep} type="button" className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer">
                    Back
                </button>
                <button onClick={nextStep} type="button" className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    );
};

export default StageRole2;