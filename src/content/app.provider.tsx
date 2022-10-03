import type { FC, ReactNode } from 'react';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Zoom from '@mui/material/Zoom';

import { i18n } from 'src/content/i18n';

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const activeLanguageKey = i18n.language;

    if (!activeLanguageKey || activeLanguageKey === '' || activeLanguageKey === null) {
        i18n.changeLanguage('en');
    }

    return (
        <StrictMode>
            <BrowserRouter>
                <SnackbarProvider
                    maxSnack={6}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    TransitionComponent={Zoom}
                >
                    {children}
                </SnackbarProvider>
            </BrowserRouter>
        </StrictMode>
    );
};

export default AppProvider;
