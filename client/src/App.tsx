import { Switch, Route, Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { GameProvider } from '@/contexts/GameContext';

import WelcomePage from '@/pages/WelcomePage';
import DashboardPage from '@/pages/DashboardPage';
import ModulesPage from '@/pages/ModulesPage';
import SimulationPage from '@/pages/SimulationPage';
import AnalysisPage from '@/pages/AnalysisPage';
import LearningPage from '@/pages/LearningPage';
import ProfilePage from '@/pages/ProfilePage';
import AboutPage from '@/pages/AboutPage';
import NotFound from '@/pages/not-found';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Router hook={useHashLocation}>
          <Switch>
            <Route path="/" component={WelcomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/modules" component={ModulesPage} />
            <Route path="/simulation/:moduleId" component={SimulationPage} />
            <Route path="/analysis/:moduleId" component={AnalysisPage} />
            <Route path="/learning/:moduleId" component={LearningPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Toaster />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
