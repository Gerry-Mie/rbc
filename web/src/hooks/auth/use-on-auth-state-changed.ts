import {useEffect} from 'react';
import {auth, firestore} from '../../firebase';
import {onAuthStateChanged} from 'firebase/auth'
import {useAppDispatch} from '../index';
import {clear_user, set_user, set_user_state} from '../../store/slice/user.slice';
import {collection, query, where, onSnapshot} from 'firebase/firestore'
import {showNotification} from '@mantine/notifications';

const useOnAuthStateChanged = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        onAuthStateChanged(auth,  async (user) => {

            // if user is not logged in
            if (!user) return dispatch(clear_user())

            // fetch user data if user is logged in
            const colRef = collection(firestore, 'members')
            const qry = query(colRef, where('uid', '==', user.uid))

            dispatch(set_user_state('loading'))
            const token  = await user.getIdTokenResult()
            const permissions: any = token.claims

            onSnapshot(qry, (res)=> {

                if (res.empty) {
                    auth.signOut()
                    showNotification({
                        title: 'Error',
                        message: 'account error please contact support',
                        color: 'red'
                    })
                }

                const data: any =  res.docs[0].data()

                dispatch(set_user({state: 'logged-in', data, permissions}))
            })
        })
    }, [])
}

export default useOnAuthStateChanged;
