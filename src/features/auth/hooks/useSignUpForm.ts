import useSignUp from './queries/useSignUp'
import { useForm } from 'react-hook-form';
import { SignUpSchema, signUpSchema } from '../schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues = {
    email: '',
    password: '',
    confirm: ''
};

function useSignUpForm() {
    const { getValues, register, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues
    })

    const { mutate: signUp } = useSignUp();

    const onSubmit = handleSubmit(({ email, password, nickname }) => {
        signUp({ email, password, nickname })
    })

    return {
        onSubmit,
        register
    }
}

export default useSignUpForm