import React, { useContext, useEffect, useState } from 'react';
import { SlotContext, SlotContextValue } from './SlotContext';

interface Props {
    slot: string;
    children?: React.ReactNode;
}

export function RenderAt({ slot: slotName, children }: Props) {
    const [identifier] = useState<symbol>(Symbol(slotName));
    const { setSlot, deleteSlot } = useContext(SlotContext) as SlotContextValue;

    setSlot(slotName, {
        identifier,
        children,
    });

    useEffect(() => {
        return () => {
            // clean up slot
            deleteSlot(slotName, identifier);
        };
    }, [identifier, slotName]);

    return null;
}
