import React, { useState } from "react";

import YoutubeViewport from "../components/YoutubeViewport";
import PlayerToolbar from "../components/PlayerToolbar";
import AutoplayModal from "../components/AutoplayModal";


const DefaultPage: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    // Metadata state
    const [videoTitle, setVideoTitle] = useState<string>("");
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);

    const handleAcceptAutoplay = () => {
        setAutoplayEnabled(true);
        setIsMuted(false);
        setVolume(50); // Set to a reasonable default volume
        setShowModal(false);
    };

    const handleDeclineAutoplay = () => {
        setAutoplayEnabled(false);
        setIsMuted(true);
        setShowModal(false);
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleToggleMute = () => {
        setIsMuted((prev) => !prev);
        setVolume((prev) => (isMuted ? 50 : 0)); // Set to 50 when unmuting, 0 when muting
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        } else if (newVolume === 0) {
            setIsMuted(true);
        }
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
                {/* Row 1: Viewport */}
                <div className="flex justify-center px-4 pt-4">
                    <div className="w-full max-w-[600px]">
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

                {/* Row 2: Spacer */}
                <div className="flex-1" />

                {/* Row 3: Toolbar pinned to bottom */}
                <div className="w-full">
                    <PlayerToolbar
                        isPlaying={isPlaying}
                        isMuted={isMuted}
                        volume={volume}
                        onTogglePlay={handleTogglePlay}
                        onToggleMute={handleToggleMute}
                        onVolumeChange={handleVolumeChange}
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