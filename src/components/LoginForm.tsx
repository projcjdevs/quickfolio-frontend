import React from 'react';
import { useState } from 'react';

interface LoginFormProps {
    onClose: () => void;
    onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                onClose();
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-[610.99px] h-[427.48px] rounded-[40px] shadow-xl flex overflow-hidden">
                {/*left*/}
                <div className="w-3/5 bg-[#E8F4F4] p-6 flex flex-col justify-start items-start">
                    <h2 className="text-2xl font-bold text-black mb-4 self-start ml-4">
                        QuickFolio
                    </h2>
                    <div className="flex justify-center items-center h-[340px] w-full ml-[-30px] mt-16 overflow-visible relative">
                        <img
                            src="https://blush.design/api/download?shareUri=Obam7yDIr&w=800&h=800&fm=png"
                            alt="login doodle"
                            className="w-[320px] h-[320px] object-contain transform scale-[1.3]"
                        />
                    </div>
                </div>

                {/*right*/}
                <form
                    onSubmit={handleLogin}
                    className="w-3/6 p-8 flex flex-col justify-start items-center pt-17"
                >
                    <h2 className="text-2xl font-bold text-black mb-6 text-center">
                        Login
                    </h2>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="text-[13px] mb-2 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4]"
                        style={{ width: '180.19px', height: '30.71px' }}
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="text-[13px] mb-4 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4]"
                        style={{
                            width: '180.19px',
                            height: '30.71px',
                            marginBottom: '8px',
                        }}
                    />

                    <p
                        className="text-[10px] mb-3 text-center text-black"
                        style={{ fontFamily: 'arial' }}
                    >
                        Don’t have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitch}
                            className="text-[#0051F3]"
                        >
                            Register now
                        </button>
                    </p>

                    <button
                        type="submit"
                        className="bg-black text-white text-[14px] flex items-center justify-center py-2 rounded-full hover:bg-[#dedede] hover:text-[#333333] transition-colors"
                        style={{ width: '90px', height: '33px' }}
                    >
                        Login
                    </button>

                    <div className="w-full flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400 text-sm">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="w-[175px] h-[30px] flex items-center justify-center border border-[#1e1e1e] text-[#1e1e1e] text-[12px] font-medium py-2 rounded-md mb-2 hover:bg-gray-100 transition"
                    >
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="w-[175px] h-[30px] flex items-center justify-center border border-[#1e1e1e] text-[#1e1e1e] text-[12px] font-medium py-2 rounded-md hover:bg-gray-100 transition"
                    >
                        Continue with Microsoft
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;