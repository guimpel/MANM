
import { validateAllRoutes } from './routeValidator';

/**
 * Initialize the application
 * This function runs when the app starts and performs initial setup
 */
export function initializeApp(): void {
  console.log('🚀 Initializing IMOVAN application...');
  
  // Validate routes in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Running route validation...');
    validateAllRoutes();
  }
  
  // Set up global error handling
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
  
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
  
  console.log('✅ Application initialized successfully');
}
