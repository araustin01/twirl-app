import React, { useState } from 'react';

import YoutubeViewport from '../components/YoutubeViewport';
import TopBar from '@/components/TopBar';
import AutoplayModal from '../components/AutoplayModal';
import BottomBar from '@/components/BottomBar';
import TrackPanel from '@/components/TrackPanel';
import { Button } from '@/lib/shadcn/ui/button';
import QueueControl from '@/components/QueueControl';

const DefaultPage: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [showTrackPanel, setShowTrackPanel] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);

  // Metadata state
  const [videoID, setVideoID] = useState<string>('insM7oUYNOE');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);

  const updateVideoID = (newVideoID: string) => {
    setAutoplayEnabled(true);
    setVideoID(newVideoID);
  };

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
  const handleMetadataUpdate = (meta: {
    title: string;
    duration: number;
    currentTime: number;
  }) => {
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
          <TopBar
            isPlaying={isPlaying}
            volume={volume}
            onTogglePlay={handleTogglePlay}
            onToggleMute={() => (volume > 0 ? setVolume(0) : setVolume(50))}
            onVolumeChange={(newVolume) => setVolume(newVolume)}
            title={videoTitle}
            duration={videoDuration}
            currentTime={videoCurrentTime}
          />
        </div>

        {/* Main content area */}
        <div className="relative flex flex-col h-full w-full flex-1">
          {/* Track panel overlay */}

          {showTrackPanel && <div className="flex absolute z-10 h-full w-md">
            <TrackPanel setVideoId={updateVideoID} />
          </div>}

          <div className="flex w-full max-w-125 mx-auto pt-1">
            <YoutubeViewport
              videoId={videoID}
              autoplayEnabled={autoplayEnabled}
              isPlaying={isPlaying}
              volume={volume}
              onPlayingChange={setIsPlaying}
              onMetadataUpdate={handleMetadataUpdate}
              className="youtube-viewport-container"
            />
          </div>

          {/* Placeholder for additional content or controls */}
          <div className="relative flex-1 w-2/3 mx-auto" onClick={() => setShowTrackPanel(false)}>
            <div className="absolute flex bottom-0 pb-10">
              <QueueControl />
            </div>
          </div>
        </div>

        <div className="w-full">
          <BottomBar
            onTogglePanelBtn={() => setShowTrackPanel((prev) => !prev)}
          />
        </div>
      </div >
    </>
  );
};

export default DefaultPage;
