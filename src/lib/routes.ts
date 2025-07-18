
// Route configuration for the application
// This file acts as a single source of truth for all routes

interface RouteConfig {
  path: string;
  title: string;
  requiresAuth?: boolean;
  userType?: 'client' | 'provider' | 'integrator' | 'any';
}

interface RouteGroup {
  name: string;
  routes: Record<string, RouteConfig>;
}

// Public routes
export const publicRoutes: Record<string, RouteConfig> = {
  home: { path: '/', title: 'Home' },
  login: { path: '/login', title: 'Login' },
  register: { path: '/register', title: 'Register' },
  plans: { path: '/plans', title: 'Plans & Pricing' },
  integratorLogin: { path: '/integrator/login', title: 'Integrator Login' },
  providerRegistration: { path: '/provider/registration', title: 'Provider Registration' },
};

// Admin routes
export const adminRoutes: Record<string, RouteConfig> = {
  routeVisualization: { 
    path: '/admin/routes', 
    title: 'Route Visualization',
  },
};

// About section routes
export const aboutRoutes: Record<string, RouteConfig> = {
  aboutUs: { path: '/about', title: 'About Us' },
  history: { path: '/about/history', title: 'Our History' },
  compliance: { path: '/about/compliance', title: 'Compliance' },
  hr: { path: '/about/hr', title: 'Human Resources' },
};

// How it works section routes
export const howItWorksRoutes: Record<string, RouteConfig> = {
  forFleets: { path: '/how-it-works/fleets', title: 'For Fleet Managers' },
  forProviders: { path: '/how-it-works/providers', title: 'For Service Providers' },
};

// Service types routes
export const serviceRoutes: Record<string, RouteConfig> = {
  mechanical: { path: '/services/mechanical', title: 'Mechanical Services' },
  electrical: { path: '/services/electrical', title: 'Electrical Services' },
  bodywork: { path: '/services/bodywork', title: 'Bodywork Services' },
  painting: { path: '/services/painting', title: 'Painting Services' },
  towing: { path: '/services/towing', title: 'Towing Services' },
  parts: { path: '/services/parts', title: 'Parts & Components' },
};

// Fleet (Client) routes
export const fleetRoutes: Record<string, RouteConfig> = {
  dashboard: { 
    path: '/fleet-dashboard', 
    title: 'Fleet Dashboard',
    requiresAuth: true,
    userType: 'client'
  },
  legacyDashboard: { 
    path: '/frotista/dashboard', 
    title: 'Frotista Dashboard',
    requiresAuth: true,
    userType: 'client'
  },
  services: { 
    path: '/fleet-services', 
    title: 'Fleet Services',
    requiresAuth: true,
    userType: 'client'
  },
  serviceRequest: { 
    path: '/fleet-service-request', 
    title: 'Request Service',
    requiresAuth: true,
    userType: 'client'
  },
  finance: { 
    path: '/fleet-finance', 
    title: 'Fleet Finances',
    requiresAuth: true,
    userType: 'client'
  },
  history: { 
    path: '/fleet-history', 
    title: 'Service History',
    requiresAuth: true,
    userType: 'client'
  },
  analytics: { 
    path: '/fleet-analytics', 
    title: 'Fleet Analytics',
    requiresAuth: true,
    userType: 'client'
  },
  profile: { 
    path: '/fleet-profile', 
    title: 'Fleet Profile',
    requiresAuth: true,
    userType: 'client'
  },
};

// Provider routes
export const providerRoutes: Record<string, RouteConfig> = {
  dashboard: { 
    path: '/provider/dashboard', 
    title: 'Provider Dashboard',
    requiresAuth: true,
    userType: 'provider'
  },
  brazilDashboard: { 
    path: '/fornecedor/dashboard', 
    title: 'Fornecedor Dashboard',
    requiresAuth: true,
    userType: 'provider'
  },
  profileCompletion: { 
    path: '/provider/profile-completion', 
    title: 'Complete Profile',
    requiresAuth: true,
    userType: 'provider'
  },
  surface: { 
    path: '/provider/surface', 
    title: 'Surface Dashboard',
    requiresAuth: true,
    userType: 'provider'
  },
};

// Integrator routes
export const integratorRoutes: Record<string, RouteConfig> = {
  dashboard: { 
    path: '/integrator/dashboard', 
    title: 'Dashboard',
    requiresAuth: true,
    userType: 'integrator'
  },
  clients: { 
    path: '/integrator/clients', 
    title: 'Clients',
    requiresAuth: true,
    userType: 'integrator'
  },
  providers: { 
    path: '/integrator/providers', 
    title: 'Providers',
    requiresAuth: true,
    userType: 'integrator'
  },
  financial: { 
    path: '/integrator/financial', 
    title: 'Financial',
    requiresAuth: true,
    userType: 'integrator'
  },
  fiscal: { 
    path: '/integrator/fiscal', 
    title: 'Fiscal',
    requiresAuth: true,
    userType: 'integrator'
  },
  results: { 
    path: '/integrator/results', 
    title: 'Results',
    requiresAuth: true,
    userType: 'integrator'
  },
  settings: { 
    path: '/integrator/settings', 
    title: 'Settings',
    requiresAuth: true,
    userType: 'integrator'
  },
  users: { 
    path: '/integrator/users', 
    title: 'Users',
    requiresAuth: true,
    userType: 'integrator'
  },
  accounts: { 
    path: '/integrator/accounts', 
    title: 'Accounts',
    requiresAuth: true,
    userType: 'integrator'
  },
  plans: { 
    path: '/integrator/plans', 
    title: 'Plans',
    requiresAuth: true,
    userType: 'integrator'
  },
};

// Shop routes
export const shopRoutes: Record<string, RouteConfig> = {
  quotes: { 
    path: '/shop/quotes', 
    title: 'Quotes',
    requiresAuth: true,
    userType: 'provider'
  },
  serviceOrders: { 
    path: '/shop/service-orders', 
    title: 'Service Orders',
    requiresAuth: true,
    userType: 'provider'
  },
  finance: { 
    path: '/shop/finance', 
    title: 'Finance',
    requiresAuth: true,
    userType: 'provider'
  },
  reports: { 
    path: '/shop/reports', 
    title: 'Reports',
    requiresAuth: true,
    userType: 'provider'
  },
};

// All routes grouped by category
export const routeGroups: Record<string, RouteGroup> = {
  public: { 
    name: 'Public Pages',
    routes: publicRoutes
  },
  admin: {
    name: 'Admin',
    routes: adminRoutes
  },
  about: {
    name: 'About',
    routes: aboutRoutes
  },
  howItWorks: {
    name: 'How It Works',
    routes: howItWorksRoutes
  },
  services: {
    name: 'Services',
    routes: serviceRoutes
  },
  fleet: {
    name: 'Fleet Management',
    routes: fleetRoutes
  },
  provider: {
    name: 'Provider Portal',
    routes: providerRoutes
  },
  integrator: {
    name: 'Integrator Portal',
    routes: integratorRoutes
  },
  shop: {
    name: 'Shop Management',
    routes: shopRoutes
  },
};

// Helper function to get route by path
export function getRouteByPath(path: string): RouteConfig | undefined {
  // Search through all route groups
  for (const groupKey in routeGroups) {
    const group = routeGroups[groupKey];
    for (const routeKey in group.routes) {
      const route = group.routes[routeKey];
      if (route.path === path) {
        return route;
      }
    }
  }
  return undefined;
}

// All routes flattened into a single object for easy lookup
export const allRoutes = {
  ...publicRoutes,
  ...adminRoutes,
  ...aboutRoutes,
  ...howItWorksRoutes,
  ...serviceRoutes,
  ...fleetRoutes,
  ...providerRoutes,
  ...integratorRoutes,
  ...shopRoutes,
};
