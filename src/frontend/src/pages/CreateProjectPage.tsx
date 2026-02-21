import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateProject } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Film } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateProjectPage() {
  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const [title, setTitle] = useState('');
  const [concept, setConcept] = useState('');
  const [duration, setDuration] = useState('60');
  const [style, setStyle] = useState('');
  const [audience, setAudience] = useState('');

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-24">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <Film className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold">Login Required</h2>
              <p className="text-muted-foreground">Please login to create a new video project</p>
            </div>
            <Button onClick={login} className="w-full">
              Login to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !concept.trim() || !style || !audience.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const durationSeconds = parseInt(duration);
    if (durationSeconds > 900) {
      toast.error('Maximum video duration is 15 minutes (900 seconds)');
      return;
    }

    try {
      const projectId = await createProject.mutateAsync({
        title: title.trim(),
        concept: concept.trim(),
        length: BigInt(durationSeconds),
        stylePreferences: style,
        targetAudience: audience.trim(),
      });

      toast.success('Project created successfully!');
      navigate({ to: `/project/${projectId}/script` });
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project. Please try again.');
    }
  };

  const durationOptions: Array<{ value: string; label: string }> = [];
  for (let i = 30; i <= 900; i += 30) {
    const minutes = Math.floor(i / 60);
    const seconds = i % 60;
    const label = minutes > 0 ? `${minutes}m ${seconds > 0 ? seconds + 's' : ''}` : `${seconds}s`;
    durationOptions.push({ value: i.toString(), label: label.trim() });
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Create New Project</h1>
          <p className="text-muted-foreground">Start your cinematic journey by defining your video concept</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Tell us about your video vision</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a memorable title for your project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concept">Video Concept *</Label>
                <Textarea
                  id="concept"
                  placeholder="Describe your video concept, key messages, and visual ideas..."
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Video Duration *</Label>
                  <Select value={duration} onValueChange={setDuration} required>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Maximum: 15 minutes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style Preference *</Label>
                  <Select value={style} onValueChange={setStyle} required>
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="narrative">Narrative</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience *</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Young professionals, Tech enthusiasts, General audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={createProject.isPending} className="flex-1">
                  {createProject.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate({ to: '/projects' })}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
