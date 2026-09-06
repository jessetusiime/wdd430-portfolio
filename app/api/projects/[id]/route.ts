import { getProjectById } from '@/lib/projects-db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const projectId = Number(id);

    if (Number.isNaN(projectId)) {
        return Response.json(
            { error: 'Invalid project ID' },
            { status: 400 }
        );
    }

    const project = getProjectById(projectId);

    if (!project) {
        return Response.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    }

    return Response.json(project);
}