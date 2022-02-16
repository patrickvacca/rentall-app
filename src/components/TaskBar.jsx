import React from 'react';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';

class TaskBar extends React.Component {
    handleClick = () => {
        this.props.dialogCallback(!this.props.openDialog);
    };

    render() {
        return (
            <Container disableGutters={true}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <DashboardIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={this.handleClick}
                        >
                            <AddBoxIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Container >
        );
    }
}

export default TaskBar;