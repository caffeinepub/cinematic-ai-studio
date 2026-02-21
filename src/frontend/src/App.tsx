import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import ScriptEditorPage from './pages/ScriptEditorPage';
import VoiceoverPage from './pages/VoiceoverPage';
import SoundEffectsPage from './pages/SoundEffectsPage';
import MusicSelectionPage from './pages/MusicSelectionPage';
import GenerationStatusPage from './pages/GenerationStatusPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const createProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateProjectPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const scriptEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/script',
  component: ScriptEditorPage,
});

const voiceoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/voiceover',
  component: VoiceoverPage,
});

const soundEffectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/sound-effects',
  component: SoundEffectsPage,
});

const musicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/music',
  component: MusicSelectionPage,
});

const statusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/status',
  component: GenerationStatusPage,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$id/video',
  component: VideoPlayerPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createProjectRoute,
  projectsRoute,
  scriptEditorRoute,
  voiceoverRoute,
  soundEffectsRoute,
  musicRoute,
  statusRoute,
  videoRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
