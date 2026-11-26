import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const logFile = join(outputDir, "run.log");

function log(level: "INFO" | "ERROR", message: string): void {
  const line = `${new Date().toISOString()} [${level}] ${message}`;
  console.log(line);
  appendFileSync(logFile, line + "\n", "utf8");
}

try {
  log("INFO", `Run started (outputDir=${outputDir})`);

  const letter = "I quit: the retry loop retried my resignation 4,096 times and called it job security.";
  log("INFO", `Letter length: ${letter.length}`);
  if (letter.trim().length < 1 || letter.length > 140) {
    throw new Error("entry.txt must contain 1–140 characters");
  }

  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, letter, "utf8");
  log("INFO", `Wrote ${entryPath}`);
  log("INFO", "Run finished successfully");
} catch (err) {
  log("ERROR", err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
}
