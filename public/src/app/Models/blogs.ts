export class Blog{
    constructor(public data:{
        data:{
        }
    }){

    }
}

export class blogName{
    constructor(public name:string ,public blog:{}){

    }
}

export class blogCom{
    constructor(public blogId:string,public comment:{
        name:string,
        comment:string
    }){

    }
}