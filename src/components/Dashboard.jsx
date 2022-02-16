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
            deleteIndex: 0
        }
    };

    handleCheck = id => {
        this.setState({
            tasks: this.props.tasks.map(task => {
                if (task.title === id) {
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

    handleDeleteIndex = id => {
        this.setState({
            deleteIndex: id,
            isDelete: true
        });
    };

    handleDelete = () => {
        for (var i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i].title === this.state.deleteIndex) {
                this.props.tasks.splice(i, 1);
                break;
            }
        }
        this.handleClose();
    };

    render() {
        const listItems = this.props.tasks.map(task =>
            <Card key={`task-${task.title}`} sx={{ m: 1, p: 1 }}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                onChange={() => this.handleCheck(task.title)}
                            />
                        </ListItemIcon>
                        <ListItemText style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }} >
                            {task.title} - {task.description} | {task.date}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => this.handleDeleteIndex(task.title)} sx={{ px: 0 }}>
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