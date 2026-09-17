import ProjectSearch from '@/components/ProjectSearch';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import Pagination from '@/components/Pagination';

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
                            <span className='font-semibold'>Technologies:</span>{' '}
                            {project.technologies.join(', ')}
                        </p>

                        {project.link && (
                            <a
                                href={project.link}
                                className='mt-4 inline-block font-medium text-blue-700 hover:underline'
                            >
                                View Project
                            </a>
                        )}
                    </article>
                ))}
            </div>

            <Pagination totalPages={totalPages} />
        </main>
    );
}