import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-md px-6">
            <nav className="max-w-4xl mx-auto flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">
                    Tusiime Jesse
                </div>
                <ul className="flex gap-6">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/projects" className="hover:underline">Projects</Link></li>
                </ul>
            </nav>
        </header>

    );
}