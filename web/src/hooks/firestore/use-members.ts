import {useEffect, useState} from 'react';
import {onSnapshot, collection} from 'firebase/firestore'
import {firestore} from '../../firebase';

import ResponseType from '../../types/ResponseType';

const useMembers = (): ResponseType => {

    const [state, setState] = useState<ResponseType>({loading: true, error: false, data: []})

    useEffect(() => {

        return onSnapshot(collection(firestore, 'members'), (snapshot) => {
            const docs = snapshot.docs.map(doc => doc.data())
            setState({loading: false, data: docs, error: false})
        })

    }, [])
    return state
}

export default useMembers;
