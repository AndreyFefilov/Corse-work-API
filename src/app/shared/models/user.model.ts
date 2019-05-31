export class User {
    constructor(data: User) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.confirmEmail = data.confirmEmail;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.patronymic = data.patronymic;
        this.role = data.role;
        this.messageNotify = data.messageNotify;
        this.adNotify = data.adNotify;
        this.artifactNotify = data.artifactNotify;
        this.password = data.password;
        this.clusterId = data.clusterId;
        this.resultNotify = data.resultNotify;
    }

    id: number;
    username: string;
    email: string;
    confirmEmail: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    role: string;
    messageNotify: string;
    adNotify: string;
    artifactNotify: string;
    password: string;
    resultNotify: string;
    clusterId: number;
}
