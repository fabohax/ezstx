"use client";
import Cover from '@/components/Cover';
import GetInModal from '@/components/GetInModal';
import BuyTrackModal from '@/components/BuyTrackModal';
import { Play, Pause, SkipBack, SkipForward, ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from "react";

export default function Home() {
  const [showGetInModal, setShowGetInModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const songs = [
    { src: "/bitcoin.mp3", title: "bitcoin", artist: "40230" },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Handle song changes and auto-play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(songs[currentSongIndex]);

    if (isPlaying) {
      audio.load(); // Reload the new source
      audio.play().catch(console.error);
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  // Handle spacebar press for play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevSong();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextSong();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlay]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-screen bg-gradient-to-b from-black to-[#555] text-white dotted-grid-background">
      {/* Global Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#101010] z-50">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <audio 
        ref={audioRef} 
        src={songs[currentSongIndex].src}
        onEnded={nextSong}
        onLoadedData={() => {
          if (isPlaying) {
            audioRef.current?.play().catch(console.error);
          }
        }}
      />

      <div className="flex flex-col items-center justify-center h-full">
        <div 
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={togglePlay}
        >
          <div className="transition-all duration-300">
            <Cover src="/zyfr.jpg" alt="zyfr covr" size={600}/>
          </div>
          
          {/* Hover Controls */}
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg">
              <div className="flex items-center space-x-6">
                <button
                  onClick={(e) => { e.stopPropagation(); prevSong(); }}
                  className="hover:bg-white/10 hover:bg-opacity-20 rounded-full p-3 transition-all cursor-pointer"
                >
                  <SkipBack className="w-8 h-8" />
                </button>
                
                <button className="hover:bg-white/10 hover:bg-opacity-20 rounded-full p-4 transition-all cursor-pointer">
                  {isPlaying ? (
                    <Pause className="w-12 h-12" />
                  ) : (
                    <Play className="w-12 h-12" />
                  )}
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); nextSong(); }}
                  className="hover:bg-white/10 hover:bg-opacity-20 rounded-full p-3 transition-all cursor-pointer"
                >
                  <SkipForward className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Song Info */}
        {isPlaying && (
          <div className="fixed bottom-8 text-center">
            <h2 className="text-2xl font-bold text-white">{songs[currentSongIndex].title}</h2>
            <p className="text-lg text-gray-300">{songs[currentSongIndex].artist}</p>
            <button
              onClick={() => setShowBuyModal(true)}
              className="fixed top-7 right-7 bg-transparent hover:bg-white hover:text-black text-[#555] font-semibold py-1 px-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className='text-sm font-semibold'>BUY IT</span>
            </button>
          </div>
        )}
      </div>

      {showGetInModal && <GetInModal onClose={() => setShowGetInModal(false)} />}
      {showBuyModal && (
        <BuyTrackModal 
          song={currentSong} 
          onClose={() => setShowBuyModal(false)} 
        />
      )}
    </div>
  )
}