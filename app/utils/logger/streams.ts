import path from 'path';
import fs from 'fs';
import pino from 'pino';

const logsDir = path.join(__dirname, '../../', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'combined.log');

const logDestination = pino.destination({ dest: logFile, sync: true });

export { logDestination as destination };