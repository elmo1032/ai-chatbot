// Importing the named exports 'GET' and 'POST' from '@/auth' module.
// These could be functions or objects related to authentication for HTTP requests.
export { GET, POST } from '@/auth'

// Setting the runtime environment to 'edge'. This indicates that the function will be executed in an edge runtime environment,
// which is designed to provide low-latency and high-performance for serverless functions.
export const runtime = 'edge'

