import * as React from 'react';
import { Slot, SlotContext, SlotContextValue } from './SlotContext';

interface Props {
    children: React.ReactNode;
}

export function SlotProvider({ children }: Props) {
    const slots = React.useMemo(() => new Map<string, Slot>(), []);
    const updates = React.useMemo(() => new Map<string, Function>(), []);

    const value = React.useMemo<SlotContextValue>(
        () => ({
            registerSlotUpdate(name: string, update: VoidFunction) {
                updates.set(name, update);
            },
            getSlot(name: string): Slot | undefined {
                return slots.get(name);
            },
            setSlot(name: string, next: Slot) {
                const current = slots.get(name);
                if (
                    !current ||
                    current.identifier !== next.identifier ||
                    current.children !== next.children
                ) {
                    slots.set(name, next);

                    const updateSlot = updates.get(name);
                    if (updateSlot != null) updateSlot();
                }
            },
            deleteSlot(name: string, identifier: symbol) {
                const slot = slots.get(name);
                if (slot && slot.identifier === identifier) {
                    slots.delete(name);

                    const updateSlot = updates.get(name);
                    if (updateSlot != null) updateSlot();
                }
            },
        }),
        [slots, updates]
    );

    return (
        <SlotContext.Provider value={value}>{children}</SlotContext.Provider>
    );
}
