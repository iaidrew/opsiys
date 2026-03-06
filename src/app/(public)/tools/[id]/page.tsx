import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ToolPageProps {
  params: { id: string };
}

export default async function ToolPage({ params }: ToolPageProps) {

  const ref = doc(db, "aiTools", params.id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return <div className="p-20">Tool not found</div>;
  }

  const tool = snap.data();

  return (
    <div className="min-h-screen px-6 py-28">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-black mb-6">
          {tool.name}
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          {tool.description}
        </p>

        <a
          href={tool.website}
          target="_blank"
          className="inline-block px-8 py-4 bg-red-500 rounded-xl"
        >
          Visit Tool
        </a>

      </div>

    </div>
  );
}