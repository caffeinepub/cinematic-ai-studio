import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Clock, Calendar, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoProject } from '../backend';

interface VideoPlayerProps {
  projectId: string;
  project: VideoProject;
}

export default function VideoPlayer({ projectId, project }: VideoPlayerProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const formatDuration = (seconds: bigint) => {
    const totalSeconds = Number(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleDownload = () => {
    toast.success('Download started');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">{project.title}</h1>
          <p className="text-muted-foreground">{project.concept}</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: '/projects' })}>
          Back to Projects
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-gradient-to-br from-teal/20 to-gold/20 rounded-t-lg flex items-center justify-center">
            <video
              controls
              className="w-full h-full rounded-t-lg"
              poster={project.thumbnail || '/assets/generated/project-thumb.dim_320x180.png'}
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>Information about your cinematic creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{formatDuration(project.length)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Resolution:</span>
              <span className="font-medium">1920x1080 (Full HD)</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-muted-foreground">Style:</span>
              <span className="font-medium capitalize">{project.stylePreferences}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-muted-foreground">Audience:</span>
              <span className="font-medium">{project.targetAudience}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Download or share your video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Video
            </Button>
            <Button onClick={handleShare} variant="outline" className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              {copied ? 'Link Copied!' : 'Share Video'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
