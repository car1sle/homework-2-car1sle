import './App.css';
import { useRef, useState } from 'react';

// Single prop (passing a string)
const MyButton = ({label}) => {
  return <button>{label}</button>
};

// Using children (passing a string)
const MyButton2 = ({children}) => {
  return <button>{children}</button>
};

// Using children (passing a full node)
const MyButton3 = ({children}) => {
  return <button>{children}</button>
};

// Pass a single prop AND full node with children
const Panel = ({title, children}) => {

  const headingAlt = (1 + 1 === 2) ? 'headingAlt' : 'heading';

  return (
    <>
      {/* inline className */} 
      <h1 className="heading">{title}</h1>
      {/* external className */}
      <h2 className={headingAlt}>I'm turquoise</h2>
      {children}
    </>
  ); 
};

// Use event handler
const ClickableButton = ({onClick, buttonText}) => {
  return <button onClick={onClick}>{buttonText}</button>
};

// Render a collection
const MyList = ({title, items}) => {

  const ListItem = ({id, name, index}) => {
    const ListItemStyle = {
      borderBottom: `${index +1}px solid hotpink`,
    };
    return <div id={id} style={ListItemStyle}>{name}{id}</div>
  };

  // convert JSON to HTML
  const renderedItems = items
    // only odd numbers
    .filter((item, index) => index % 2)
    .map((item, index) => {
    // skip the first one
    if (index === 0) return null;
    // the KEY should be in child's outermost element
    // can use index for key, not ideal because easily leads to re-renders
    return <ListItem key={item.id} id={item.id} name={item.name} index={index} />

    // OR COULD WRITE IT AS:
    // const isFirst = index === 0;
    // return isFirst ? null : <ListItem key={item.id} id={item.id} name={item.name} index={index} />
  })

  // Create class object of styles
  const RenderedItemsStyle = {
    mono: {
      fontFamily: 'Courier',
    },
    purple: {
      color: 'purple',
    },
  };

  return ( 
  <>
  {/* inline styles */}
    <h3 style={{
      color:'green',
      textTransform: 'uppercase',
    }}>{title}</h3>
    {/* merge two class objects */}
    <span style={{
      ...RenderedItemsStyle.mono,
      ...RenderedItemsStyle.purple,
    }}>{renderedItems}</span>
  </>
  );
};


const App = props => {

  // This could be coming from an API
  const collection = [
    {
      id: 0,
      name: "Test"
    },
    {
      id: 1,
      name: "Test"
    },
    {
      id: 2,
      name: "Test"
    },
    {
      id: 3,
      name: "Test"
    },
    {
      id: 4,
      name: "Test"
    },
    {
      id: 5,
      name: "Test"
    }
  ]

  // This could be coming from an API
  const loggedUser = {
    name: 'Carly',
  };

  // OK to use const here, because always calling the setter to modify the first arg
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [value, setValue] = useState('');
  // Stick to one value inside of useState
  // CAN put an object inside useState, but not recommended

  const myVariable = useRef('initial value');
  const inputRef = useRef('');

  // JSX allows you to use constructs like: 
  // return <div>Hello World</div>;
  // If returning multiline HTML, wrap in parens
  return (
    <div>
      <MyButton label="Button1" />

      <MyButton2>Button2</MyButton2>

      <MyButton3>
        <b>Button3</b>
      </MyButton3>

      <Panel title="I'm a title">
        <p>I'm a paragraph</p>
      </Panel>

      <ClickableButton buttonText="Click me!" onClick={() => {console.log('You clicked');}} />

      <MyList title="I'm the list title" items={collection} />

      {loggedUser && `Hello ${loggedUser.name}`}
      {!loggedUser && 'Log in'}

      <br />

      {/* useState V1:
      receive the new value */}
      <button onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment useState V1 {count}
      </button>

      {/* useState V2:
      receive a function that receives the current value and returns the new value */}
      <button onClick={() => {
          setCount2(c => {
            return c + 1;
          });
        }}
      >
        Increment useState V2 {count2}
      </button>

      {/* useState V3: toggle a class */}
      <div className={value}></div>
      <button onClick={() => {
        setValue('my-class');
      }}>
        Add class with useState
      </button>
      
      <br />

      {/* useRef: Clicking this does not cause the component to re-render
      but the variable value does change
      If you click this then the Increment buttons above, you'll see the new myVariable.current */}
      <button onClick={() => {
        myVariable.current = 'modified value';
      }}
      >
        useRef button: {myVariable.current}
      </button>

      <br />

      <input ref={inputRef} />
      <button onClick={() => {
        inputRef.current.focus();
      }}
      >
        Focus with useRef
      </button>

    </div>
  );
};

export default App;