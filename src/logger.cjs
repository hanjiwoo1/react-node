const fs = require('fs');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, label } = format;

const logDir = `${appRoot}/logs`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "NODE_PROJECT" }), timestamp(), logFormat),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.log",
      maxSize: "20m",
      maxFiles: "30d",
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.error.log",
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],
});

if (process.env.NODE_ENV !== "prod") {
  logger.add(
    new transports.Console({
      format: combine(
        format.colorize(),
        format.simple()
      ),
    })
  );
}

module.exports = logger;