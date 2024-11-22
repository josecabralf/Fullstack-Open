export class CourseModel {
  constructor(id, name, parts = []) {
    this.id = id;
    this.name = name;
    this.parts = parts;
  }

  addPart = (part) => this.parts.push(part);

  total = () =>  this.parts.reduce((acc, part) => acc + part.exercises, 0);
}
  
export class CoursePartModel {
  constructor(id, name, exercises) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }
}