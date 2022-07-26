import { proxyActivities } from "@temporalio/workflow";
import type { createActivities } from "./activities";

const { addMileage, getDailyMileage } = proxyActivities<
   ReturnType<typeof createActivities>
>({
   startToCloseTimeout: "30 seconds",
});

export async function getTotalMileage(): Promise<number> {
   // add two entries to the DB
   await addMileage(185);
   await addMileage(200);

   const cars = await getDailyMileage();
   const totalMileage = cars.reduce(
      (acc: number, next: Record<string, any>) => acc + next.mileage,
      0,
   );

   return totalMileage;
}
