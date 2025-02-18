export interface User {
    firstName: string;
    lastName: string;
    address: {
        street: string;
        flatNumber: string;
        postalCode: string;
        city: string;
    };
    phoneNumber: string;
    email: string;
    password: string;
}

export const TEST_USER: User = {
    firstName: 'Tester',
    lastName: 'McTest',
    address: {
        street: 'Aleje Jerozolimskie',
        flatNumber: '1a',
        postalCode: '00-495',
        city: 'Warsaw',
    },
    phoneNumber: '+48 001 010 100',
    email: 'shstoretest2@gmail.com',
    password: '',  // substitute to run tests locally
}
