import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import routes from './routes';
import { errorHandler } from '$middleware/error-handler';
import { authMiddleware } from '$middleware/auth.middleware';

export const app: Express = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors({
  origin: true,
  credentials: true,
}));

// Enable cookies
app.use(cookieParser());

// Authentication middleware (applies to all /api routes)
app.use('/api', authMiddleware);

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Must be registered AFTER all routes
app.use(errorHandler);
