import ReactDOM from 'react-dom/client';

import AppProvider from 'src/content/app.provider';
import App from 'src/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppProvider>
        <App />
    </AppProvider>
);
