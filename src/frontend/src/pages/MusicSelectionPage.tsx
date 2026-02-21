import { useParams, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useProject } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Film } from 'lucide-react';
import MusicLibrary from '../components/MusicLibrary';

export default function MusicSelectionPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { identity, login } = useInternetIdentity();
  const { data: project, isLoading } = useProject(id);
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-24">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <Film className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold">Login Required</h2>
              <p className="text-muted-foreground">Please login to browse music</p>
            </div>
            <Button onClick={login} className="w-full">
              Login to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <Film className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold">Project Not Found</h2>
              <p className="text-muted-foreground">The project you're looking for doesn't exist</p>
            </div>
            <Button onClick={() => navigate({ to: '/projects' })} className="w-full">
              Back to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <MusicLibrary projectId={id} project={project} />
    </div>
  );
}
