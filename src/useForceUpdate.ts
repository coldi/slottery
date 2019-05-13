import * as React from 'react';

export const useForceUpdate = () => {
    const [, setState] = React.useState<any>();
    return React.useCallback(() => {
        setState({});
    }, [setState]);
};
