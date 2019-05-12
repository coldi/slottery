import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
    const [, setState] = useState<any>();
    return useCallback(() => {
        setState({});
    }, [setState]);
};
