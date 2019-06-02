export class Course {
    constructor(courseId: number, name: string, description: string, formula: string) {
        this.id = courseId;
        this.name = name;
        this.description = description;
        this.formula = formula;
    }

    id: number;
    name: string;
    description: string;
    formula: string;
}
