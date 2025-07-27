import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepRole1 from './stages/StepRole1';
import StageRole2 from './stages/StageRole2';
import StageRole3 from './stages/StageRole3';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {

    const navigate = useNavigate();

    const [step, setStep] = React.useState(1);
    const [role, setRole] = React.useState("user");
    const [formData, setFormData] = React.useState({});

    const nextStep = () => setStep(step => step + 1);
    const prevStep = () => setStep(step => step - 1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("role", role);
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await res.json();
            if (res.ok) {
                alert("Account created successfully!");
                setFormData({});
                setStep(1);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Error registering account");
        }
    };


    const variants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px]">

                <div className="flex justify-between mb-8">
                    {["Role", "Details", "Password"].map((label, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                                {index + 1}
                            </div>
                            <p className="text-sm mt-2">{label}</p>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <StepRole1 role={role} setRole={setRole} nextStep={nextStep} />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <StageRole2
                                role={role}
                                formData={formData}
                                handleChange={handleChange}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                setFormData={setFormData}
                            />
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <StageRole3
                                formData={formData}
                                handleChange={handleChange}
                                prevStep={prevStep}
                                handleSubmit={handleSubmit}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition cursor-pointer"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;