// middleware.js
export const auth = (req, res, next) => {
  // Add your authentication logic here
  // For example:
  // if (req.isAuthenticated()) {
  //   return next();
  // }
  // return res.status(401).send('Unauthorized');
};

// next-middlewares.js
import nextConnect from 'next-connect';
import { auth } from './middleware';

const middleware = nextConnect();

middleware.use(auth);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export default middleware;

