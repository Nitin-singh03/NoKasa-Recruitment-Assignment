import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import v1Routes from './routes/v1.js';
import v2Routes from './routes/v2.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

const app = express();

// Security & parsing middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging: morgan for HTTP access (stream to winston)
app.use(morgan('combined', { stream: { write: (msg) => logger.http(msg.trim()) } }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '15') * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Health
app.get('/health', (req, res) => res.json({ success: true, message: 'OK' }));

// API routes
app.use('/v1', v1Routes);
app.use('/v2', v2Routes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
