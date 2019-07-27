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

    public toValues():ValuesDictionary{
        const values: ValuesDictionary = {};
        return values;
    }

    get(key: string):string {
        return '';
    }
}

export {Expressions};