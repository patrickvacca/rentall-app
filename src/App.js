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
      },
      edit: {
        editIndexID: 0,
        isEdit: false,
        taskText: ''
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

  editCallback = value => {
    this.setState(prevState => ({
      edit: value,
      openDialog: !prevState.openDialog
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
    let method = 'POST';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.state.edit.isEdit) {
      method = 'PATCH';
      url = `${process.env.REACT_APP_BASE_URL}/task/${this.state.edit.editIndexID}/`;
    }

    return fetch(url, {
      method: method,
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
      } else if (response.status === 200) {
        let editIndex = 0;
        for (let i = 0; i < this.state.tasks.length; i++) {
          if (this.state.tasks[i].id === this.state.edit.editIndexID) {
            editIndex = i;
            break;
          }
        }
        const updatedTasks = [...this.state.tasks];
        updatedTasks[editIndex] = this.state.task;
        console.log(updatedTasks)
        console.log(editIndex)
        console.log(this.state.task)
        this.setState(prevState => ({
          tasks: [...updatedTasks],
          alert: {
            ...prevState.alert,
            severity: 'success',
            message: 'Task successfully updated!'
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
        this.handleAlertOpen()
        throw new Error('Fields cannot be empty')
      }
      this.handleAlertOpen()
      return responseData
    })
      .then(json => this.setState({ task: json.task }))
      .then(() => {
        if (!this.state.edit.isEdit) {
          let updatedTasks = [...this.state.tasks]
          updatedTasks[updatedTasks.length - 1] = this.state.task
          this.setState(() => ({ tasks: updatedTasks }))
        } else {
          this.setState(prevState => ({
            ...prevState.edit,
            isEdit: false
          }))
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  render() {
    const dialogTitle = this.state.edit.isEdit ? `Edit Task: ${this.state.edit.taskText}` : 'Create a Task';
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
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <Task taskCallback={this.taskCallback} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            <Button color="error" onClick={this.handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dashboard tasks={this.state.tasks} alertCallback={this.alertCallback} editCallback={this.editCallback} />
      </Container >
    );
  }
}

export default App;
