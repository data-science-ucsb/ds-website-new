import Image from "next/image";

interface BoardProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export const BoardProfileCard = ({
  name,
  role,
  bio,
  imageUrl,
}: BoardProfileCardProps) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 shadow rounded-lg">
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
      <p className="text-sm text-gray-500">{role}</p>
      <p className="text-center text-gray-700 mt-2">{bio}</p>
    </div>
  );
};
