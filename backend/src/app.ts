import express from 'express';
import authRoutes from './routes/auth.routes';


const app = express();
app.use(express.json());


app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello, World!' });
});

app.use("/api/auth", authRoutes);

export default app;