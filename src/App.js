import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import TaskBar from './components/TaskBar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
      tasks: [],
      task: {
        title: '',
        description: '',
        date: '',
        isChecked: false
      }
    };
  }

  componentDidMount() {
    let url = 'https://rentall-challenge-service.herokuapp.com/tasks/'
    let headers = new Headers();
    return fetch(url, {
      method: 'GET',
      accept: 'application/json',
      headers: headers
    }).then(response => response.json())
      .then(json => this.setState({ tasks: json.taskList }));
  };

  taskCallback = value => {
    this.setState(() => ({
      task: value
    }));
  };

  dialogCallback = value => {
    this.setState(() => ({
      openDialog: value
    }));
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  handleSubmit = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(this.state.task)
    }));
    this.handleClose();

    let url = 'https://rentall-challenge-service.herokuapp.com/task/'
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(url, {
      method: 'POST',
      accept: 'application/json',
      headers: headers,
      body: JSON.stringify(this.state.task)
    }).then(response => response.json())
      .then(json => this.setState({ task: json.task }))
      .then(() => {
        let updatedTasks = [...this.state.tasks]
        updatedTasks[updatedTasks.length - 1] = this.state.task
        this.setState(() => ({ tasks: updatedTasks }))
      });
  };

  render() {
    return (
      <Container disableGutters={true} sx={{ backgroundColor: '#282C34' }}>
        <TaskBar openDialog={this.openDialog} dialogCallback={this.dialogCallback} />
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
        >
          <DialogTitle>Create a Task</DialogTitle>
          <DialogContent>
            <Task taskCallback={this.taskCallback} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            <Button color="error" onClick={this.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dashboard tasks={this.state.tasks} />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Container >
    );
  }
}

export default App;
