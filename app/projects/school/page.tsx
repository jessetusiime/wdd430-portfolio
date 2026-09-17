import { Suspense } from 'react';
import SchoolProjectList from '@/components/SchoolProjectList';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';

export default function SchoolProjectsPage() {
    return (
        <main className='mx-auto max-w-5xl p-8'>
            <h1 className='text-3xl font-bold'>School Projects</h1>

            <p className='mt-3 text-gray-600'>
                These are some of the projects I have completed as part of my studies.
            </p>

            <Suspense fallback={<ProjectCardSkeleton />}>
                <SchoolProjectList />
            </Suspense>
        </main>
    );
}