import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
    return (
        <main className='mx-auto max-w-3xl p-8'>
            <h1 className='text-3xl font-bold'>Create Project</h1>

            <p className='mt-3 text-gray-600'>
                Add a new project to your portfolio.
            </p>

            <div className='mt-8'>
                <CreateProjectForm />
            </div>
        </main>
    );
}