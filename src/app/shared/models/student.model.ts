export class Student {
    constructor(id: number,
                email: string,
                firstName: string,
                lastName: string,
                patronymic: string,
                photoUrl: string,
                group: string,
                subGroup: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic;
    this.photoUrl = photoUrl;
    this.group = group;
    this.subGroup = subGroup;
    }

    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    photoUrl: string;
    group: string;
    subGroup: string;
}
