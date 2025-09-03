import { sql } from "@/db";

export async function getTags() {
  return await sql`SELECT * FROM tags`;
}
