import type { ZodIssue } from "zod";

export function parseZodError(issues: ZodIssue[]) {
  return issues
    .filter(
      (issues) => !(issues.path[0] === "questions" && (issues.path[1] ?? 0 > 1))
    )
    .map((issue) => `${issue.path[0]}: ${issue.message}`);
}
