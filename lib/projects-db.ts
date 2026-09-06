export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'A personal portfolio website built with Next.js and Tailwind CSS.',
        type: 'school',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        id: 2,
        title: 'Open Source Contribution',
        description: 'A contribution to an open source project.',
        type: 'opensource',
        technologies: ['JavaScript', 'Git', 'GitHub'],
        link: 'https://github.com/',
    },
    {
        id: 3,
        title: 'Database Design Project',
        description: 'A database design project created as part of my coursework.',
        type: 'school',
        technologies: ['PostgreSQL', 'SQL'],
    },
];

export function getProjects(type?: string | null): Project[] {
    if (type) {
        return projects.filter((project) => project.type === type);
    }

    return projects;
}

export function getProjectById(id: number): Project | null {
    return projects.find((project) => project.id === id) ?? null;
}