import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateProject } from '@/app/lib/actions';
import { getProjectById } from '@/lib/projects-db';

export default async function EditProjectPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const id = params.id;
    const projectId = Number(id);

    if (Number.isNaN(projectId)) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <main className='mx-auto max-w-3xl p-8'>
            <h1 className='text-3xl font-bold'>Edit Project</h1>

            <form action={updateProjectWithId} className='mt-8 space-y-6'>
                <div>
                    <label
                        htmlFor='title'
                        className='mb-2 block font-medium text-gray-900'
                    >
                        Title
                    </label>

                    <input
                        id='title'
                        name='title'
                        required
                        defaultValue={project.title}
                        className='w-full rounded border border-gray-300 px-4 py-2'
                    />
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
                        required
                        rows={5}
                        defaultValue={project.description}
                        className='w-full rounded border border-gray-300 px-4 py-2'
                    />
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
                        required
                        defaultValue={project.technologies.join(', ')}
                        className='w-full rounded border border-gray-300 px-4 py-2'
                    />
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
                    defaultValue={project.year_completed ?? ''}
                    className='w-full rounded border border-gray-300 px-4 py-2'
                />
            </div>

                <div>
                    <label
                        htmlFor='type'
                        className='mb-2 block font-medium text-gray-900'
                    >
                        Type
                    </label>

                    <select
                        id='type'
                        name='type'
                        defaultValue={project.type}
                        className='w-full rounded border border-gray-300 px-4 py-2'
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
                        defaultValue={project.link ?? ''}
                        className='w-full rounded border border-gray-300 px-4 py-2'
                    />
                </div>

                <div className='flex gap-4'>
                    <button
                        type='submit'
                        className='rounded bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800'
                    >
                        Update Project
                    </button>

                    <Link
                        href='/projects'
                        className='rounded border border-gray-300 px-5 py-2'
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}