class App extends React.Component {
  render() {
    return <Todo />;
  }
}

function List(props) {
  return (
    <ul>
      <li>LIST</li>
    </ul>
  );
}

class Todo extends React.Component {
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
