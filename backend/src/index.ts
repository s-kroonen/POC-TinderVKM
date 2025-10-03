import { createApp } from "./app.js";
import config from "./config/index.js";
import logger from "./utils/logger.js";
(async () => {
  const app = await createApp();
  app.listen(config.port, () => {
    logger.info(`Server listening on ${config.port}`);
  });
})();
