**What is the difference between Component and PureComponent? Give an example where it might break my app?**
Component - A component is a base react component where it re-renders when something changes in its own state or through props by calling the render() method irrespective of whether the component's data is changed or not. This is every time the component updates, the child components associated with it will also re-render.

    eg.

    ```
    import React, { Component } from 'react';
    class MyComponent extends Component {
        render() {
            return <div>{this.props.text}</div>;
        }
    }
    ```

    PureComponent - This React component decides to compare within it's child component if re-render is necessary based on the changes in state or props. If props and state in a PureComponent have not changes, it will not re-render and save the computation and boost the app performance.

    eg.

    ```
    import React, { PureComponent } from 'react';

    class MyPureComponent extends PureComponent {
        render() {
            return <div>{this.props.text}</div>;
        }
    }
    ```

Scenario where it might break the app,
Consider a simple counter app, When you click a button, it will increment the counter by one.

```
    import React, { PureComponent } from 'react';

    class Counter extends PureComponent {
            constructor(props) {
            super(props);
            this.state = {
            count: 0,
        };
    }

    handleIncrement = () => {
        this.state.count += 1;
        this.setState({ count: this.state.count });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.handleIncrement}>Increment</button>
            </div>
            );
        }
    }
```

In this example, we're using PureComponent. The handleIncrement function directly mutates the count property in the state by using this.state.count += 1. Since PureComponent only does a shallow comparison, it won't detect the change in the count property because the reference to the state remains the same.

When you click the "Increment" button, the state is updated, but PureComponent doesn't realize it due to the direct mutation. As a result, the UI won't update, and you won't see the incremented value displayed on the screen.

So, Instead of doing it like this, you should create a new state object with the updated data and use that to set the state.

```
    handleIncrement = () => {
        const updatedCount = this.state.count + 1;
        this.setState({ count: updatedCount });
    };
```

**Context + ShouldComponentUpdate might be dangerous. Why is that?**

ShouldComponentUpdate helps in deciding if the component has to re-render or not based on the change in props or state of the component.
Context is something which helps in sharing data between components through a provider without passing them explicitly through props.
Context is useful for cases where data needs to be accessed by multiple components.

These both together can lead to uncertain dependencies and are tough to debug if any bugs encountered.
Using ContextAPI with useContext and useMemo offer a better solution for state management.
Using React functional components with Hooks is a much efficient thing in these times.

**Describe 3 ways to pass information from a component to its PARENT.**

a. Context API - This allows you to create a global state which can be accessed by all components without prop drilling.

b. Props Drilling - This involves passing props through multiple levels of nested components until the data is reached to the parent component. It is a bit tough to maintain and it is less efficient when the hierarchy is huge.

c. Event handling and Callbacks
The parent component can pass a an event handler or a callback function as a prop to the child component, and the child component can call this function whenever it needs to pass information back to the parent.

**Give 2 ways to prevent components from re-rendering.**

a. Use shouldComponentUpdate method for Class components
This allows you to control when a component should re-render. shouldComponentUpdate method compares the previous and current props and state.

b. React.memo() for Functional components. It automatically checks if the props have changed before re-rendering a functional component. If the props are the same, it won't re-render the component.

**What is a fragment and why do we need it? Give an example where it might break my app.**

A React Fragment is a lightweight syntax that allows you to group multiple elements together without adding an extra DOM node.
In JSX when you return multiple elements from a component's render method, they must be wrapped in a single parent element. Fragments solve this problem.
eg. import React from 'react';

```
    function MyComponent() {
        return (
            <>
                <h1>Hello</h1>
                <p>React Fragments</p>
            </>
        );
    }
```

We can avoid Layout and Styling issues, Return multiple elements and reduce the use of number of DOM elements.

Mishandling the fragment lifecycle can lead to memory leaks or app crashes.

**Give 3 examples of the HOC pattern.**

HOC is an higher order component which takes a component and returns a new component.
The 3 patterns would be
a. Authentication HOC
This is used to protect certain components from being exploited or used by unauthorized users such as a login or a signup component. If not authorised, it shows the user to l;ogin and authenticate himself.

b. Logging HOC
Lifecycle methods are one of the Logging HOCs which helps inmonitoring the lifecycle of a component if it updates or mounts or unmounts. It helps in debugging.

c.Styling HOC
Can be used to add styling or CSS classes to a component. It also allows to create reusable styles and apply them to different components

**What's the difference in handling exceptions in promises, callbacks and async await?**

a. Promises
The Promise object represents the eventual completion or failure of an asynchronous operation and its resulting value
A Promise is in one of these states:

- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation was completed successfully.
- rejected: meaning that the operation failed

Promises use .then() for success and .catch() for errors.

eg.

```
    const myPromise = new Promise((resolve, reject) => {
        const rand = Math.round(Math.random()\*100)
        if(random % 2== 0){
            resolve(rand)
            } else {
            reject(rand)
        }
    })

    myPromise
    .then((rand) => {
        console.log("success")
    })
    .catch((rand) => {
        console.log("failure")
    })
```

b. Callbacks
When using callbacks, you pass a function as an argument to an asynchronous function, and that function gets executed once the asynchronous operation is complete.

eg.

```
    const message = function() {
        console.log("This message is shown after 3 seconds");
    }
    setTimeout(message, 3000);
```

Here message is a callback function which gets called 3 seconds after the setTimeout method is executed

In callbaks, errors are handled inside a callback function

c. Async Await
The async/await syntax is built on top of Promises and provides a more synchronous-looking code structure for handling asynchronous operations. It allows you to write asynchronous code in a way that resembles synchronous code, making it easier to understand and maintain.
This uses try/catch inside the async function for both success and errors, providing a synchronous-style code.

eg.

```
    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            console.log('Data:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    fetchData();
```

**How many arguments does setState take and why is it async.**

- setState is a function which updates the state of a components
- setState takes upto 2 arguments.
- It can be an object or a callback. This callback is used to update the state which is immediately called after the setState is completed and the components get re-rendered.
- setState is async because it consists a callback function which gets executed first and at the completion of the execution, setState gets executed.

**List the steps needed to migrate a Class to Function Component.**

- Removing of lifecycle methods
- turn state variables into useState hooks
- turn event handling methods into regular functions
- render() should be returned by a return keyword
- get rid of 'this'
- updating imports into functional component imports

**List a few ways styles can be used with components.**
_a. inline styles_
`        function MyComponent(){
            return <div style={{ color: 'blue', lineHeight : 10, padding: 20 }}>Hello there</div>
        }
   `

_b. CSS modules_

```
    // Greet.module.css
    .text {
    color: blue;
    font-size: 18px;
    }
```

// component

```
    import React from 'react';
    import styles from './Greet.module.css';

    const Greet = () => {
        return <p className={styles.text}>Hello world</p>;
    };
```

_c. Styled components_

```
    const GreetStyles = styled.p`
        color: green;
        font-size: 20px;`;

    const Greet = () => {
        return <GreetStyle>Hello there</GreetStyle>;
    };
```

**How to render an HTML string coming from the server.**  
It is not recommended to parse any HTML from the server side since it makes the application vulnerable. But if it has to be done, it could be done using dangerouslySetInnerHTML method which is provided by react.
