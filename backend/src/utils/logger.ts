import winston from "winston";

const { combine, timestamp, splat, json, errors, simple } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    typeof errors === "function" ? errors({ stack: true }) : simple(),
    splat(),
    json()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
