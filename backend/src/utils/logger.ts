import winston from "winston";

const { combine, timestamp, splat, json, errors } = winston.format as any;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    typeof errors === "function" ? errors({ stack: true }) : winston.format.simple,
    splat,
    json
  ),
  transports: [new winston.transports.Console()],
});
export default logger;