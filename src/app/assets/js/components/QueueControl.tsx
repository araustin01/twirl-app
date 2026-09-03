import React from 'react';
import { Button } from '@/lib/shadcn/ui/button';
import { ButtonGroup } from '@/lib/shadcn/ui/button-group';
import { Users } from 'lucide-react';

const QueueControl: React.FC = () => {
    return (
        <>
            <ButtonGroup>
                <Button className="shadow-md opacity-100! bg-laser rounded-sm py-7 px-3" disabled>
                    <Users className="text-space size-5" />
                </Button>
                <Button className="w-32 h-full justify-start items-start shadow-md bg-space/75 rounded-sm min-w-0 whitespace-normal">
                    <div className="py-3 px-1">
                        DJ Queue
                    </div>
                </Button>
            </ButtonGroup>
        </>
    );
};

export default QueueControl;