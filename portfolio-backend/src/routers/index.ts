import { z } from "zod";
import { publicProcedure, router } from "../trpc";

/**
 * Server Router Configuration
 *
 * This module defines the TRPC router for the portfolio application.
 * Following SOLID principles:
 * - Single Responsibility: Router only handles API route definitions
 * - Open/Closed: Easy to extend with new routes without modifying existing ones
 */

const authRouter = router({
  me: publicProcedure.query(() => {
    return null;
  }),
  logout: publicProcedure.mutation(() => {
    return { success: true };
  }),
});

const projects = [
  {
    id: "smart-logistics",
    title: "Smart Logistics",
    description: "Supply Chain Visibility, Exceptions & Purchasing",
  },
  {
    id: "smart-farmer",
    title: "Smart Farmer",
    description: "Connected Agriculture, Livestock & Rural Commerce",
  },
  {
    id: "sap-btp-ai-hub",
    title: "Learning Hub",
    description: "Enterprise AI Education Platform",
  },
  {
    id: "smart-factory",
    title: "Smart Factory",
    description: "Interactive Digital Twins, Industrial Networks & Operations",
  },
];

export const appRouter = router({
  auth: authRouter,

  health: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),

  projects: publicProcedure.query(() => {
    return { projects };
  }),

  getProject: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }: { input: { id: string } }) => {
      const id =
        input.id === "imsop" ? "smart-logistics" :
        input.id === "smart-factory-iot" ? "smart-factory" : input.id;
      return projects.find(project => project.id === id) ?? null;
    }),
});

export type AppRouter = typeof appRouter;
