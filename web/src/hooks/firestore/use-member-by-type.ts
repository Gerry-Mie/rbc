import {useEffect, useState} from 'react';
import {collection, onSnapshot, where, query} from 'firebase/firestore';
import {firestore} from '../../firebase';
import ResponseType from '../../types/ResponseType';

type Prop = 'member'|'pastor'
const useMemberByType = (type:Prop):ResponseType => {

    const [state, setState] = useState<ResponseType>({loading: true, error: false, data: []})

    useEffect(() => {

        const collectionRef = collection(firestore, 'members')
        const qry = query(collectionRef, where('type','==', type))

        return onSnapshot(qry, (snapshot) => {
            const docs = snapshot.docs.map(doc => doc.data())
            setState({loading: false, data: docs, error: false})
        })

    }, [])
    return state
}

export default useMemberByType;
