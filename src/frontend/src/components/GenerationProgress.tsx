import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { VideoProject } from '../backend';

interface GenerationProgressProps {
  projectId: string;
  project: VideoProject;
}

const stages = [
  { id: 'script', label: 'Script Processing', progress: 20 },
  { id: 'visuals', label: 'Visual Rendering (Sora)', progress: 40 },
  { id: 'voiceover', label: 'Voiceover Generation', progress: 60 },
  { id: 'sound', label: 'Sound Effects Integration', progress: 80 },
  { id: 'mixing', label: 'Audio Mixing', progress: 100 },
];

export default function GenerationProgress({ projectId, project }: GenerationProgressProps) {
  // Simulate progress based on project status
  const currentProgress = project.status === 'generating' ? 45 : 0;
  const currentStageIndex = Math.floor((currentProgress / 100) * stages.length);

  const getStageStatus = (index: number) => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'in-progress';
    return 'pending';
  };

  const estimatedTime = project.status === 'generating' ? '8 minutes' : 'Not started';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Video Generation</h1>
        <p className="text-muted-foreground">{project.title}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generation Progress</CardTitle>
          <CardDescription>Your video is being created with AI magic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">Estimated time remaining: {estimatedTime}</p>
          </div>

          <div className="space-y-4">
            {stages.map((stage, index) => {
              const status = getStageStatus(index);
              return (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : status === 'in-progress' ? (
                      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{stage.label}</h4>
                      <Badge
                        variant={
                          status === 'completed'
                            ? 'default'
                            : status === 'in-progress'
                              ? 'default'
                              : 'outline'
                        }
                        className={
                          status === 'completed'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : status === 'in-progress'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              : ''
                        }
                      >
                        {status === 'completed'
                          ? 'Completed'
                          : status === 'in-progress'
                            ? 'In Progress'
                            : 'Pending'}
                      </Badge>
                    </div>
                    {status === 'in-progress' && (
                      <Progress value={65} className="h-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {project.status === 'generating' && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-500 font-medium">
                🎬 Your cinematic masterpiece is being crafted. This may take several minutes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
