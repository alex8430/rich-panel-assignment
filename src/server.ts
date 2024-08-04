import Logger from './utils/Logger';
import { port } from './config/config';
import app from './app';

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
