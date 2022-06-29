import React from 'react';
import Form from '../components/SIgninForm';

const SigninContainer = () => {
    return (
        <main className="flex gap-28">
            <div className="max-w-xs sticky top-0 h-screen bg-ct-purple-700 block w-full">
                <img
                    className="object-cover h-full absolute  bottom-0 top-0"
                    src="/static/assets/images/login-reg-bg.svg"
                    alt="background"
                />
            </div>
            <div className="w-full pb-5">
                <div className="max-w-xl px-5 pt-28  w-full ">
                    <h1 className="text-ct-purple-700 text-3xl font-bold mb-16">Signin your operator account</h1>
                    <div>
                        <Form />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SigninContainer;
