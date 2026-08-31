import SkillCard from '@/components/SkillCard';

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                This about page shares more information about my background and work.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                <SkillCard
                    name="HTML & CSS"
                    description="I use HTML and CSS to create structured and responsive web pages."
                />

                <SkillCard
                    name="JavaScript"
                    description="I use JavaScript to add functionality and interactivity to web applications."
                />

                <SkillCard
                    name="React & Next.js"
                    description="I am learning React and Next.js to build modern full-stack web applications."
                />

                <SkillCard
                    name="Tailwind CSS"
                    description="I use Tailwind CSS utility classes to style responsive user interfaces."
                />
            </div>
            
        </main>
    );
}