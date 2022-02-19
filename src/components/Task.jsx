import React from 'react';
import { Paper, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

class Task extends React.Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            task: {
                title: '',
                description: '',
                date: this.parseDate(today),
                isChecked: false
            }
        };
    };

    handleTitleChange = e => {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                title: e.target.value
            }
        }), () => this.props.taskCallback(this.state.task));
    };

    handleDescriptionChange = e => {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                description: e.target.value
            }
        }), () => this.props.taskCallback(this.state.task));
    };

    handleTimeChange = value => {
        let date = new Date(value);
        date = this.parseDate(date)
        this.setState(() => ({
            datetime: date
        }));
    };

    parseDate = date => {
        const day = new Date(date);
        const dd = String(day.getDate()).padStart(2, '0');
        const mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = day.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    render() {
        return (
            <Paper elevation={0} style={{ textAlign: "center" }} sx={{ pt: 1 }}>
                <TextField
                    id="task-title"
                    label="Title"
                    variant="outlined"
                    sx={{ pb: 2, pr: 1, width: 200 }}
                    onChange={this.handleTitleChange}
                />
                <TextField
                    id="task-description"
                    label="Description"
                    multiline
                    rows={1}
                    sx={{ pb: 2, pr: 1, width: 200 }}
                    onChange={this.handleDescriptionChange}
                />
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        label="Due Date"
                        inputFormat="dd/MM/yyyy"
                        value={this.state.datetime}
                        onChange={this.handleTimeChange}
                        renderInput={(params) => <TextField {...params} sx={{ pr: 1, width: 200 }} />}
                    />
                </LocalizationProvider>
            </Paper>
        );
    }
}

export default Task;