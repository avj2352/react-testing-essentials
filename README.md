# React Testing Library

## Important Links

- [Playlist Link](https://www.youtube.com/watch?v=n_sS-GAgZ98&list=RDCMUCW5YeuERMmlnqo4oq8vwUpg&index=4)
- [Github Code](https://github.com/harblaith7/React-Testing-Library-Net-Ninja)
- [Types of Queries](https://testing-library.com/docs/queries/about/)

## What is Unit Testing

Unit testing - test a piece of code / functionality / component in complete isolation. OR to test -

_"the smallest piece of code that can be logically isolated in a system."_

- react testing library

## What is Integration Testing

Integration Tests basically test -

_Hey how are the individual piece of code / components integrating / communicating with one another_

- react testing library
- cypress js

## Rest Testing Library dependencies

```json
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
```



## Test Structure

$$
Structure \ of \ a \ Test = \begin{vmatrix}
1. & Render \ a \ component \ we \ need \ to \ test \\
2. & Find \ elements \ we \ want \ to \ interact \ with \\
3. & Interact \ with \ those \ elements \\
4. & Assert \ that \ the \ results \ are \ as \ expected \\ 
\end{vmatrix}
$$

The `Test` block can also be used as `It`

```javascript
test('Test Scenario', () => {});
// OR
it ('Test Scenario', () => {});
```

### Step 1: Render a component we need to test

```javascript
import { render } from '@test-library/react';
...

test('Render a component', () => {
  render(<App/>);
});

```

# Get vs Find vs Query

## 1. Queries: Get.... 

[Link: Types of Queries](https://testing-library.com/docs/queries/about/)

- **Single Elements**
  - `getBy...`: Returns the matching node for a query, and throw a descriptive error if no elements match *or* if more than one match is found (use `getAllBy` instead if more than one element is expected).
  - `queryBy...`: Returns the matching node for a query, and return `null` if no elements match. This is useful for asserting an element that is not present. Throws an error if more than one match is found (use `queryAllBy` instead if this is OK).
  - `findBy...`: Returns a Promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms. If you need to find more than one element, use `findAllBy`.
- **Multiple Elements**
  - `getAllBy...`: Returns an array of all matching nodes for a query, and throws an error if no elements match.
  - `queryAllBy...`: Returns an array of all matching nodes for a query, and return an empty array (`[]`) if no elements match.
  - `findAllBy...`: Returns a promise which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of **1000ms**
    - `findBy` methods are a combination of `getBy*` queries and [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async#waitfor). They accept the`waitFor` options as the last argument (i.e. `await screen.findByText('text', queryOptions, waitForOptions)`)

- All three methods / selectors are part of the `screen` object in react testing library
- 90% of the time we use `getBy...` or `getAllBy..` over `find` ... or `query`

![table](./design/get-find-query-table.jpg)

### 1. getByRole, getAllByRole

`getByRole()` takes in a string - "heading" (h1 - h6) / "paragraph" (p)

```javascript
describe("Header", () => {
    it('should render same text passed into title prop', async () => {
        render(
            <Header 
              title="todo"
            />
        );
        const hElement = screen.getByRole("heading");
        expect(hElement).toBeInTheDocument(); // true
    });
});
```

> **NOTE:** getByRole also takes in 2 arguments - to be more specific

		#### Example 1: 

The getByRole (with a second parameter - name) applies different for different components. in Headers, for example - it looks for `aria-label` accessor attribute

```javascript
// Header.js
export default function Header({
    title
}) {
    return (
        <>
      			{/*Passing an accessible property - aria-label*/}
            <h1 title="Header" className="header" aria-label='edit'>{title}</h1>
            <h3 data-testid="header-2" className="header">Hello</h3>
        </>
    )
}

// Header.test.js
describe("Header", () => {
    it ('should check if there is a header with an accessible name / description', async () => {
        render(
            <Header 
              title="todo"
            />
        );
      	// Checks for h1 with aria-label
        const hElement = screen.getByRole("heading", {name: /edit/i});
        expect(hElement).toBeInTheDocument(); // true
    });
});
```

#### Example 2:

In buttons for example - it looks for the text of the button

```javascript
// Button.js
...
<button>Text Button</button>
...
// Button.test.js
...
screen.getByRole('button', {
  name: /text button/i
}
...
```

---

> **NOTE:** getByRole, returns `error` if there are multiple headers (>1) with same selector attributes . You need to use `getAllByRole()` instead - which returns an array

```javascript
describe("Header", () => {
    it('should render same text passed into title prop', async () => {
        render(
            <Header 
              title="todo"
            />
        );
        const hElements = screen.getAllByRole("heading");
        expect(hElements.length).toBe(2);
    });
});
```

---

### 2. getByText()

#### Example 1:

The `getByText()` also for instance, has 1 parameter

```javascript
// Button.js
...
<button>Sign up for free</button>
...

// Button.test.js
const button = screen.getByText(/Sign up for free/i);
expect(button).toBeInTheDocument(); // true
```

#### Example 2:

The `getByText()` also takes in a second parameter `{selector: 'button'}`. The following example is more precise test of button component

```javascript
// Button.js
...
<button>Sign up for free</button>
...

// Button.test.js
const button = screen.getByText(/Sign up for free/i, {selector: 'button'});
expect(button).toBeInTheDocument(); // true
```

#### Example 3:

The `getByText()` can also be chained with the `closest('button')` method like so. the following example is JUST as SAME as the above example.

```javascript
// Button.js
...
<button>Sign up for free</button>
...

// Button.test.js
const button = screen.getByText(/Sign up for free/i).closest('button');
expect(button).toBeInTheDocument(); // true
```

# Priority

### Priority Table when using selectors + attributes

|            Testing Priority            |
| :------------------------------------: |
| **Priority 1: Accessible by Everyone** |
|              getByRole()               |
|            getByLabelText()            |
|         getByPlaceholderText()         |
|              getByText()               |
|    **Priority 2: Semantic Queries**    |
|             getByAltText()             |
|              getByTitle()              |
|        **Priority 3: Test ID**         |
|             getByTestID()              |



Based on [the Guiding Principles](https://testing-library.com/docs/guiding-principles), your test should resemble how users interact with your code (component, page, etc.) as much as possible. With this in mind, we recommend this order of priority:

### 1. Queries Accessible to Everyone

> Most (if not all) of your test scripts should be using this category selectors

   Queries that reflect the experience of visual/mouse users as well as those that use assistive technology.

   1. `getByRole`: This can be used to query every element that is exposed in the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/AOM). With the `name` option you can filter the returned elements by their [accessible name](https://www.w3.org/TR/accname-1.1/). This should be your top preference for just about everything. There's not much you can't get with this (if you can't, it's possible your UI is inaccessible). Most often, this will be used with the `name` option like so:`getByRole('button', {name: /submit/i})`. Check the [list of roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles).
   2. `getByLabelText`: This method is really good for form fields. When navigating through a website form, users find elements using label text. This method emulates that behavior, so it should be your top preference.
   3. `getByPlaceholderText`: [A placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/). But if that's all you have, then it's better than alternatives.
   4. `getByText`: Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (like divs, spans, and paragraphs).
   5. `getByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.

### 2. Semantic Queries

> Used rarely in cases of - images, area & input elements

HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.
    
1. `getByAltText`: If your element is one which supports `alt` text (`img`, `area`, and `input`), then you can use this to find that element.

2. `getByTitle`: The title attribute is not consistently read by screenreaders, and is not visible by default for sighted users

### 3. Test IDs

> Should be last priority

   1. `getByTestId`: The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).

```javascript
// Button.js
<button data-testid="test-01">This is a test button</button>

// Button.test.js
const button = screen.getByTestId('test-01');
expect(button).toBeInTheDocument(); // true
```

---

## 2. Queries: Find.... 

the difference between Get vs Find vs Query is in their **return types**

| Get                                                          | Find                                                         | Query                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `error` if no match / match exceeds more than one (use getAll...) | `error` if no match / match exceeds more than one (use findAll...) | `null` if no match & `error` match exceeds more than one (use queryAll...) |
| Async: false (is synchronous) - no `await`                   | Async: true (is asynchronous) - use `await` and `async` on the test block | Async: false (is synchronous) - no `await`                   |
| Used for static components (without async calls)             | Used for components which load on async calls                | used for negative testing scenarios<br />**not**.toBeInTheDocument(); |

```javascript
import { render, fireEvent, screen } from '@testing-library/react'

test('loads items eventually', async () => {
  render(<Page />)

  // Click button
  fireEvent.click(screen.getByText('Load'))

  // Wait for page to update with query text
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)
})
```

## 3. Queries: Query...

```javascript
describe("Header", () => {
    it('should not contain any header with text - idiot', async () => {
        render(
            <Header 
              title="todo"
            />
        );
        const hElement = screen.queryByText(/idiot/i);
        expect(hElement).not.toBeInTheDocument(); // true
    });
});
```

# Assertions

