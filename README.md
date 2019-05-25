# Slottery

A React library that provides slots you can render into.

It's similar to [VueJS slots](https://vuejs.org/v2/guide/components-slots.html), but with Slottery you can define the scope from where your slots can be accessed.

If you use only one SlotProvider component at the top level, your slots become somewhat global and you can render into them from anywhere in your React app.

If you use multiple SlotProvider components you can scope slots to be only available inside some components, like your base layout component.

## Installation

```
npm install slottery
```

## How to use

```js
function Layout({ children }) {
    return (
        <SlotProvider>
            <header>
                <Slot name="header">
                    <h1>
                        This will be replaced when rendering into "header" slot
                    </h1>
                </Slot>
            </header>
            <main>{children}</main>
            <aside>
                <Slot name="sidebar">
                    <p>
                        This will be replaced when rendering into "sidebar" slot
                    </p>
                </Slot>
            </aside>
        </SlotProvider>
    );
}

function App() {
    return (
        <Layout>
            <RenderInto slot="header">
                <h1>Custom header</h1>
            </RenderInto>
            <RenderInto slot="sidebar">
                <p>Custom sidebar</p>
            </RenderInto>
            <p>This is just normal component children. Nothing special here.</p>
        </Layout>
    );
}
```

## Examples

Codesandboxes: [Layout with slots](https://codesandbox.io/s/slotteryexample-21ks4) | [Top-level SlotProvider](https://codesandbox.io/s/slotteryexample-22uni)

<hr>

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
