import React from 'react';
import ReactDOM from 'react-dom';
import LocationInstancePage from './LocationInstancePage';

it('Location instance renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        params: {
            tablename: "states",
            id: "01",
        }
    }
    ReactDOM.render(<LocationInstancePage match={match}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
