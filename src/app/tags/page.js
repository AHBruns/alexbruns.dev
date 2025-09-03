import { getTags } from "@/db/tags";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  await auth.protect();

  const tags = await getTags();

  return (
    <div className="h-full px-12 py-8 flex flex-col gap-4">
      <p class="text-gray-800 text-xl font-semibold">Tags</p>
      <table className="border border-gray-300 divide-y divide-gray-300 rounded-md grid grid-cols-2 shadow-2xl text-gray-800">
        <thead className="grid grid-cols-subgrid col-span-full">
          <tr className="divide-x divide-gray-300 grid grid-cols-subgrid col-span-full">
            <th class="p-1">ID</th>
            <th />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 grid grid-cols-subgrid col-span-full text-sm">
          {tags.map((tag) => (
            <tr
              key={tag.id}
              className="divide-x divide-gray-300 grid grid-cols-subgrid col-span-full"
            >
              <td class="p-1">{tag.id}</td>
              <td class="p-1">
                <Link href={`/tags/${tag.id}`} className="underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
