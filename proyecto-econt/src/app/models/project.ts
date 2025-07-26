export class Project{
    constructor(
        public _id: string,
        public topic: string,
        public description: string,
        public start_date: string,
        public end_date: string,
        public coach: string,
        public image: string
    ){}
};