import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SlotProvider, Slot, RenderInto } from '../src';

interface LayoutProps {
    children?: React.ReactNode;
}

function Layout({ children = null }: LayoutProps) {
    return (
        <>
            <hr />
            <header>
                <Slot name="header">
                    <h1>Default heading</h1>
                </Slot>
            </header>
            <main>
                <Slot name="content">
                    <p>Default layout content</p>
                </Slot>
                {children}
            </main>
            <hr />
        </>
    );
}

const App = () => {
    const [active, setActive] = React.useState(false);

    function handleClick() {
        setActive(value => !value);
    }

    return (
        <>
            <Layout>
                <RenderInto slot="header">
                    <h1>{active ? 'Toggled header' : 'Hello slot'}</h1>
                </RenderInto>
                <p>Default child content</p>
            </Layout>
            <RenderInto slot="content">
                <button onClick={handleClick}>Toggle render slot</button>
            </RenderInto>
        </>
    );
};

ReactDOM.render(
    <SlotProvider>
        <App />
    </SlotProvider>,
    document.getElementById('root')
);
