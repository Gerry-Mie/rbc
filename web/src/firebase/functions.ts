import {connectFunctionsEmulator, httpsCallable} from 'firebase/functions';
import {functions} from './index';

connectFunctionsEmulator(functions, 'localhost', 5001);


export const addMemberFunction = httpsCallable(functions, 'addMember')
export const createUserFunction = httpsCallable(functions, 'createUser')
