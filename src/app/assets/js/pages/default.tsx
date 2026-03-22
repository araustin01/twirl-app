import React, { useState } from "react";

import YoutubeViewport from "../components/YoutubeViewport";
import PlayerToolbar from "../components/PlayerToolbar";
import AutoplayModal from "../components/AutoplayModal";
import MusicToolbar from "@/components/MusicToolbar";


const DefaultPage: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
    // Metadata state
    const [videoTitle, setVideoTitle] = useState<string>("");
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);

    const handleAcceptAutoplay = () => {
        setAutoplayEnabled(true);
        setVolume(50); // Set to a reasonable default volume
        setShowModal(false);
    };

    const handleDeclineAutoplay = () => {
        setAutoplayEnabled(false);
        setVolume(0); // Mute if autoplay is declined
        setShowModal(false);
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    // Handler to receive metadata from YoutubeViewport
    const handleMetadataUpdate = (meta: { title: string; duration: number; currentTime: number }) => {
        setVideoTitle(meta.title);
        setVideoDuration(meta.duration);
        setVideoCurrentTime(meta.currentTime);
    };

    return (
        <>
            {showModal && (
                <AutoplayModal
                    onAccept={handleAcceptAutoplay}
                    onDecline={handleDeclineAutoplay}
                />
            )}
            <div className="flex flex-col h-screen">
                <div className="w-full">
                    <PlayerToolbar
                        isPlaying={isPlaying}
                        volume={volume}
                        onTogglePlay={handleTogglePlay}
                        onToggleMute={() => volume > 0 ? setVolume(0) : setVolume(50)}
                        onVolumeChange={(newVolume) => setVolume(newVolume)}
                        title={videoTitle}
                        duration={videoDuration}
                        currentTime={videoCurrentTime}
                    />
                </div>

                <div className="flex justify-center px-4 pt-1">
                    <div className="w-full max-w-[500px]">
                        <YoutubeViewport
                            url="https://www.youtube.com/watch?v=insM7oUYNOE"
                            autoplayEnabled={autoplayEnabled}
                            isPlaying={isPlaying}
                            volume={volume}
                            onPlayingChange={setIsPlaying}
                            onMetadataUpdate={handleMetadataUpdate}
                        />
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                <div className="w-full">
                    <MusicToolbar
                        isPlaying={isPlaying}
                        volume={volume}
                        onTogglePlay={handleTogglePlay}
                        onToggleMute={() => volume > 0 ? setVolume(0) : setVolume(50)}
                        onVolumeChange={(newVolume) => setVolume(newVolume)}
                        title={videoTitle}
                        duration={videoDuration}
                        currentTime={videoCurrentTime}
                    />
                </div>
            </div>
        </>
    );
};

export default DefaultPage;