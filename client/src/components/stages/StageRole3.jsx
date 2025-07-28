import React from "react";

const StageRole3 = ({ handleChange, prevStep, handleSubmit }) => {
    const inputClass =
        "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-3";

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputClass}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={inputClass}
                onChange={handleChange}
                required
            />

            <div className="flex justify-between mt-6">
                <button
                    onClick={prevStep}
                    type="button"
                    className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer">
                    Back
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default StageRole3;
