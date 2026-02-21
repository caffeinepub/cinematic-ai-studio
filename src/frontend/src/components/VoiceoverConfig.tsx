import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, ArrowRight, Mic } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoProject } from '../backend';

interface VoiceoverConfigProps {
  projectId: string;
  project: VideoProject;
}

export default function VoiceoverConfig({ projectId, project }: VoiceoverConfigProps) {
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [accent, setAccent] = useState('american');
  const [tone, setTone] = useState('authoritative');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handlePreview = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? 'Preview stopped' : 'Playing preview...');
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setGenerated(true);
    toast.success('Voiceover generated successfully!');
  };

  const handleNext = () => {
    if (!generated) {
      toast.error('Please generate voiceover first');
      return;
    }
    navigate({ to: `/project/${projectId}/sound-effects` });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Voiceover Configuration</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: `/project/${projectId}/script` })}>
          Back to Script
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>Select voice characteristics for your narration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gender">Voice Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent">Accent</Label>
              <Select value={accent} onValueChange={setAccent}>
                <SelectTrigger id="accent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="british">British</SelectItem>
                  <SelectItem value="australian">Australian</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="canadian">Canadian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handlePreview} variant="outline" className="gap-2">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Stop Preview' : 'Preview Voice'}
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2">
              {isGenerating ? (
                <>
                  <Mic className="w-4 h-4 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Generate Voiceover
                </>
              )}
            </Button>
          </div>

          {generated && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-500 font-medium">✓ Voiceover generated successfully</p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} className="gap-2">
              Continue to Sound Effects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
