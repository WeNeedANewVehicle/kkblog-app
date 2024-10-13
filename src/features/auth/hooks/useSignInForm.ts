import React, { FormEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignIn from './queries/useSignIn';
import { signInSchema, SignInSchema } from '../schema/signInSchema';

const defaultValues = {
    email: '',
    password: '',
};

function useSignInForm() {
    const { mutate: signIn, data } = useSignIn();
    const { control, register, getValues, handleSubmit, formState } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues,
        shouldUnregister: true,
    });

    const { errors } = formState;

    const onSubmit = async (values: SignInSchema) => {
        const res = signIn({
            email: values.email,
            password: values.password
        });
    }

    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
    }
}

export default useSignInForm