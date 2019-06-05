export class Material {
    constructor(materialId: number, name: string, link: string, courseId: number) {
        this.id = materialId;
        this.name = name;
        this.link = link;
        this.courseId = courseId;
    }

    id: number;
    name: string;
    link: string;
    courseId: number;
}
