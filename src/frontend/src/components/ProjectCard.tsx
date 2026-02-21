import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { VideoProject } from '../backend';

interface ProjectCardProps {
  project: VideoProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDuration = (seconds: bigint) => {
    const totalSeconds = Number(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'generating':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'draft':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getNavigationPath = () => {
    if (project.status === 'completed') {
      return `/project/${project.id}/video`;
    } else if (project.status === 'generating') {
      return `/project/${project.id}/status`;
    } else {
      return `/project/${project.id}/script`;
    }
  };

  return (
    <Link to={getNavigationPath()}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-teal/20 to-gold/20 relative overflow-hidden">
          <img
            src={project.thumbnail || '/assets/generated/project-thumb.dim_320x180.png'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
          </div>
        </div>
        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-serif font-bold text-foreground line-clamp-2 group-hover:text-teal transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.concept}</p>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDuration(project.length)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
