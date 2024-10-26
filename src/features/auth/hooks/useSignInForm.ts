import React, { FormEvent, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignIn from './queries/useSignIn';
import { signInSchema, SignInSchema } from '../schema/signInSchema';

const defaultValues = {
    email: '',
    password: '',
};

function useSignInForm() {
    const { mutate: signIn, } = useSignIn();
    const { control, register, getValues, handleSubmit, formState } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues,
    });

    const { errors } = formState;

    const onSubmit = useCallback(async (values: SignInSchema) => {
        signIn({
            email: values.email,
            password: values.password
        })
    }, [signIn]);

    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
    }
}

export default useSignInForm