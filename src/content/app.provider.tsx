import type { FC, ReactNode } from 'react';
import { StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';
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
            <HashRouter>
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
            </HashRouter>
        </StrictMode>
    );
};

export default AppProvider;
