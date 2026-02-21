import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Search, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoProject } from '../backend';

interface SoundEffectsLibraryProps {
  projectId: string;
  project: VideoProject;
}

const soundEffects = [
  { id: '1', name: 'Ocean Waves', category: 'nature', duration: '0:15' },
  { id: '2', name: 'Forest Birds', category: 'nature', duration: '0:20' },
  { id: '3', name: 'City Traffic', category: 'urban', duration: '0:12' },
  { id: '4', name: 'Keyboard Typing', category: 'technology', duration: '0:08' },
  { id: '5', name: 'Footsteps', category: 'human', duration: '0:10' },
  { id: '6', name: 'Wind Howling', category: 'ambient', duration: '0:18' },
  { id: '7', name: 'Thunder', category: 'nature', duration: '0:05' },
  { id: '8', name: 'Door Creak', category: 'cinematic', duration: '0:03' },
];

export default function SoundEffectsLibrary({ projectId, project }: SoundEffectsLibraryProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState<string | null>(null);

  const categories = ['all', 'nature', 'urban', 'technology', 'human', 'ambient', 'cinematic'];

  const filteredEffects = soundEffects.filter((effect) => {
    const matchesSearch = effect.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || effect.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handlePlay = (id: string) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
      setTimeout(() => setPlaying(null), 2000);
    }
  };

  const handleSave = () => {
    toast.success(`${selected.size} sound effects saved`);
  };

  const handleNext = () => {
    navigate({ to: `/project/${projectId}/music` });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Sound Effects Library</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: `/project/${projectId}/voiceover` })}>
          Back to Voiceover
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Browse Sound Effects</CardTitle>
          <CardDescription>Search and select sound effects to enhance your video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sound effects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEffects.map((effect) => (
              <Card key={effect.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <Checkbox checked={selected.has(effect.id)} onCheckedChange={() => handleToggle(effect.id)} />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{effect.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {effect.category} • {effect.duration}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handlePlay(effect.id)}
                    className="gap-2"
                  >
                    {playing === effect.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selected.size > 0 && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-500 font-medium">{selected.size} sound effects selected</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} variant="outline" disabled={selected.size === 0}>
              Save Selection
            </Button>
            <Button onClick={handleNext} className="flex-1 gap-2">
              Continue to Music
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
