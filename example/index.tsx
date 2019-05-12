import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SlotProvider, Slot, RenderAt } from '../src';

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
                <RenderAt slot="header">
                    <h1>{active ? 'Toggled header' : 'Hello slot'}</h1>
                </RenderAt>
                <p>Default child content</p>
            </Layout>
            <RenderAt slot="content">
                <button onClick={handleClick}>Toggle render slot</button>
            </RenderAt>
        </>
    );
};

ReactDOM.render(
    <SlotProvider>
        <App />
    </SlotProvider>,
    document.getElementById('root')
);
