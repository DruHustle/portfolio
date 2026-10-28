import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * TRPC Server Configuration
 * 
 * This module initializes the TRPC server and provides base procedures.
 * Following SOLID principles:
 * - Single Responsibility: Only handles TRPC initialization
 * - Open/Closed: Easy to extend with middleware and context
 */

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
