export class response{
    constructor(public success:boolean,public message:string){

    }
}

export class responseData extends response{
    constructor(public success:boolean,public message:string,public data:{
        name:string,
        email:string,
        mobile:string
    },public token:string){
        super(success,message);
    }
}