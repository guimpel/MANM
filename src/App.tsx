
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { PrivateRoute } from "@/components/layout/PrivateRoute";
import { 
  publicRoutes, 
  aboutRoutes, 
  howItWorksRoutes, 
  serviceRoutes,
  fleetRoutes,
  providerRoutes,
  integratorRoutes,
  shopRoutes,
  adminRoutes
} from "@/lib/routes";
import { initializeApp } from "@/utils/appInitializer";

// Landing pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Auth from "@/pages/Auth";
import PlansPage from "@/pages/plans/PlansPage";

// Admin pages
import RouteVisualization from "@/pages/admin/RouteVisualization";

// Fleet pages
import { FleetDashboard } from "@/pages/fleet/FleetDashboard";
import { FleetServicesPage } from "@/pages/fleet/FleetServicesPage";
import { FleetServiceRequest } from "@/pages/fleet/FleetServiceRequest";
import { FleetFinancePage } from "@/pages/fleet/FleetFinancePage";
import { FleetHistory } from "@/pages/fleet/FleetHistory";
import { FleetAnalytics } from "@/pages/fleet/FleetAnalytics";
import FleetProfile from "@/pages/fleet/FleetProfile";
import { Layout } from "@/components/layout/Layout";

// Provider pages
import ProviderDashboard from "@/pages/ProviderDashboard";
import ProviderProfileCompletion from "@/pages/ProviderProfileCompletion";
import SurfaceDashboard from "@/pages/provider/SurfaceDashboard";
import ProviderRegistration from "@/pages/ProviderRegistration";

// Integrator pages
import IntegratorLogin from "@/pages/integrator/Login";
import IntegratorDashboard from "@/pages/integrator/Dashboard";
import IntegratorClients from "@/pages/integrator/Clients";
import IntegratorProviders from "@/pages/integrator/Providers";
import IntegratorFinancial from "@/pages/integrator/Financial";
import IntegratorFiscal from "@/pages/integrator/Fiscal";
import IntegratorResults from "@/pages/integrator/Results";
import IntegratorSettings from "@/pages/integrator/Settings";
import IntegratorUsers from "@/pages/integrator/Users";
import IntegratorAccounts from "@/pages/integrator/Accounts";
import IntegratorPlans from "@/pages/integrator/Plans";

// Service type pages
import MechanicalService from "@/pages/services/MechanicalService";
import ElectricalService from "@/pages/services/ElectricalService";
import { BodyworkService } from "@/pages/services/BodyworkService";
import { PaintingService } from "@/pages/services/PaintingService";
import TowingService from "@/pages/services/TowingService";
import { PartsService } from "@/pages/services/PartsService";

// Shop pages
import { QuotesPage } from "@/pages/shop/QuotesPage";
import { ServiceOrders } from "@/pages/shop/ServiceOrders";
import ShopFinance from "@/pages/shop/ShopFinance";
import ShopReports from "@/pages/shop/ShopReports";

// About pages
import AboutUs from "@/pages/about/AboutUs";
import History from "@/pages/about/History";
import Compliance from "@/pages/about/Compliance";
import HR from "@/pages/about/HR";

// How it works
import ForFleets from "@/pages/how-it-works/ForFleets";
import ForProviders from "@/pages/how-it-works/ForProviders";

// Others
import OnboardingDemo from "@/pages/OnboardingDemo";
import NotFound from "@/pages/NotFound";

// Legacy dashboard
import FrotistaDashboard from "@/pages/client/Dashboard";

function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path={publicRoutes.home.path} element={<Index />} />
        <Route path={publicRoutes.login.path} element={<Login />} />
        <Route path={publicRoutes.register.path} element={<Register />} />
        <Route path={publicRoutes.plans.path} element={<PlansPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path={aboutRoutes.aboutUs.path} element={<AboutUs />} />
        <Route path={aboutRoutes.history.path} element={<History />} />
        <Route path={aboutRoutes.compliance.path} element={<Compliance />} />
        <Route path={aboutRoutes.hr.path} element={<HR />} />
        <Route path={howItWorksRoutes.forFleets.path} element={<ForFleets />} />
        <Route path={howItWorksRoutes.forProviders.path} element={<ForProviders />} />
        <Route path="/demo" element={<OnboardingDemo />} />
        
        {/* Admin Routes */}
        <Route path={adminRoutes.routeVisualization.path} element={<RouteVisualization />} />

        {/* FIXED: Redirect /dashboard to correct user dashboard */}
        <Route path="/dashboard" element={<Navigate to={fleetRoutes.dashboard.path} replace />} />

        {/* Fleet Routes */}
        <Route element={<PrivateRoute requiredUserType="client" />}>
          <Route element={<Layout userRole="fleet" />}>
            <Route path={fleetRoutes.dashboard.path} element={<FleetDashboard />} />
            <Route path={fleetRoutes.services.path} element={<FleetServicesPage />} />
            <Route path={fleetRoutes.serviceRequest.path} element={<FleetServiceRequest />} />
            <Route path={fleetRoutes.finance.path} element={<FleetFinancePage />} />
            <Route path={fleetRoutes.history.path} element={<FleetHistory />} />
            <Route path={fleetRoutes.analytics.path} element={<FleetAnalytics />} />
            <Route path={fleetRoutes.profile.path} element={<FleetProfile />} />
            <Route path={fleetRoutes.legacyDashboard.path} element={<FrotistaDashboard />} />
          </Route>
        </Route>

        {/* Provider Routes */}
        <Route element={<PrivateRoute requiredUserType="provider" />}>
          <Route path={providerRoutes.dashboard.path} element={<ProviderDashboard />} />
          <Route path={providerRoutes.brazilDashboard.path} element={<ProviderDashboard />} />
          <Route path={providerRoutes.profileCompletion.path} element={<ProviderProfileCompletion />} />
          <Route path={providerRoutes.surface.path} element={<SurfaceDashboard />} />
        </Route>
        <Route path={publicRoutes.providerRegistration.path} element={<ProviderRegistration />} />

        {/* Integrator Routes */}
        <Route element={<PrivateRoute requiredUserType="integrator" />}>
          <Route path={integratorRoutes.dashboard.path} element={<IntegratorDashboard />} />
          <Route path={integratorRoutes.clients.path} element={<IntegratorClients />} />
          <Route path={integratorRoutes.providers.path} element={<IntegratorProviders />} />
          <Route path={integratorRoutes.financial.path} element={<IntegratorFinancial />} />
          <Route path={integratorRoutes.fiscal.path} element={<IntegratorFiscal />} />
          <Route path={integratorRoutes.results.path} element={<IntegratorResults />} />
          <Route path={integratorRoutes.settings.path} element={<IntegratorSettings />} />
          <Route path={integratorRoutes.users.path} element={<IntegratorUsers />} />
          <Route path={integratorRoutes.accounts.path} element={<IntegratorAccounts />} />
          <Route path={integratorRoutes.plans.path} element={<IntegratorPlans />} />
        </Route>
        <Route path={publicRoutes.integratorLogin.path} element={<IntegratorLogin />} />
        
        {/* Service Type Pages */}
        <Route path={serviceRoutes.mechanical.path} element={<MechanicalService />} />
        <Route path={serviceRoutes.electrical.path} element={<ElectricalService />} />
        <Route path={serviceRoutes.bodywork.path} element={<BodyworkService />} />
        <Route path={serviceRoutes.painting.path} element={<PaintingService />} />
        <Route path={serviceRoutes.towing.path} element={<TowingService />} />
        <Route path={serviceRoutes.parts.path} element={<PartsService />} />
        
        {/* Shop Pages */}
        <Route path={shopRoutes.quotes.path} element={<QuotesPage />} />
        <Route path={shopRoutes.serviceOrders.path} element={<ServiceOrders />} />
        <Route path={shopRoutes.finance.path} element={<ShopFinance />} />
        <Route path={shopRoutes.reports.path} element={<ShopReports />} />
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
