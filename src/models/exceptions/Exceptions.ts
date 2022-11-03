export class InternalServerError extends Error{
    constructor(msg: string){
        super(msg)
        Object.setPrototypeOf(this, InternalServerError.prototype)
    }
}