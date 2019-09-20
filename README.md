# react-conditional-flow

Component(s) intended to simplify react conditional rendering

<div id="top" />

## Components:

<ul>
  <li><a href="#ElseIf">ElseIf</a></li>
  <li><a href="#Switch">Switch</a></li>
  <li><a href="#TryCatch">TryCatch</a></li>
</ul>

<div id="ElseIf" />

## `ElseIf`

## How to use

| Prop       | Type      | Required/Default | Description                                                                                             |
| ---------- | --------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| if         | `boolean` | `no` / `false`   | determines if prop `render` should be rendered                                                          |
| render     | `element` | `no` / `null`    | JSX element to be rendered should `if` be true                                                          |
| conditions | `array`   | `no` / `[]`      | Array of objects: `{if: boolean, render: element}` used to determine `if/else if` conditional rendering |
| else       | `element` | `no` / `null`    | JSX element to be rendered should no provided condition be met                                          |

There are two ways of using the `ElseIf`. Either for a single `if` with an optional `else`:

Example 1

```js
import { ElseIf } from 'react-conditional-flow';

<ElseIf if={sky === blue} render={<p>Blue Skys and Sunshine!</p>} /> // else case is null by default

// or with an else
<ElseIf
  if={sky === blue}
  render={<p>Blue Skys and Sunshine!</p>} // What to render should `if` be true
  else={<p>The Sky isnt blue!?</p>} // what to render should `if` be false
  />
```

Or with an array of conditions (array of objects with the shape `{ if: bool, render: element }`).

The first `if` property inside the conditions array is used to determine which `render` should be used, all other renders are ignored.

Example 2

```js
import { ElseIf } from 'react-conditional-flow';

const myConditions = [
  { if: false, render: <p>{one}</p> }, // skipped because `if` is false
  { if: true, render: <p>{two}</p> }, // This render is used because `if` was true
  { if: true, render: <p>{three}</p> } // This condition it's checked because there was already an `if` that was true at an earlier index
];

<ElseIf conditions={myConditions} />;

// an else can still be provided in an array of conditions

const myConditions = [
  { if: false, render: <p>{one}</p> }, // skipped because `if` is false
  { if: false, render: <p>{two}</p> }, // skipped because `if` is false
  { if: false, render: <p>{three}</p> } // skipped because `if` is false
];

<ElseIf conditions={myConditions} else={<p>Nothing to see here!</p>} />; // else will render as no conditions were met
```

<a href="#top">Back to Top</a>

<div id="Switch" />

## `Switch, Case, Default`

As an alternative to using the `ElseIf` Component, you can use a combindation of `Switch`, `Case`, and `Default` components to mimick the the
JS `switch()` conditional shape except in form of JSX.

The `Switch` Component compares it's `on` property with it's `Case` children's `value` prop. The first matching result is rendered, ignoring all other `Case`(s).

## How to use

## Switch

| Prop     | Type             | Required | Description                                                                                               |
| -------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| on       | `any`            | `yes`    | variable to be compared to render child `Case` Component                                                  |
| children | `Case Component` | `yes`    | Component to be rendered when a match is found between `Case`'s `value` prop and the `Switch`'s `on` prop |

---

## Case

| Prop     | Type                     | Required | Description                                                                        |
| -------- | ------------------------ | -------- | ---------------------------------------------------------------------------------- |
| value    | `any`                    | `yes`    | determines if children should be rendered based on match with `Switch`'s `on` prop |
| children | `element` or `[element]` | `yes`    | elements to be rendered                                                            |

---

## Default (optional)

| Prop     | Type                     | Required | Description             |
| -------- | ------------------------ | -------- | ----------------------- |
| children | `element` or `[element]` | `yes`    | elements to be rendered |

---

Example 1

```js
import { Switch, Case, Default } from 'react-conditional-flow';

let switcher = 'red';

<Switch on={switcher}>
  {/* This Case will render as the value matches the Switch's {on} prop */}
  <Case value="red">
    <p>Rendering the red case</p>
  </Case>
  <Case value="blue">
    <p>Rendering the blue case</p>
  </Case>
</Switch>;

// A Default Component is optional with a Switch block, if no Default is provided and
// no Case(s) match then the Switch will render null

switcher = 'green';

<Switch on={switcher}>
  <Case value="red">
    <p>Rendering the red case</p>
  </Case>
  <Case value="blue">
    <p>Rendering the blue case</p>
  </Case>
  <Default>
    {/* The Default will render as no value matches the Switch's {on} prop */}
    <p>Im what renders by default!</p>
  </Default>
</Switch>;

// Case(s) can be given an array of values as well which will all be taken into account when searching for a match in the Switch

switcher = 'yellow';

<Switch on={switcher}>
  <Case value="red">
    <p>Rendering the red case</p>
  </Case>
  <Case value={['green', 'yellow', 'blue']}>
    {/* This Case will render as one of the values match the Switch's {on} prop */}
    <p>Rendering the green, yellow and blue case</p>
  </Case>
  <Case value="blue">
    {/* fun fact! This will never render as blue is already apart of a previous Case */}
    <p>Rendering the blue case</p>
  </Case>
  <Default>
    <p>Im what renders by default!</p>
  </Default>
</Switch>;
```

<a href="#top">Back to Top</a>

<div id="TryCatch" />

## `TryCatch`

## How to use

| Prop  | Type   | Required/Default     | Description                                                                                                              |
| ----- | ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| try   | `func` | `yes` / no default   | function that returns a Component/JSX                                                                                    |
| catch | `func` | `no` / `throw Error` | callback which is provided `(error, info)` as arguments to either render custom error handling or return a Component/JSX |

`TryCatch` is intended to reduce boiler plate with handling errors that occur with rendering.

Example 1

```js
import { TryCatch } from 'react-conditional-flow';

const renderComponentWithAPICallFailure = () => <SudoCode />;

<TryCatch
  try={renderComponentWithAPICallFailure}
  catch={(error, info) => (
    <span>
      An error has occurred! {error}: {info}
    </span>
  )}
/>;

// or without a catch. This will result in an error being thrown by the TryCatch component.
// It's best to provide a custom catch so you can do whatever specific logic you need to should something unexpected happen
<TryCatch try={renderComponentWithAPICallFailure} />;
```

<a href="#top">Back to Top</a>

## Contributing

We welcome Your interest in the American Express Open Source Community on Github. Any Contributor to
any Open Source Project managed by the American Express Open Source Community must accept and sign
an Agreement indicating agreement to the terms below. Except for the rights granted in this 
Agreement to American Express and to recipients of software distributed by American Express, You
reserve all right, title, and interest, if any, in and to Your Contributions. Please
[fill out the Agreement](https://cla-assistant.io/americanexpress/react-conditional-flow).

## License

Any contributions made under this project will be governed by the
[Apache License 2.0](./LICENSE.txt).

## Code of Conduct

This project adheres to the [American Express Community Guidelines](./CODE_OF_CONDUCT.md). By
participating, you are expected to honor these guidelines.