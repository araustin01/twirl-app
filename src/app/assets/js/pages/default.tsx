import React, { useState } from "react";

import YoutubeViewport from "../components/YoutubeViewport";
import PlayerToolbar from "../components/PlayerToolbar";
import AutoplayModal from "../components/AutoplayModal";


const DefaultPage: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const handleAcceptAutoplay = () => {
        setAutoplayEnabled(true);
        setIsMuted(false);
        setIsPlaying(true);
        setShowModal(false);
    };

    const handleDeclineAutoplay = () => {
        setAutoplayEnabled(false);
        setIsMuted(true);
        setIsPlaying(true);
        setShowModal(false);
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleToggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    return (
        <>
            {showModal && (
                <AutoplayModal
                    onAccept={handleAcceptAutoplay}
                    onDecline={handleDeclineAutoplay}
                />
            )}
            <section className="phx-hero">
                <h1>Welcome to Phoenix with TypeScript and React!</h1>
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <YoutubeViewport
                        url="https://www.youtube.com/watch?v=insM7oUYNOE"
                        autoplayEnabled={autoplayEnabled}
                        isPlaying={isPlaying}
                        isMuted={isMuted}
                    />
                </div>
            </section>
            <PlayerToolbar
                isPlaying={isPlaying}
                isMuted={isMuted}
                onTogglePlay={handleTogglePlay}
                onToggleMute={handleToggleMute}
            />
        </>
    );
};

export default DefaultPage;