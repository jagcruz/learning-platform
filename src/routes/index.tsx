import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';
import RootPage from 'src/pages/RootPage';
import LexicalPage from 'src/pages/LexicalPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/home' replace />
            },
            {
                path: '*',
                element: <SidebarLayout />,
                children: [
                    { path: 'home', element: <RootPage /> },
                    { path: 'lexical', element: <LexicalPage /> }
                ]
            }
        ]
    }
];

export default routes;
