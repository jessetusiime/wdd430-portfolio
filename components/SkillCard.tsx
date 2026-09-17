interface SkillCardProps {
    name: string;
    description: string;
}

export default function SkillCard({ name, description }: SkillCardProps) {
    return (
        <div className="p-4 bg-gray-50 rounded">
            <h3 className="mb-2 text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}