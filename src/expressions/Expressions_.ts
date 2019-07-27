export interface ExpressionsDictionary {
    [index: string]: string;
}

export interface ValuesDictionary {
    [index: string]: string;
}


class Expressions{
    private cellExpressions: ExpressionsDictionary = {};

    public set(key:string, expression:string){

    }

    public toValues(){
        const values: ValuesDictionary = {};
        return values;
    }
}

export {Expressions};