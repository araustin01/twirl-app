import React from 'react';
import { Users } from 'lucide-react';

const QueueControl: React.FC = () => {
  return (
    <div className="w-38 h-14 rounded-md overflow-hidden">
      <div className="w-full h-full flex flex-row">
        <div className="p-3 w-1/3 bg-laser">
          <Users className="text-space h-full w-full" />
        </div>
        <button className="w-full h-full">
          <div className="p-2 h-full flex flex-1 bg-space/75">
            <div className="flex flex-col gap-0.5 h-full text-xs text-ghost text-left">
              <h1>Join queue</h1>
              <p>ETA: now</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QueueControl;
