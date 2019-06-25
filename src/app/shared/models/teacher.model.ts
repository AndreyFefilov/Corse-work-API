export class Teacher {
    constructor(id: number,
                email: string,
                firstName: string,
                lastName: string,
                patronymic: string,
                photoUrl: string,
                main: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.photoUrl = photoUrl;
        this.main = main;
    }

    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    photoUrl: string;
    main: string;
}
