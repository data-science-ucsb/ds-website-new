import Link from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg text-gray-600 mb-4">
        Could not find the requested resource
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
