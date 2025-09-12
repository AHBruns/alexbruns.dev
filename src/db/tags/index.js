import { sql } from "@/db";

export async function getTags({ orgId }) {
  return await sql`SELECT * FROM tags WHERE organization_id = ${orgId}`;
}
