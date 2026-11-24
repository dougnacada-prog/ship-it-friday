// Ship It Friday — make.fun entry.
// The program writes one funny git commit message — the line an AI coding
// agent writes right before breaking production on a Friday — to the file
// the judge reads. The line is the whole entry: a single line of 67
// characters, and nothing else is written to the file.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "feat: Friday deploy, replaced the payment system with a Google Form";

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 159 characters
// and not only white space. An entry that would fail it is refused here,
// before anything is written, so the file never holds an invalid entry.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 159) {
    throw new Error(`entry fails the gate: ${chars} characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry fails the gate: only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry fails the gate: not a single line");
  }
}

// ENTRY_OUTPUT overrides the default path when the grader sets it,
// otherwise the entry goes to /output/entry.txt.
function saveEntry(): void {
  validateEntry(LINE);
  const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

saveEntry();
