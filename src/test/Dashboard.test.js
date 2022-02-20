import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import Dashboard from '../components/Dashboard';
import { act } from "react-dom/test-utils";

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

it("renders tasks data", async () => {
    const tasks = [
        {
            id: 1,
            title: 'title',
            description: 'description',
            date: '2020-01-01',
            isChecked: false
        },
        {
            id: 2,
            title: 'title2',
            description: 'description2',
            date: '2020-02-02',
            isChecked: false
        }
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(tasks)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Dashboard tasks={tasks} />, container);
    });

    expect(container.querySelectorAll('li')[0].textContent).toEqual(`${tasks[0].title} - ${tasks[0].description} | ${tasks[0].date}`);
    expect(container.querySelectorAll('li')[1].textContent).toEqual(`${tasks[1].title} - ${tasks[1].description} | ${tasks[1].date}`);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});