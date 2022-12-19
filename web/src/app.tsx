import {RouterProvider} from 'react-router-dom';
import pages from './pages';
import provider from './hoc/provider';
import useOnAuthStateChanged from './hooks/auth/use-on-auth-state-changed';
import {useAppSelector} from './hooks';
import useMetaTheme from './hooks/useMetaTheme';
import Loading from './pages/loading';

const App = () => {

    useOnAuthStateChanged()
    useMetaTheme()
    const userState = useAppSelector(state => state.user.state)
    //todo
    if (userState === 'loading') return <Loading/>

    return <RouterProvider router={pages}/>
}

export default provider(App)
