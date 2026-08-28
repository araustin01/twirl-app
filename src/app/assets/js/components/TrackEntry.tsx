import { HTMLAttributes } from 'react';

/**
 * Represents the metadata of a video.
 */
export interface VideoData {
  id: string;
  title: string;
  thumbnail?: string;
}

/**
 * Props for the TrackEntry component.
 */
interface TrackEntryProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The metadata of the video to be displayed in the track entry.
   */
  metadata: VideoData;
}

/**
 * The TrackEntry component represents a single entry in a list of tracks or videos.
 * It displays the video's thumbnail and title, and can handle click events.
 */
const TrackEntry: React.FC<TrackEntryProps> = ({ metadata, ...rest }) => {
  return (
    <div {...rest}>
      <button className="h-full w-full items-center flex gap-2 p-2 hover:bg-electric">
        {metadata.thumbnail && (
          <img
            src={metadata.thumbnail}
            alt={metadata.title}
            className="h-16 w-28 shrink-0 object-cover"
          />
        )}
        {metadata.title}
      </button>
    </div>
  );
};

export default TrackEntry;
