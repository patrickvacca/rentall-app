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
      tasks: [{
        title: 'title1',
        description: 'description1',
        date: '2019-01-01',
        isChecked: false
      }],
      task: {
        title: '',
        description: '',
        date: '',
        isChecked: false
      }
    };
  }

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
