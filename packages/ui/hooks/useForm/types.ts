import React, { Dispatch, SetStateAction } from 'react';
import { Validator } from './validator';

export interface IEvent<T> {
    target: {
        value: T;
    };
}

export type Iirrors = {
    error: boolean;
    message: string[];
};

export type Erros<P> = {
    [k in keyof P]?: Iirrors;
};

export type onChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface IUserFormReturn<P> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps: (props: IinputProps<P>) => {
        name: keyof P;
        onChange: (event: any) => void;
    };
    onReset: () => void;
    state: P;
    errors: Erros<P>;
    setState: Dispatch<SetStateAction<P>>;
}

export interface IuseFrom<P> {
    onSubmit: () => void;
    formState: P;
}

export interface IinputProps<P> {
    name: keyof P;
    onChange?: (event: any) => any;
    validate?: Validator;
}
