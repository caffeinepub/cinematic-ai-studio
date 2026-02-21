import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useProjects } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Film, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const { identity, login } = useInternetIdentity();
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState<string>('all');

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-24">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <Film className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold">Login Required</h2>
              <p className="text-muted-foreground">Please login to view your projects</p>
            </div>
            <Button onClick={login} className="w-full">
              Login to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredProjects =
    filter === 'all' ? projects || [] : (projects || []).filter((p) => p.status === filter);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage and track your video projects</p>
        </div>
        <Link to="/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="generating">Generating</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-4">
            <Film className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold">No projects found</h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'Create your first project to get started' : `No ${filter} projects yet`}
              </p>
            </div>
            {filter === 'all' && (
              <Link to="/create">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Project
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
