import React from 'react';
import Button from 'ui/components/Button';
import TextInput from 'ui/components/TextInput';
import useForm, { validator } from 'ui/hooks/useForm';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { setUser } from '../../../../reducers/userReducer';
import { useAppDispatch } from '../../../../store';
import { useLoginOperatorMutation } from '../../../../api/auth';

export interface IFormState {
    email: string;
    password: string;
}

const Form = () => {
    const [loginAction] = useLoginOperatorMutation();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const { handleSubmit, errors, state, getInputProps } = useForm<IFormState>({
        formState: {
            email: '',
            password: '',
        },
        onSubmit: () => {
            toast.promise(onSubmit(state), {
                loading: <b>Submitting...</b>,
                success: <b>Successfully login </b>,
                error: <b>Email or password invalid, Try again.</b>,
            });
        },
    });

    const onSubmit = async (state: IFormState) => {
        try {
            const response = await loginAction(state);
            if ('data' in response) {
                dispatch(
                    setUser({
                        user: response.data.result,
                        token: response.data.authToken,
                    })
                );

                router.push('/navigation');
                return;
            }
            throw new Error('Invalid login');
        } catch (error) {
            throw new Error('Invalid login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                className="mb-10"
                label="Email"
                type="email"
                error={errors.email?.error}
                errorText={errors.email?.message[0]}
                {...getInputProps({
                    name: 'email',
                    validate: validator
                        .isRequire()
                        .withMessage('Email  is required')
                        .isValidEmail()
                        .withMessage('Email is not valid'),
                })}
            />
            <TextInput
                className="mb-10"
                label="Password"
                type="password"
                error={errors.password?.error}
                errorText={errors.password?.message[0]}
                {...getInputProps({
                    name: 'password',
                    validate: validator
                        .isRequire()
                        .withMessage('Password is required')
                        .isLength({ min: 6 })
                        .withMessage('Minimum password length is 6')
                        .isLength({ max: 16 })
                        .withMessage('Maximum password length is 16'),
                })}
            />
            <Button className="mt-12">Signin</Button>
            <Toaster position="bottom-left" />
        </form>
    );
};

export default Form;
