import Image from "next/image";

interface BoardProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn: string;
}

export const BoardProfileCard = ({
  name,
  role,
  bio,
  imageUrl,
  linkedIn,
}: BoardProfileCardProps) => {
  return (
    <a href={linkedIn} target="_blank">
      <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 hover:text-stone-50 duration-300">
      <div className="w-48 h-48 relative overflow-hidden rounded-full mb-2">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover"}}
          className="rounded-full"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="text-sm">{role}</p>
      <p className="text-center mt-2">{bio}</p>
      </div>
    </a>
  );
};
