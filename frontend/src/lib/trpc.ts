import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@portfolio/backend/router";

export const trpc = createTRPCReact<AppRouter>();
