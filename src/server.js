import app from "./app.js";
import { startCacheScheduler } from "./utils/cacheScheduler.js";

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startCacheScheduler();
});
