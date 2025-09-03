import { sql } from "@/db";
import { getTag } from "@/db/tags/tag";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { tagId } = await params;
  const [{ userId }, maybeTag] = await Promise.all([auth(), getTag(tagId)]);

  if (!maybeTag && !userId) {
    notFound();
  }

  async function claimTag() {
    "use server";
    await auth.protect();
    await sql`INSERT INTO tags (id) VALUES (${tagId}) RETURNING *`;
    revalidatePath("/tags");
    revalidatePath(`/tags/${tagId}`);
  }

  return (
    <div className="h-full px-12 py-8">
      {maybeTag ? (
        <>
          <p>Tag</p>
          <pre>{JSON.stringify(maybeTag, null, 2)}</pre>
        </>
      ) : (
        <div className="flex flex-col items-start gap-4 p-4 border border-gray-300 rounded-lg shadow-2xl">
          <p>This tag does not yet exist. Would you like to claim it?</p>
          <button
            onClick={claimTag}
            className="bg-gray-900 text-white rounded-md px-3 py-1 cursor-pointer"
          >
            Claim Tag
          </button>
        </div>
      )}
    </div>
  );
}
