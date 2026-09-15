import { getProjects, Project } from '@/lib/projects-db';

export default async function OpenSourceProjectsPage() {
    const projects: Project[] = await getProjects('opensource');

    return (
        <main className='mx-auto max-w-5xl p-8'>
            <h1 className='text-3xl font-bold'>Open Source Projects</h1>

            <p className='mt-3 text-gray-600'>
                Here are the open source contributions I have worked on.
            </p>

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
        </main>
    );
}
