"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import images from "@/utils/imagesImport";
import { Input } from "@/components/ui/input";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import translations from "@/utils/translations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MusicSection = ({ language }) => {
  // Destructure translation strings
  const {
    title,
    description,
    placeholder,
    small_note,
    toast_success,
    toast_error,
  } = translations[language].music_section;

  const videoRef = useRef(null); // Reference for the background video element
  const containerRef = useRef(null); // Reference for the search input container
  const resultsRef = useRef(null); // Reference for the search results container

  const [videoError, setVideoError] = useState(false); // State to handle errors in the video element
  const [query, setQuery] = useState(""); // State for storing the current search query
  const [results, setResults] = useState([]); // State for storing search results from API
  const [isFocused, setIsFocused] = useState(false); // State to track if the input field is focused
  const [playingTrack, setPlayingTrack] = useState(null); // State for the currently playing track object
  const [musicSpin, setMusicSpin] = useState(false); // State to toggle the spin effect for the icon
  const [isAddingTrack, setIsAddingTrack] = useState(false); // State to track if a track is being added
  const [loading, setIsLoading] = useState(false); // State to indicate if the search results are loading
  const [playlist, setPlaylist] = useState([]); // State to store the list of suggested songs
  const { toast } = useToast(); // Toast hook for displaying success or error messages

  // Variants for the framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Fetch initial playlist
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch("/api/get-suggestions");
        if (response.ok) {
          const data = await response.json();
          setPlaylist(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylist();
  }, []);

  // Function to fetch search results from the API
  const searchTracks = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/search-music?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.items || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setIsLoading(false);
    }
  };

  // Handle typing in the input field
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handle key down (Enter key)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      searchTracks(query);
      setIsFocused(true);
    }
  };

  // Handle clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setResults([]); // Close search results when clicking outside
        setIsFocused(false); // Reset focus state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to play or stop the song preview
  const handlePlayPreview = (track) => {
    if (playingTrack?.id === track.id) {
      // Stop current song
      setPlayingTrack(null);
      setMusicSpin(false);
    } else {
      // Play the selected song
      setPlayingTrack(track);
      setMusicSpin(true);
    }
  };

  // When the song preview ends, reset the button
  const handleEnded = () => {
    setPlayingTrack(null);
    setMusicSpin(false);
  };

  // function to add songs to the playlist
  const addTrackToPlaylist = async (track) => {
    try {
      setIsAddingTrack(true);
      const response = await fetch("/api/add-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackUri: track.id,
          trackName: track.name,
          artist: track.artist,
          image: track.image // Sending image too, even if backend ignores it for now
        }),
      });

      const data = await response.json();

      if (response.ok) {
        //success toast
        toast({
          variant: "success",
          title: toast_success.title,
          description: toast_success.description,
        });

        // Add to local playlist state
        setPlaylist(prev => [{
          id: track.id,
          name: track.name,
          artist: track.artist,
          image: track.image
        }, ...prev]);

      } else {
        console.error("Failed to add track:", data);
        toast({
          variant: "destructive",
          title: toast_error.title,
          description: toast_error.description,
        });
      }
    } catch (error) {
      console.error("Error adding track:", error);
      toast({
        variant: "destructive",
        title: toast_error.title,
        description: toast_error.description,
      });
    } finally {
      setIsAddingTrack(false);
    }
  };

  // speed up the background video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = 1.3;
    }
  }, []);

  return (
    <section
      id="music-section"
      className="relative w-full h-[100svh] md:h-svh bg-center bg-no-repeat bg-cover flex flex-col justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${images.musicsect.src})`,
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-full z-20 flex flex-col justify-start items-center px-4 md:px-12 pb-12 pt-10 md:pt-20"
      >
        <div className="text-white flex flex-col justify-center items-center">
          <h3 translate="no" className=" font-bold z-20 ">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title.sub}
          </h3>
        </div>
        <p translate="no" className="md:max-w-[750px] text-white font-medium">
          {description}
        </p>

        {/* Music Input */}
        <div
          ref={containerRef}
          className="relative max-w-[500px] w-full h-14 bg-slate-50 rounded-md flex justify-center items-center mt-4 md:mt-8 py-2 px-3"
        >
          <Image
            src={images.youtube}
            alt="music icon"
            width={95}
            height={95}
            quality={100}
            className={`w-[35px] h-auto ${musicSpin ? "animate-spin-music" : ""
              }`}
          />
          <Input
            translate="no"
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search YouTube..."
            className="bg-slate-50 font-serif h-10 mb-4 focus:outline-none focus:ring-0 text-lg border-none mt-4 "
          />
          <button
            onClick={() => {
              if (query.trim() !== "") {
                searchTracks(query);
                setIsFocused(true);
              }
            }}
            className="transform active:scale-[0.98]"
          >
            <BsFillSearchHeartFill
              size={30}
              className="transform scale-x-[-1] text-neutral-500 "
            />
          </button>
          {/* Display spinner */}
          {loading && (
            <div className="absolute max-sm:top-[-35px] right-0 sm:right-[-40px]">
              <Image
                src={images.spinner}
                alt="Searching..."
                width={30}
                height={30}
                quality={100}
                className="animate-spin w-[30px] h-[30px]"
              />
            </div>
          )}
        </div>

        {/* Display search results */}
        {isFocused && results.length > 0 && (
          <div
            ref={resultsRef}
            className="absolute top-[380px] max-w-[500px] max-h-[500px] w-full bg-slate-50 rounded-lg mt-1 py-3 px-4 overflow-auto z-50 shadow-xl"
          >
            <p
              translate="no"
              className="text-[10px] md:text-sm font-serif font-extralight text-green-500"
            >
              {small_note}
            </p>
            <ul className="w-full flex flex-col justify-center items-start gap-2">
              {results.map((track) => (
                <li
                  key={track.id}
                  className="w-full flex justify-between items-center border-b last:border-none gap-2"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={track.image} alt={track.name} className="w-10 h-10 object-cover rounded" />
                    <div className="flex flex-col">
                      <p translate="no" className="text-left font-semibold truncate text-sm max-w-[200px]">
                        {track.name}
                      </p>
                      <p translate="no" className="text-left text-xs text-gray-500 truncate max-w-[200px]">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <div className="relative mb-3 flex justify-start items-center shrink-0">
                    <button
                      className="mr-2 flex justify-center items-center"
                      onClick={() =>
                        handlePlayPreview(track)
                      }
                    >
                      <IoPlay size={25} className="text-neutral-500" />
                    </button>

                    {/* Add Button */}
                    <button
                      disabled={isAddingTrack}
                      onClick={() => addTrackToPlaylist(track)}
                      className="transform active:scale-[0.95]"
                    >
                      <IoIosAddCircle
                        size={35}
                        className={`${isAddingTrack ? "text-green-300" : "text-green-500"
                          }`}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Community Playlist */}
        <div className="max-w-[500px] w-full mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 overflow-hidden flex flex-col flex-1 min-h-0 mb-4">
          <h4 className="text-white text-lg font-bold mb-2 text-left sticky top-0">Our Playlist ({playlist.length})</h4>
          <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
            <ul className="w-full flex flex-col gap-2">
              {playlist.map((track, index) => (
                <li key={`${track.id}-${index}`} className="w-full flex justify-between items-center bg-white/80 rounded-lg p-2 gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    {track.image && <img src={track.image} alt={track.name} className="w-10 h-10 object-cover rounded" />}
                    <div className="flex flex-col">
                      <p translate="no" className="text-left font-semibold text-sm leading-tight line-clamp-1 text-black">
                        {track.name}
                      </p>
                      <p translate="no" className="text-left text-xs text-gray-600 truncate max-w-[200px]">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex justify-center items-center p-2"
                      onClick={() => handlePlayPreview(track)}
                    >
                      <IoPlay size={22} className="text-blue" />
                    </button>
                  </div>
                </li>
              ))}
              {playlist.length === 0 && (
                <p className="text-white/70 italic text-sm">No songs added yet. Be the first!</p>
              )}
            </ul>
          </div>
        </div>

      </motion.div>

      {/* Background */}
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-blue via-[#193b355e] z-10"></div>
      <div className="w-full h-full overlay z-[1] md:backdrop-blur-[2px]"></div>
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover object-center opacity-40 md:opacity-20 mix-blend-screen z-0 ${musicSpin ? "animate-pulse duration-1000" : ""
            }`}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src="/videos/bg_particles.webm" type="video/webm" />
        </video>
      )}

      {/* YouTube Player Dialog */}
      <Dialog open={!!playingTrack} onOpenChange={(open) => !open && handleEnded()}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-black border-none">
          {playingTrack && (
            <>
              <DialogHeader className="p-4 bg-black/50 text-white absolute top-0 w-full z-10">
                <DialogTitle className="truncate pr-8">{playingTrack.name}</DialogTitle>
              </DialogHeader>
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${playingTrack.id}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={playingTrack.name}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default MusicSection;
