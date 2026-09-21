'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@/lib/projects-db';

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters.'),
    description: z
        .string()
        .min(20, 'Description must be at least 20 characters.'),
    technologies: z
        .string()
        .min(2, 'Add at least one technology.'),
    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(
            currentYear,
            `Year cannot be greater than ${currentYear}.`
        ),
    type: z.enum(['opensource', 'school']),
    link: z.string().optional(),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
        type?: string[];
        link?: string[];
    };
    message?: string | null;
};

export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = CreateProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type'),
        link: formData.get('link'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const {
        title,
        description,
        technologies,
        yearCompleted,
        type,
        link,
    } = validatedFields.data;

    const technologyList = technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);

    try {
        await sql`
            INSERT INTO projects (
                title,
                description,
                type,
                technologies,
                link,
                year_completed
            )
            VALUES (
                ${title},
                ${description},
                ${type},
                ${technologyList},
                ${link || null},
                ${yearCompleted}
            )
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create project.',
        };
    }

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        type: formData.get('type'),
        link: formData.get('link'),
    };

    const parsed = CreateProjectSchema.safeParse({
        ...raw,
        yearCompleted: formData.get('yearCompleted'),
    });

    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const {
        title,
        description,
        technologies,
        yearCompleted,
        type,
        link,
    } = parsed.data;

    const technologyList = technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);

    await sql`
        UPDATE projects
        SET
            title = ${title},
            description = ${description},
            type = ${type},
            technologies = ${technologyList},
            link = ${link || null},
            year_completed = ${yearCompleted}
        WHERE id = ${id}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: string) {
    await sql`
        DELETE FROM projects
        WHERE id = ${id}
    `;

    revalidatePath('/projects');
}