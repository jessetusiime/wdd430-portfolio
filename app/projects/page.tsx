import Link from 'next/link';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import { deleteProject } from '@/app/lib/actions';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';

export default async function ProjectsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;

    const query = searchParams?.query || '';

    const pageValue = Number(searchParams?.page);

    const currentPage =
        Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

    const projects = await fetchFilteredProjects(query, currentPage);

    const totalPages = await fetchProjectsPages(query);

    return (
        <main className='mx-auto max-w-5xl p-8'>
            <h1 className='text-3xl font-bold'>Projects Overview</h1>

            <p className='mt-3 text-gray-600'>
                Here are some of the projects I have worked on.
            </p>

            <Link
                href='/projects/create'
                className='mt-4 inline-block rounded bg-blue-700 px-5 py-2 font-medium text-white'
            >
                Create Project
            </Link>

            <ProjectSearch />

            <div className='mt-8 grid gap-6 md:grid-cols-2'>
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className='border border-gray-200 bg-white p-6 shadow-sm'
                    >
                        <h2 className='text-xl font-semibold text-gray-900'>
                            {project.title}
                        </h2>

                        <p className='mt-3 text-gray-600'>
                            {project.description}
                        </p>

                        <p className='mt-4 text-sm text-gray-700'>
                            <span className='font-semibold'>Type:</span>{' '}
                            {project.type}
                        </p>

                        <p className='mt-2 text-sm text-gray-700'>
                            <span className='font-semibold'>
                                Technologies:
                            </span>{' '}
                            {project.technologies.join(', ')}
                        </p>

                        <p className='mt-2 text-sm text-gray-700'>
                        <span className='font-semibold'>Year Completed:</span>{' '}
                        {project.year_completed ?? 'Not specified'}
                    </p>

                        {project.link && (
                            <a
                                href={project.link}
                                className='mt-4 inline-block font-medium text-blue-700 hover:underline'
                            >
                                View Project
                            </a>
                        )}

                        <div className='mt-6 flex gap-3'>
                            <Link
                                href={`/projects/${project.id}/edit`}
                                className='rounded border border-gray-300 px-4 py-2 text-sm font-medium'
                            >
                                Edit
                            </Link>

                            <form
                                action={deleteProject.bind(
                                    null,
                                    project.id.toString()
                                )}
                            >
                                <button
                                    type='submit'
                                    className='rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </article>
                ))}
            </div>

            <Pagination totalPages={totalPages} />
        </main>
    );
}