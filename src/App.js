import React , {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Dashboard from './Components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Dashboard />
       
      </div>
    )
  }
}

export default App;