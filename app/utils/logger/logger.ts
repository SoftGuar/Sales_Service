
import pino from 'pino';
import { destination as streamsLogger } from './streams';

const appLogger = pino(
  {
    level: process.env.LOG_LEVEL || 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  },
  streamsLogger
);



export default appLogger;