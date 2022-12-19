import {createBrowserRouter, Outlet} from 'react-router-dom';
import Home from './home';
import NotFound from './not-found';
import ManagementLayout from './management/layout';
import Dashboard from './management/dashboard';
import Members from './management/member/members';
import Events from './management/events';
import AddMember from './management/member/add-member';
import AddEvent from './management/add-event';
import Profile from './management/profile';
import Login from './login';

const pages = createBrowserRouter([
    {
        path: '/',
        element: <Outlet/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    },
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'management',
        element: <ManagementLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: 'members',
                element: <Members/>
            },
            {
                path: 'add-member',
                element: <AddMember/>
            },
            {
                path: 'events',
                element: <Events/>
            },
            {
                path: 'add-event',
                element: <AddEvent/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
        ]

    },
    {
        path: '*',
        element: <NotFound/>
    }
])
export default pages
