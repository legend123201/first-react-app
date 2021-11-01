import { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };

  const decrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  return (
    <div
      className="group"
      style={{
        display: "flex",
        background: "#FFFFFF",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default App;