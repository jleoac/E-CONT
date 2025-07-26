//En esta carpeta models, van todos los modelos de formularios que queremos usar, dependiendo de la opción que escojamos:
export class Login{
    constructor(
        public _id: string,
        public user: string,
        public password: string,
    ){}
};