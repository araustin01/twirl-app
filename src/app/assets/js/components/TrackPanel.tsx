import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/lib/shadcn/ui/input-group";
import { SearchIcon } from 'lucide-react';

const TrackPanel: React.FC = () => {
    const [videos, setVideos] = useState<Array<{ id: string; title: string; thumbnail?: string }>>([]);
    const [query, setQuery] = useState<string>("");

    const search = async (query: string) => {
        if (!query.trim()) {
            setVideos([]);
            return;
        }

        const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
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
                    <InputGroupInput placeholder="Search"
                        onChange={(e) => { setQuery(e.target.value); }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(query);
                            }
                        }} />
                </InputGroup>
                <div className="w-full space-y-2 overflow-y-auto">
                    {videos.map((video) => (
                        <div key={video.id} className="flex gap-3 p-2">
                            {video.thumbnail && <img src={video.thumbnail} alt="" className="h-16 w-28 object-cover" />}
                            <p>{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackPanel;