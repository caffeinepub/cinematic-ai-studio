import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Play, Pause, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoProject } from '../backend';

interface MusicLibraryProps {
  projectId: string;
  project: VideoProject;
}

const musicTracks = [
  { id: '1', name: 'Epic Journey', mood: 'epic', genre: 'orchestral', tempo: 'medium', duration: '3:45' },
  { id: '2', name: 'Calm Waters', mood: 'calm', genre: 'ambient', tempo: 'slow', duration: '4:20' },
  { id: '3', name: 'Rising Hope', mood: 'uplifting', genre: 'cinematic', tempo: 'medium', duration: '3:15' },
  { id: '4', name: 'Dark Tension', mood: 'dramatic', genre: 'orchestral', tempo: 'slow', duration: '2:50' },
  { id: '5', name: 'Tech Innovation', mood: 'uplifting', genre: 'electronic', tempo: 'fast', duration: '3:30' },
  { id: '6', name: 'Mystery Unfolds', mood: 'mysterious', genre: 'cinematic', tempo: 'medium', duration: '4:00' },
];

export default function MusicLibrary({ projectId, project }: MusicLibraryProps) {
  const navigate = useNavigate();
  const [moodFilter, setMoodFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [tempoFilter, setTempoFilter] = useState<string>('all');
  const [selected, setSelected] = useState<string>('');
  const [playing, setPlaying] = useState<string | null>(null);

  const moods = ['all', 'uplifting', 'dramatic', 'calm', 'epic', 'mysterious', 'romantic'];
  const genres = ['all', 'orchestral', 'electronic', 'acoustic', 'ambient', 'cinematic', 'corporate'];
  const tempos = ['all', 'slow', 'medium', 'fast'];

  const filteredTracks = musicTracks.filter((track) => {
    const matchesMood = moodFilter === 'all' || track.mood === moodFilter;
    const matchesGenre = genreFilter === 'all' || track.genre === genreFilter;
    const matchesTempo = tempoFilter === 'all' || track.tempo === tempoFilter;
    return matchesMood && matchesGenre && matchesTempo;
  });

  const handlePlay = (id: string) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
      setTimeout(() => setPlaying(null), 3000);
    }
  };

  const handleSave = () => {
    if (!selected) {
      toast.error('Please select a music track');
      return;
    }
    toast.success('Music selection saved');
  };

  const handleNext = () => {
    if (!selected) {
      toast.error('Please select a music track');
      return;
    }
    navigate({ to: `/project/${projectId}/status` });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Music Library</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: `/project/${projectId}/sound-effects` })}>
          Back to Sound Effects
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Browse Music Tracks</CardTitle>
          <CardDescription>Select background music for your video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Mood</Label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <Badge
                    key={mood}
                    variant={moodFilter === mood ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => setMoodFilter(mood)}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Genre</Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={genreFilter === genre ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => setGenreFilter(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Tempo</Label>
              <div className="flex flex-wrap gap-2">
                {tempos.map((tempo) => (
                  <Badge
                    key={tempo}
                    variant={tempoFilter === tempo ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => setTempoFilter(tempo)}
                  >
                    {tempo}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <RadioGroup value={selected} onValueChange={setSelected}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTracks.map((track) => (
                <Card key={track.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <RadioGroupItem value={track.id} id={track.id} />
                    <Label htmlFor={track.id} className="flex-1 cursor-pointer">
                      <h4 className="font-medium text-foreground">{track.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {track.mood} • {track.genre} • {track.tempo} • {track.duration}
                      </p>
                    </Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePlay(track.id)}
                      className="gap-2"
                    >
                      {playing === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>

          {selected && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-500 font-medium">
                ✓ {musicTracks.find((t) => t.id === selected)?.name} selected
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} variant="outline" disabled={!selected}>
              Save Selection
            </Button>
            <Button onClick={handleNext} className="flex-1 gap-2">
              Start Generation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
