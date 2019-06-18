const contextAPI = React.createContext();
function Description() {
  return (
    <contextAPI.Consumer>
      {(name) =>
      (
        <div>
          <p>{name}</p>
        </div>
      )
      }
    </contextAPI.Consumer>
  );
}
class App extends React.Component {
  render() {
    const name = "yashwanth";
    const role = "developer";
    return (
      <contextAPI.Provider value={name}>
        <div>
          <p>Hey there</p>
          <Description />
        </div>
      </contextAPI.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("contextapiexample"));
