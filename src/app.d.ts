// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session as OGSession, DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session extends OGSession {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
