'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mutate } from 'swr';
import { FormError, FormProps, UserForm, TResponse } from '@/types/types';

const Form: React.FC<FormProps> = ({ formId, userForm, forNewUser }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contentType = 'application/json';
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [form, setForm] = useState<UserForm>({
        first_name: userForm.first_name,
        last_name: userForm.last_name,
    });

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form: UserForm) => {
        const id = searchParams.get('id');

        try {
            const res: TResponse = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({
                    first_name: form.first_name,
                    last_name: form.last_name,
                }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status?.toString());
            }

            const { data } = await res.json();

            mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
            router.push('/');
        } catch (error) {
            setMessage('Failed to update user');
        }
    };

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form: UserForm) => {
        try {
            console.log('try to post');
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({
                    first_name: form.first_name,
                    last_name: form.last_name,
                }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status.toString());
            }
            console.log('done post');

            router.push('/');
        } catch (error) {
            setMessage('Failed to add user');
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const target = e.target;
        const value = target.name === 'poddy_trained' ? target.checked : target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            forNewUser ? postData(form) : putData(form);
        } else {
            setErrors({ errs });
        }
    };

    /* Makes sure user info is filled for the form */
    const formValidate = () => {
        const err: FormError = {} as FormError;
        if (!form.first_name) err.first_name = 'First name is required';
        if (!form.last_name) err.last_name = 'Last name is required';
        return err;
    };

    return (
        <>
            <form id={formId} onSubmit={handleSubmit} className='flex flex-col w-48'>
                <label htmlFor='first_name'>First Name</label>
                <input
                    className='text-black'
                    type='text'
                    maxLength={60}
                    name='first_name'
                    value={form.first_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor='last_name'>Last Name</label>
                <input
                    className='text-black'
                    type='text'
                    maxLength={60}
                    name='last_name'
                    value={form.last_name}
                    onChange={handleChange}
                    required
                />
                <button type='submit' className='btn'>
                    Submit
                </button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </>
    );
};

export default Form;
