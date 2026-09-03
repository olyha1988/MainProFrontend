import MemberCard from "./MemberCard";

export default function MemberGrid({
    members = [],
}) {
    return (
        <div
            className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
            "
        >
            {members.map((member) => (
                <MemberCard
                    key={member._id}
                    member={member}
                />
            ))}
        </div>
    );
}