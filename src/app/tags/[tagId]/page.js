import { sql } from "@/db";
import * as uuid from "uuid";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { tagId } = await params;

  if (!uuid.validate(tagId)) {
    notFound();
  }

  const savedTag = (await sql`SELECT * FROM tags WHERE id = ${tagId}`).at(0);

  const tag = savedTag ?? { id: tagId };

  return (
    <div>
      <pre>{JSON.stringify(tag, null, 2)}</pre>
    </div>
  );
}
