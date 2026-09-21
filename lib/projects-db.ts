import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string | null;
    year_completed: number | null;
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

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(
    query: string,
    currentPage: number
): Promise<Project[]> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const searchTerm = `%${query}%`;

    const projects = await sql`
        SELECT *
        FROM projects
        WHERE
            title ILIKE ${searchTerm}
            OR description ILIKE ${searchTerm}
            OR EXISTS (
                SELECT 1
                FROM unnest(technologies) AS technology
                WHERE technology ILIKE ${searchTerm}
            )
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
    ` as Project[];

    return projects;
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const searchTerm = `%${query}%`;

    const result = await sql`
        SELECT COUNT(*) AS count
        FROM projects
        WHERE
            title ILIKE ${searchTerm}
            OR description ILIKE ${searchTerm}
            OR EXISTS (
                SELECT 1
                FROM unnest(technologies) AS technology
                WHERE technology ILIKE ${searchTerm}
            )
    ` as { count: string }[];

    const count = Number(result[0]?.count ?? 0);

    return Math.ceil(count / ITEMS_PER_PAGE);
}