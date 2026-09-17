export default function Loading() {
    return (
        <main className='mx-auto max-w-5xl animate-pulse p-8'>
            <div className='h-9 w-72 rounded bg-gray-200' />

            <div className='mt-3 h-5 w-full max-w-2xl rounded bg-gray-200' />

            <div className='mt-8 grid gap-6 md:grid-cols-2'>
                <div className='h-56 rounded bg-gray-200' />
                <div className='h-56 rounded bg-gray-200' />
            </div>
        </main>
    );
}