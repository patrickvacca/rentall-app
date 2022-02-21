import React from 'react';
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
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
            },
            date: today,
            categoryList: [''],
            selectedCategory: ''
        };
    };

    componentDidMount() {
        let url = `${process.env.REACT_APP_BASE_URL}/categories/`;
        let headers = new Headers();
        return fetch(url, {
            method: 'GET',
            accept: 'application/json',
            headers: headers
        }).then(response => response.json())
            .then(json => this.setState({ categoryList: json.categoryList }));
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

    handleDateChange = value => {
        let date = new Date(value);
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                date: this.parseDate(date)
            },
            date: date
        }), () => this.props.taskCallback(this.state.task));
    };

    handleCategoryChange = event => {
        const selectedValue = event.target.value;
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                category: selectedValue
            },
            selectedCategory: selectedValue
        }), () => this.props.taskCallback(this.state.task));
    };

    parseDate = date => {
        const day = new Date(date);
        const dd = String(day.getDate()).padStart(2, '0');
        const mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = day.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    render() {
        const menuItems = this.state.categoryList.map(category =>
            <MenuItem key={category.name ? category.name : 'default'} value={category.name}>
                {category.name}
            </MenuItem>
        );
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
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        renderInput={(params) => <TextField {...params} sx={{ pr: 1, width: 200 }} />}
                    />
                </LocalizationProvider>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select label='Category' value={this.state.selectedCategory} onChange={this.handleCategoryChange} msx={{ minWidth: 200 }}>
                        {menuItems}
                    </Select>
                </FormControl>
            </Paper>
        );
    }
}

export default Task;