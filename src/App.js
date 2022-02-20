import './App.css';
import React from 'react';
import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import TaskBar from './components/TaskBar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
      alert: {
        open: false,
        severity: 'error',
        message: ''
      },
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
    let url = `${process.env.REACT_APP_BASE_URL}/tasks/`;
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

  alertCallback = value => {
    this.setState({
      alert: value
    });
  };

  handleDialogClose = () => {
    this.setState({
      openDialog: false
    });
  };

  handleAlertClose = () => {
    this.setState(prevState => ({
      alert: {
        ...prevState.alert,
        open: false
      }
    }));
  };

  handleAlertOpen = () => {
    this.setState(prevState => ({
      alert: {
        ...prevState.alert,
        open: !prevState.alert.open,
      }
    }));
  };

  handleSubmit = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/task/`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(url, {
      method: 'POST',
      accept: 'application/json',
      headers: headers,
      body: JSON.stringify(this.state.task)
    }).then(response => {
      let responseData = { 'task': {} }
      if (response.status === 201) {
        this.setState(prevState => ({
          tasks: prevState.tasks.concat(this.state.task),
          alert: {
            ...prevState.alert,
            severity: 'success',
            message: 'Task successfully created!'
          }
        }));
        this.handleDialogClose();
        responseData = response.json()
      } else {
        this.setState(prevState => ({
          alert: {
            ...prevState.alert,
            severity: 'error',
            message: 'Oops! Error creating the task...'
          }
        }));
      }
      this.handleAlertOpen()
      return responseData
    })
      .then(json => this.setState({ task: json.task }))
      .then(() => {
        let updatedTasks = [...this.state.tasks]
        updatedTasks[updatedTasks.length - 1] = this.state.task
        this.setState(() => ({ tasks: updatedTasks }))
      });
  };

  render() {
    return (
      <Container disableGutters={true} maxWidth='xl' sx={{ height: '100vh', backgroundColor: '#282C34' }}>
        <TaskBar openDialog={this.openDialog} dialogCallback={this.dialogCallback} />
        <Snackbar
          id='app-snackbar'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.alert.open}
          autoHideDuration={6000}
          onClose={this.handleAlertClose}
          sx={{ p: 4 }}
        >
          <Alert onClose={this.handleAlertClose} severity={this.state.alert.severity} sx={{ width: '100%' }}>
            {this.state.alert.message}
          </Alert>
        </Snackbar>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
        >
          <DialogTitle>Create a Task</DialogTitle>
          <DialogContent>
            <Task taskCallback={this.taskCallback} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            <Button color="error" onClick={this.handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dashboard tasks={this.state.tasks} alertCallback={this.alertCallback} />
      </Container >
    );
  }
}

export default App;
