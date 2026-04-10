import React, { useState, useRef, useEffect } from 'react';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'SynthWave AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/400/400',
  },
  {
    id: '2',
    title: 'Cyber City',
    artist: 'Digital Ghost',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber/400/400',
  },
  {
    id: '3',
    title: 'Midnight Drive',
    artist: 'Retro Future',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/drive/400/400',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log('Playback blocked', e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration) {
        audioRef.current.currentTime = (value[0] / 100) * duration;
        setProgress(value[0]);
      }
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-black/40 backdrop-blur-xl border border-neon-purple/20 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-purple/20 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-neon-pink/20 blur-[100px] rounded-full" />

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative group">
            <motion.div
              key={currentTrack.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-xl overflow-hidden border-2 border-neon-purple/30 shadow-lg shadow-neon-purple/20"
            >
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {isPlaying && (
              <div className="absolute -bottom-2 -right-2 flex gap-0.5 items-end h-8 p-1 bg-black/60 rounded-lg border border-neon-purple/40">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 8, 20, 4] }}
                    transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
                    className="w-1 bg-neon-purple rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate neon-text-purple">{currentTrack.title}</h3>
            <p className="text-sm text-neon-purple/70 font-mono truncate">{currentTrack.artist}</p>
            <div className="mt-2 flex items-center gap-2">
              <Music2 className="w-3 h-3 text-neon-pink" />
              <span className="text-[10px] uppercase tracking-widest text-neon-pink/60 font-mono">Now Playing</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-tighter">
              <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
              <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor((audioRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="text-white/60 hover:text-neon-purple hover:bg-neon-purple/10 transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-neon-purple hover:bg-neon-purple/80 text-black shadow-lg shadow-neon-purple/40 transition-all hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-white/60 hover:text-neon-purple hover:bg-neon-purple/10 transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <Volume2 className="w-4 h-4 text-white/40" />
            <Slider
              value={[volume]}
              max={100}
              onValueChange={(v) => setVolume(v[0])}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
