import { useRef, useState } from 'react';
import { Validator } from './validator';
import { IUserFormReturn, IuseFrom, IinputProps, Erros } from './types';

const useForm = <P>({ onSubmit, formState }: IuseFrom<P>): IUserFormReturn<P> => {
    const [state, setState] = useState<P>(formState);
    const [errors, setErrors] = useState<Erros<P>>({});
    const validationRef = useRef<{ [k in keyof P]?: Validator }>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errorResolve: (keyof P)[] = Object.keys(validationRef.current) as (keyof P)[];
        const errors: Erros<P> = {};
        if (errorResolve.length) {
            for (let i = 0; i < errorResolve.length; i++) {
                const name = errorResolve[i];
                const validate = validationRef.current[name]?.getErrors(state[name]);
                if (validate?.error) {
                    errors[name] = validate;
                }
            }
        }
        setErrors(errors);
        if (!Object.keys(errors).length) {
            onSubmit();
        }
    };

    const getInputProps = ({ name, onChange, validate }: IinputProps<P>) => {
        const getValidateFuntions = () => {
            if (validationRef.current && validate) {
                validationRef.current[name] = validate;
            }
        };
        getValidateFuntions();

        return {
            name: name,
            onChange: (event: any) => {
                const value = event?.target?.value === undefined ? event : event.target.value;
                const changeValue = onChange ? onChange(value) : value;
                setState({
                    ...state,
                    [name]: changeValue,
                });
                const getErros = validate?.getErrors(changeValue);
                if (getErros?.error) {
                    setErrors({
                        ...errors,
                        [name]: getErros,
                    });
                } else {
                    setErrors({
                        ...errors,
                        [name]: {
                            error: false,
                            message: [],
                        },
                    });
                }
            },

            value: state[name],
        };
    };

    const onReset = () => {
        setState(formState);
    };

    return {
        errors,
        handleSubmit,
        getInputProps,
        state,
        setState,
        onReset,
    };
};

export default useForm;
