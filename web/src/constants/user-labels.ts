import UserInterface from '../types/user-interface';

type UserLabels = {
    [K in keyof UserInterface]?: string
}

export const userLabels: UserLabels = {
    email: 'Email',
    phoneNumber: 'Phone Number',
    dob: "Date Of Birth",
    gender: 'Gender',
    address: 'Address',
}
