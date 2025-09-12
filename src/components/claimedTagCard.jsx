import { sql } from "@/db";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { revalidatePath } from "next/cache";

export function ClaimedTagCard({ tag }) {
  return (
    <Card>
      <CardHeader>Tag {tag.id}</CardHeader>
      <CardContent>
        <form
          action={async function updateTagNotes(formData) {
            "use server";

            const notes = formData.get("notes");
            await sql`UPDATE tags SET notes = ${notes} WHERE id = ${tag.id} RETURNING *`;
            revalidatePath("/tags");
            revalidatePath(`/tags/${tag.id}`);
          }}
          className="flex flex-col items-start gap-4"
        >
          <Textarea name="notes" defaultValue={tag.notes} />
          <Button>Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
