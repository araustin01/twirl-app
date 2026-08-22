import React, { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/lib/shadcn/ui/input-group';
import { SearchIcon } from 'lucide-react';
import TrackEntry, { VideoData } from './TrackEntry';

interface TrackPanelProps {
  setVideoId?: (videoId: string) => void;
}

const TrackPanel: React.FC<TrackPanelProps> = ({ setVideoId }) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [query, setQuery] = useState<string>('');

  const search = async (query: string) => {
    if (!query.trim()) {
      setVideos([]);
      return;
    }

    const response = await fetch(
      `/api/youtube/search?q=${encodeURIComponent(query)}`
    );
    if (response.ok) {
      const data = await response.json();
      setVideos(data.videos);
    }
  };

  return (
    <div className="w-full h-full bg-space text-ghost">
      <div className="flex flex-col h-full items-center justify-start gap-4 p-4 py-8">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className="text-ghost" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search(query);
              }
            }}
          />
        </InputGroup>
        <div className="w-full space-y-2 overflow-y-auto">
          {videos.map((video) => (
            <TrackEntry
              onClick={() => setVideoId?.(video.id)}
              key={video.id}
              metadata={video}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackPanel;
