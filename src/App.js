import React , { Component } from "react"; // importa módulos para funcionamento do render e component
import { Switch } from "react-router-dom";
import { BrowserRouter as Router,  Route } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import TaskForm from "./components/TaskForm";
import TaskListTable from "./components/TaskListTable";

class App extends Component { // todo componente react extende Components. O REact é formatado por pedaços (components) em seu layout
  constructor(props) {
    super(props)

    this.onRefreshHandler = this.onRefreshHandler.bind(this);
  }

  onRefreshHandler() {
    this.forceUpdate();
  }

  render() {    // renderiza o componente usa o BrowserRouter para renderizar links das classes filhas
    return (
      <Router>
        <div className="App">
          <NavBar onLinkClick={this.onRefreshHandler} />
          <div className="container" style={ { marginTop: 20} }>
            <Switch>
              <Route exact path="/login" render= {() => <Login onLoginSuccess={this.onRefreshHandler} />} />
              <Route exact path="/form" component= {TaskForm } />
              <Route exact path="/form/:id" component = {TaskForm  } /> 
              <Route path="/" component = {TaskListTable } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App; // expoe para a aplicação a classe criada
