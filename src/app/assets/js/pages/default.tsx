import React, { useState } from "react";

import YoutubeEmbed from "../embed";
import AutoplayModal from "../components/AutoplayModal";


const DefaultPage: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);

    const handleAcceptAutoplay = () => {
        setAutoplayEnabled(true);
        setShowModal(false);
    };

    const handleDeclineAutoplay = () => {
        setAutoplayEnabled(false);
        setShowModal(false);
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
                <YoutubeEmbed
                    target="https://www.youtube.com/watch?v=insM7oUYNOE"
                    autoplayEnabled={autoplayEnabled}
                />
            </section>
        </>
    );
};

export default DefaultPage;