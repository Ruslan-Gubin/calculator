import ReactDOM from 'react-dom/client';
import App from './app/App';

import './app/styles/globals.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);


