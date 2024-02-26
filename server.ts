import * as dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const port = process.env.PORT || 3111;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
