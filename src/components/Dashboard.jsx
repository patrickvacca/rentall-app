import React from 'react';
import {
    Button, Card, Checkbox, Chip, Dialog,
    DialogActions, DialogTitle, Grid,
    List, ListItem, ListItemButton,
    ListItemIcon, ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDelete: false,
            deleteIndexID: 0,
            edit: {
                isEdit: false,
                editIndexID: 0,
                taskText: '',
            }
        }
    };

    handleCheck = id => {
        let updatedTask = {};
        this.setState({
            tasks: this.props.tasks.map(task => {
                if (task.id === id) {
                    task.isChecked = !task.isChecked;
                    updatedTask = task
                }
                return task;
            })
        });
        let url = `${process.env.REACT_APP_BASE_URL}/task/${id}/`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const payload = {
            isChecked: updatedTask['isChecked']
        };

        return fetch(url, {
            method: 'PATCH',
            accept: 'application/json',
            headers: headers,
            body: JSON.stringify(payload)
        }).then(response => {
            let alert = {}
            if (response.status === 200) {
                alert = {
                    open: true,
                    severity: 'success',
                    message: 'Task successfully updated!'
                }
                this.handleClose();
            } else {
                alert = {
                    open: true,
                    severity: 'error',
                    message: 'Oops! Error updating the task...'
                }
            }
            this.props.alertCallback(alert);
        });

    };

    handleClose = () => {
        this.setState({
            isDelete: false
        });
    };

    handleDeleteIndexID = id => {
        this.setState({
            deleteIndexID: id,
            isDelete: true
        });
    };
    handleEdit = task => {
        const updatedEdit = {
            editIndexID: task.id,
            isEdit: true,
            taskText: `${task.title} - ${task.description} | ${task.date}`
        }
        this.setState({
            edit: updatedEdit
        }, () => this.props.editCallback(this.state.edit));
    };

    handleDelete = () => {
        let taskIDDelete = 0
        let taskIndex = 0
        for (var i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i].id === this.state.deleteIndexID) {
                taskIndex = i;
                taskIDDelete = this.state.deleteIndexID;
                break;
            }
        }

        let url = `${process.env.REACT_APP_BASE_URL}/task/${taskIDDelete}/`
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(url, {
            method: 'DELETE',
            accept: 'application/json',
            headers: headers
        }).then(response => {
            let alert = {}
            if (response.status === 204) {
                this.props.tasks.splice(taskIndex, 1);
                alert = {
                    open: true,
                    severity: 'success',
                    message: 'Task successfully deleted!'
                }
                this.handleClose();
            } else {
                alert = {
                    open: true,
                    severity: 'error',
                    message: 'Oops! Error deleting the task...'
                }
            }
            this.props.alertCallback(alert);
        });
    };

    generateKey = task => {
        let generatedKey = task.id ? task.id : task.title;
        task.id = generatedKey
        return task.id
    };

    render() {
        const listItems = this.props.tasks.map(task =>
            <Card key={`task-${this.generateKey(task)}`} sx={{ m: 1, p: 1 }}>
                <ListItem>
                    <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Chip label={task.category} />
                        </Grid>
                        <Grid item xs={0}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={task.isChecked}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={() => this.handleCheck(task.id)}
                                    />
                                </ListItemIcon>
                                <ListItemText style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }} >
                                    {task.title} - {task.description} | {task.date}
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid sx={{ mt: 1 }}>
                            <ListItemButton onClick={() => this.handleEdit(task)} sx={{ px: 0 }}>
                                <ListItemIcon sx={{ justifyContent: 'center', alignItems: 'end' }}>
                                    <EditIcon color="grey" />
                                </ListItemIcon>
                            </ListItemButton>
                        </Grid>
                        <Grid sx={{ mt: 1 }}>
                            <ListItemButton onClick={() => this.handleDeleteIndexID(task.id)} sx={{ px: 0 }}>
                                <ListItemIcon sx={{ justifyContent: 'center', alignItems: 'end' }}>
                                    <DeleteIcon color="error" />
                                </ListItemIcon>
                            </ListItemButton>
                        </Grid>
                    </Grid>
                </ListItem>
            </Card >
        );

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <List>
                    {listItems}
                </List>
                <Dialog
                    open={this.state.isDelete}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to delete this task?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} >Cancel</Button>
                        <Button autoFocus color='error' onClick={this.handleDelete}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

export default Dashboard;