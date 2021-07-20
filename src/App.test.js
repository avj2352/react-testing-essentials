import { renderWithRouter } from './helpers/unit-test/RouterHelper';
import App from './App';

test('renders react main application', () => {
    renderWithRouter(<App/>);
});
