import { ClaimedTagCard } from "@/components/claimedTagCard";
import { UnclaimedTagCard } from "@/components/unclaimedTagCard";
import { sql } from "@/db";

export default async function Page({ params }) {
  const { tagId } = await params;
  const tag = await getTag(tagId);

  return (
    <div className="h-full px-12 py-8">
      {tag ? <ClaimedTagCard tag={tag} /> : <UnclaimedTagCard tagId={tagId} />}
    </div>
  );
}

async function getTag(tagId) {
  const results = await sql`SELECT * FROM tags WHERE id = ${tagId}`;
  return results.at(0);
}
