import { getTags } from "@/db/tags";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const [{ orgId }, _] = await Promise.all([auth(), auth.protect()]);

  const tags = await getTags({ orgId });

  return (
    <div className="h-full px-12 py-8">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Organization ID</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>{tag.id}</TableCell>
                  <TableCell>{tag.organization_id}</TableCell>
                  <TableCell>{tag.notes}</TableCell>
                  <TableCell>
                    <Button asChild variant="link" size="sm">
                      <Link href={`/tags/${tag.id}`} className="underline">
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
