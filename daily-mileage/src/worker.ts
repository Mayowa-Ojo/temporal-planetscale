import { Worker } from "@temporalio/worker";
import { createActivities } from "./activities";
import db from "./db";

async function run() {
   const worker = await Worker.create({
      workflowsPath: require.resolve("./workflows"),
      activities: createActivities(db),
      taskQueue: "daily-mileage",
   });
   await worker.run();
}

run().catch((err) => {
   console.error(err);
   process.exit(1);
});
