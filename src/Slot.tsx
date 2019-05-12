import React, { useContext } from 'react';
import { SlotContext, SlotContextValue } from './SlotContext';
import { useForceUpdate } from './useForceUpdate';

interface Props {
    name: string;
    children?: React.ReactNode;
}

export function Slot({ name, children = null }: Props) {
    const forceUpdate = useForceUpdate();
    const { registerSlotUpdate, getSlot } = useContext(
        SlotContext
    ) as SlotContextValue;

    registerSlotUpdate(name, forceUpdate);
    const slot = getSlot(name);

    return <>{slot ? slot.children : children}</>;
}
