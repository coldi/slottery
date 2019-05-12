import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { SlotProvider, Slot, RenderAt } from '../src';

interface LayoutProps {
    children?: React.ReactNode;
}

function Layout({ children = null }: LayoutProps) {
    return (
        <div>
            <header>
                <Slot name="header">
                    <h1>default heading</h1>
                </Slot>
            </header>
            <main>
                <Slot name="content">
                    <p>default content</p>
                </Slot>
                {children}
            </main>
        </div>
    );
}

function LayoutWithProvider({ children = null }: LayoutProps) {
    return (
        <SlotProvider>
            <Layout>{children}</Layout>
        </SlotProvider>
    );
}

describe('Provider > Layout > Slots', () => {
    afterEach(cleanup);

    it('renders with defaults', () => {
        const { container } = render(
            <SlotProvider>
                <Layout />
            </SlotProvider>
        );
        const header = container.querySelector('header');
        const content = container.querySelector('main');

        expect(header).toHaveTextContent(/default heading/);
        expect(content).toHaveTextContent(/default content/);
    });

    it('updates slot when used as children', () => {
        const { container } = render(
            <SlotProvider>
                <Layout>
                    <RenderAt slot="header">
                        <h1>hello slot</h1>
                    </RenderAt>
                </Layout>
            </SlotProvider>
        );
        const header = container.querySelector('header');
        const heading = container.querySelector('header > h1');

        expect(header).toBeInTheDocument();
        expect(heading).toHaveTextContent(/hello slot/);
    });

    it('updates slot when used outside', () => {
        const { container } = render(
            <SlotProvider>
                <Layout />
                <RenderAt slot="header">
                    <h1>hello slot</h1>
                </RenderAt>
            </SlotProvider>
        );
        const header = container.querySelector('header');
        const heading = container.querySelector('header > h1');

        expect(header).toBeInTheDocument();
        expect(heading).toHaveTextContent(/hello slot/);
    });
});

describe('Layout > Provider > Slots', () => {
    afterEach(cleanup);

    it('throws when render slot is used outside provider', () => {
        const testRender = jest.fn(() =>
            render(
                <>
                    <LayoutWithProvider>
                        <RenderAt slot="header">
                            <h1>hello slot</h1>
                        </RenderAt>
                    </LayoutWithProvider>
                    <RenderAt slot="content">
                        <p>hello slot</p>
                    </RenderAt>
                </>
            )
        );

        console.error = jest.fn();

        expect(() => testRender()).toThrowError(/(setSlot|RenderAt)/);
    });

    it('updates children of render slot', () => {
        function App() {
            const [active, setActive] = React.useState(false);

            function handleClick() {
                setActive(value => !value);
            }

            return (
                <>
                    <LayoutWithProvider>
                        <RenderAt slot="header">
                            <h1>{active ? 'toggled' : 'slot'}</h1>
                        </RenderAt>
                    </LayoutWithProvider>
                    <button onClick={handleClick}>click</button>
                </>
            );
        }

        const { container, getByText } = render(<App />);

        const header = container.querySelector('header');

        expect(header).toHaveTextContent(/slot/);

        fireEvent.click(getByText('click'));

        expect(header).toHaveTextContent(/toggled/);
    });

    it('can render in slot conditionally', () => {
        function App() {
            const [active, setActive] = React.useState(false);

            function handleClick() {
                setActive(value => !value);
            }

            return (
                <>
                    <LayoutWithProvider>
                        {active ? (
                            <RenderAt slot="header">
                                <h1>toggled</h1>
                            </RenderAt>
                        ) : null}
                    </LayoutWithProvider>
                    <button onClick={handleClick}>click</button>
                </>
            );
        }

        const { container, getByText } = render(<App />);

        const header = container.querySelector('header');

        expect(header).toHaveTextContent(/default/);

        fireEvent.click(getByText('click'));

        expect(header).toHaveTextContent(/toggled/);
    });
});
