"use server";

import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Card, CardAction, CardContent, CardHeader } from "./ui/card";
import { sql } from "@/db";
import { revalidatePath } from "next/cache";

export async function UnclaimedTagCard({ tagId }) {
  const session = await auth();

  return (
    <Card>
      <CardHeader>Unclaimed Tag</CardHeader>
      <CardContent>
        {session.orgId ? (
          <>
            This tag has not yet been claimed in the system. Would you like to
            claim it?
          </>
        ) : (
          <>
            This tag has not yet been claimed in the system. To claim this tag
            please first sign-in.
          </>
        )}
      </CardContent>
      <CardAction>
        {session.orgId ? (
          <form
            action={async function claimTag() {
              "use server";

              const { orgId } = await auth();
              await sql`INSERT INTO tags (id, organization_id) VALUES (${tagId}, ${orgId}) RETURNING *`;
              revalidatePath("/tags");
              revalidatePath(`/tags/${tagId}`);
            }}
          >
            <Button>Claim Tag</Button>
          </form>
        ) : (
          <SignInButton />
        )}
      </CardAction>
    </Card>
  );
}
