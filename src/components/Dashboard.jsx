import React from 'react';
import {
    Button, Card, Checkbox, Dialog,
    DialogActions, DialogTitle, Grid,
    List, ListItem, ListItemButton,
    ListItemIcon, ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDelete: false,
            deleteIndexID: 0
        }
    };

    handleCheck = id => {
        this.setState({
            tasks: this.props.tasks.map(task => {
                if (task.id === id) {
                    task.isChecked = !task.isChecked;
                }
                return task;
            })
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
            if (response.status === 204) {
                this.props.tasks.splice(taskIndex, 1);
                // success snackbar
                this.handleClose();
                console.log('success')
            } else {
                // error snackbar
                console.log('error')
            }
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
                    <ListItemButton>
                        <ListItemIcon>
                            <Checkbox
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
                    <ListItemButton onClick={() => this.handleDeleteIndexID(task.id)} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ justifyContent: 'center', alignItems: 'end' }}>
                            <DeleteIcon color="error" />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </Card>
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