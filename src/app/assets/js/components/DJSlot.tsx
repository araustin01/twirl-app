import { Disc3 } from 'lucide-react';

const DJSlot: React.FC = () => {
  return (
    <div className="w-12 h-12 flex rounded-2xl overflow-hidden">
      <div className="p-2 flex w-full bg-electric">
        <Disc3 className="w-auto h-auto text-ghost" />
      </div>
    </div>
  );
};

export default DJSlot;
