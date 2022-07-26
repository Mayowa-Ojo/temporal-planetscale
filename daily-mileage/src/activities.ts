import type {Connection} from "mysql2";

export const createActivities = (db: Connection) => ({
   async addMileage(mileage: number): Promise<void> {
      try {
         const query = `INSERT INTO cars (mileage) VALUES (?);`;

         await db.promise().query(query, [mileage]);
      } catch (error) {
         console.error(error);
      }
   },

   async getDailyMileage(): Promise<any> {
      try {
         const query = `SELECT * FROM cars WHERE clocked_at BETWEEN ? AND ?`;
         const now = new Date()
         const dayStart = `${now.getFullYear()}-${now.getMonth()+1}-${now.getUTCDate()} 00:00:01`;
         const dayEnd = `${now.getFullYear()}-${now.getMonth()+1}-${now.getUTCDate()} 23:59:59`;
         const [rows] = await db.promise().query(query, [dayStart, dayEnd]);
         return rows;
      } catch (error) {
         console.error(error);
      }
   },
});
