interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export default async function OpenSourceProjectsPage() {
    const response = await fetch(
        'http://localhost:3000/api/projects?type=opensource'
    );

    const projects: Project[] = await response.json();

    return (
        <main className='mx-auto max-w-5xl p-8'>
            <h1 className='text-3xl font-bold'>Open Source Projects</h1>

            <p className='mt-3 text-gray-600'>
                These are some of the open source projects I have worked on.
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