import { HTMLAttributes } from 'react';

export interface VideoData {
    id: string;
    title: string;
    thumbnail?: string;
}

interface TrackEntryProps extends HTMLAttributes<HTMLDivElement> {
    metadata: VideoData;
}

const TrackEntry: React.FC<TrackEntryProps> = ({ metadata, ...rest }) => {
    return (
        <div {...rest}>
            <div className="h-full w-full items-center flex gap-2 p-2 hover:bg-electric">
                {metadata.thumbnail && <img src={metadata.thumbnail} alt="" className="h-16 w-28 shrink-0 object-cover" />}
                {metadata.title}
            </div>
        </div>
    );
};

export default TrackEntry;