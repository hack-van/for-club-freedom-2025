// convex/convex.config.ts
import { defineApp } from "convex/server";
import r2 from "@convex-dev/r2/convex.config";
import migration from "@convex-dev/migrations/convex.config";

const app = defineApp();
app.use(r2);
app.use(migration);

export default app;
