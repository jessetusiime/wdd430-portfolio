'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';

const initialState: State = {
    message: null,
    errors: {},
};

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(
        createProject,
        initialState
    );

    const errors = state?.errors || {};

    return (
        <form
            action={formAction}
            className='space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'
        >
            <div>
                <label
                    htmlFor='title'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Project Title
                </label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    required
                    aria-describedby={errors.title ? 'title-error' : undefined}
                    aria-invalid={!!errors.title}
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div id='title-error' aria-live='polite' aria-atomic='true'>
                    {errors.title?.map((error) => (
                        <p key={error} className='mt-1 text-sm text-red-600'>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor='description'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    rows={5}
                    required
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    aria-invalid={!!errors.description}
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div id='description-error' aria-live='polite' aria-atomic='true'>
                    {errors.description?.map((error) => (
                        <p key={error} className='mt-1 text-sm text-red-600'>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor='technologies'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Technologies
                </label>
                <input
                    id='technologies'
                    name='technologies'
                    type='text'
                    placeholder='Next.js, TypeScript, Tailwind CSS'
                    required
                    aria-describedby={errors.technologies ? 'technologies-error' : 'tech-hint'}
                    aria-invalid={!!errors.technologies}
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <p id='tech-hint' className='mt-1 text-sm text-gray-500'>
                    Separate technologies with commas.
                </p>
                <div id='technologies-error' aria-live='polite' aria-atomic='true'>
                    {errors.technologies?.map((error) => (
                        <p key={error} className='mt-1 text-sm text-red-600'>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor='yearCompleted'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Year Completed
                </label>
                <input
                    id='yearCompleted'
                    name='yearCompleted'
                    type='number'
                    min='2000'
                    max={new Date().getFullYear()}
                    required
                    aria-describedby={errors.yearCompleted ? 'yearCompleted-error' : undefined}
                    aria-invalid={!!errors.yearCompleted}
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div id='yearCompleted-error' aria-live='polite' aria-atomic='true'>
                    {errors.yearCompleted?.map((error) => (
                        <p key={error} className='mt-1 text-sm text-red-600'>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor='type'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Project Type
                </label>
                <select
                    id='type'
                    name='type'
                    defaultValue='school'
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value='school'>School</option>
                    <option value='opensource'>Open Source</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='link'
                    className='mb-2 block font-medium text-gray-900'
                >
                    Project Link
                </label>
                <input
                    id='link'
                    name='link'
                    type='url'
                    placeholder='https://github.com...'
                    aria-describedby={errors.link ? 'link-error' : undefined}
                    aria-invalid={!!errors.link}
                    className='block w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                />
                <div id='link-error' aria-live='polite' aria-atomic='true'>
                    {errors.link?.map((error) => (
                        <p key={error} className='mt-1 text-sm text-red-600'>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div aria-live='polite' aria-atomic='true'>
                {state.message && (
                    <p className='text-sm text-red-600'>
                        {state.message}
                    </p>
                )}
            </div>

            <button
                type='submit'
                disabled={isPending}
                className='rounded bg-blue-700 px-5 py-2 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
                {isPending ? 'Saving...' : 'Save Project'}
            </button>
        </form>
    );
}
