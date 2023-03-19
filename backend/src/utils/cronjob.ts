import cron from 'node-cron';
import BlacklistToken from '../models/blacklistToken';
// import { connectDb } from './db';

const removeExpiredTokens = async () => {
//   await connectDb();
  await BlacklistToken.deleteMany({ expiresAt: { $lt: new Date() } });
  console.log('Expired tokens have been removed from the blacklist.');
};

cron.schedule('0 0 * * *', removeExpiredTokens);

export default removeExpiredTokens
