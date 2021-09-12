import React, { Component } from 'react';
import InputBox from "./components/InputBox/InputBox.jsx"
import TodoList from './components/TodoList/TodoList.jsx';

class App extends Component {
  state = {  }
  render() { 
    return ( <div ClassName = "App">
      <InputBox></InputBox>
    <TodoList></TodoList> 
    </div>
    );
  }
}
 
export default App;
