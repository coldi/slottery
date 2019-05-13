import * as React from 'react';
import { SlotContext, SlotContextValue } from './SlotContext';

interface Props {
    slot: string;
    children?: React.ReactNode;
}

export function RenderInto({ slot: slotName, children }: Props) {
    const [identifier] = React.useState<symbol>(Symbol(slotName));
    const { setSlot, deleteSlot } = React.useContext(
        SlotContext
    ) as SlotContextValue;

    setSlot(slotName, {
        identifier,
        children,
    });

    React.useEffect(() => {
        return () => {
            // clean up slot
            deleteSlot(slotName, identifier);
        };
    }, [identifier, slotName]);

    return null;
}
