import React from 'react';

export interface Slot {
    identifier: symbol;
    children: React.ReactNode;
}

export interface Slots {
    [index: string]: Slot;
}

export interface SlotContextValue {
    registerSlotUpdate: (name: string, update: VoidFunction) => void;
    getSlot: (name: string) => Slot | undefined;
    setSlot: (name: string, slot: Slot) => void;
    deleteSlot: (name: string, identifier: symbol) => void;
}

export const SlotContext = React.createContext<SlotContextValue | null>(null);
