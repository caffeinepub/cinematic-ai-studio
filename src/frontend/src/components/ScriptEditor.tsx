import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, ArrowRight, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoProject } from '../backend';

interface ScriptEditorProps {
  projectId: string;
  project: VideoProject;
}

export default function ScriptEditor({ projectId, project }: ScriptEditorProps) {
  const navigate = useNavigate();
  const [script, setScript] = useState('');
  const [tone, setTone] = useState('professional');
  const [pacing, setPacing] = useState('medium');
  const [structure, setStructure] = useState('linear');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const generatedScript = `[Scene 1: Opening]\n\nThe camera pans across a stunning landscape as the narrator begins...\n\n"${project.concept}"\n\n[Scene 2: Development]\n\nWe see the main elements come together, creating a compelling narrative that speaks to ${project.targetAudience}.\n\n[Scene 3: Climax]\n\nThe story reaches its peak, delivering the core message with impact.\n\n[Scene 4: Conclusion]\n\nA powerful closing that leaves a lasting impression.`;
    
    setScript(generatedScript);
    setIsGenerating(false);
    toast.success('Script generated successfully!');
  };

  const handleSave = () => {
    if (!script.trim()) {
      toast.error('Please generate or write a script first');
      return;
    }
    toast.success('Script saved successfully!');
  };

  const handleNext = () => {
    if (!script.trim()) {
      toast.error('Please generate or write a script first');
      return;
    }
    navigate({ to: `/project/${projectId}/voiceover` });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Script Editor</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: '/projects' })}>
          Back to Projects
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Script Parameters</CardTitle>
            <CardDescription>Customize your script generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="inspiring">Inspiring</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pacing">Pacing</Label>
              <Select value={pacing} onValueChange={setPacing}>
                <SelectTrigger id="pacing">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="structure">Narrative Structure</Label>
              <Select value={structure} onValueChange={setStructure}>
                <SelectTrigger id="structure">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="non-linear">Non-linear</SelectItem>
                  <SelectItem value="episodic">Episodic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Script
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Script Content</CardTitle>
            <CardDescription>Edit your script or generate one with AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Generate a script or write your own..."
              rows={20}
              className="font-mono text-sm"
            />
            <div className="flex gap-3">
              <Button onClick={handleSave} variant="outline" className="gap-2">
                <Save className="w-4 h-4" />
                Save Script
              </Button>
              <Button onClick={handleNext} className="flex-1 gap-2">
                Continue to Voiceover
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
