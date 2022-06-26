import React from 'react';

const SigninContainer = () => {
    return (
        <section className="flex gap-28">
            <div className="max-w-xs sticky top-0 h-screen bg-cm-purple-700 block w-full">
                <img
                    className="object-cover h-full absolute  bottom-0 top-0"
                    src="/static/assets/images/login-reg-bg.svg"
                    alt="background"
                />
            </div>
        </section>
    );
};

export default SigninContainer;
