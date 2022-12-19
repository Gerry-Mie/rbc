interface UserInterface {
    firstname: string,
    lastname: string,
    email?: string,
    dob: string,
    gender: 'male' | 'female',
    address?: string,
    phoneNumber?: string,
    photoUrl?: string
    type: 'member' | 'pastor',
    docId: string
    uid: string
}

export default UserInterface
