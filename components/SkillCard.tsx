interface SkillCardProps {
    name: string;
    description: string;
}

export default function SkillCard({ name, description }: SkillCardProps) {
    return (
        <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}