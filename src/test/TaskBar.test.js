import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import TaskBar from '../components/TaskBar';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


test('renders no dialog', () => {
    render(<TaskBar openDialog={false} />, container);
    expect(container.querySelector('.MuiTypography-root').textContent).toEqual('Dashboard');
    expect(container.querySelectorAll('[aria-label="menu"]')[0]).toBeTruthy();
    expect(container.querySelectorAll('[aria-label="menu"]')[1]).toBeTruthy();
});