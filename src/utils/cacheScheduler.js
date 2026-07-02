import cron from "node-cron";
import { refreshParkingCache } from "../services/parkingService.js";

export function startCacheScheduler() {
  cron.schedule("0 3 * * *", async () => {
    try {
      const result = await refreshParkingCache();

      console.log(
        `[CACHE] 주차장 캐시 갱신 완료: ${result.totalCount}개 / ${result.refreshedAt.toISOString()}`,
      );
    } catch (error) {
      console.error("[CACHE] 주차장 캐시 갱신 실패:", error.message);
    }
  });
}
