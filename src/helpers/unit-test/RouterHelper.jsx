import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import React from 'react';

export function renderWithRouter(ui) {
    return {
       ...render(<Router basename="/">{ui}</Router>)
    };
}