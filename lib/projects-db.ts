import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string | null; 
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type) {
        const projects = await sql`SELECT * FROM projects WHERE type = ${type}` as Project[];
        return projects;
    }

    const allProjects = await sql`SELECT * FROM projects` as Project[];
    return allProjects;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const projects = await sql`SELECT * FROM projects WHERE id = ${id}` as Project[];
    return projects[0] ?? null;
}
