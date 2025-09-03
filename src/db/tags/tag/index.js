import { sql } from "@/db";

export async function getTag(tagId) {
  const results = await sql`SELECT * FROM tags WHERE id = ${tagId}`;
  return results.at(0);
}
