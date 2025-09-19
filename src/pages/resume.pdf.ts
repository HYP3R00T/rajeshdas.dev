import { readFileSync } from "fs";
import { resolve } from "path";

export async function GET() {
  const filePath = resolve("./public/resume.pdf");
  const file = readFileSync(filePath);
  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="resume.pdf"',
    },
  });
}
