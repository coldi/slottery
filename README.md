# Slottery

A React library that provides slots you can render into.

⚠ **EXPERIMENTAL**

## How to use

```js
import { SlotProvider, Slot, RenderInto } from 'slottery';

function Layout({ children }) {
    return (
        <SlotProvider>
            <header>
                <Slot name="header">
                    <h1>Default heading</h1>
                </Slot>
            </header>
            <main>{children}</main>
        </SlotProvider>
    );
}

function App() {
    return (
        <Layout>
            <RenderInto slot="header">
                <h1>Hello slot</h1>
            </RenderInto>
            <p>Child content</p>
        </Layout>
    );
}
```

## Local Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).<br>
Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
