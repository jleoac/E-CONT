export class News{
    constructor(
        public _id: string,
        public date: string,
        public topic: string,
        public description: string,
        public source: string,
        public author: string,
        public link: string,
        public image: string
    ){}
};