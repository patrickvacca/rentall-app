import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import Task from '../components/Task';

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


test('renders input fields', () => {
    render(<Task />, container);
    expect(container.querySelectorAll('.MuiInputLabel-root')[0].textContent).toEqual('Title');
    expect(container.querySelectorAll('.MuiInputLabel-root')[1].textContent).toEqual('Description');
    expect(container.querySelectorAll('.MuiInputLabel-root')[2].textContent).toEqual('Due Date');
});