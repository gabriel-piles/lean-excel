class Key{
    private key:string;
    readonly rowNumber: number;

    constructor(key:string){
        this.key = key;
        this.rowNumber = parseInt(key.substring(1));
    }

    valid():boolean {
        if(this.rowNumber > 50){
            return false;
        }
        const key = this.key.replace(/s/g, '');
        return !!/^[A-Z][0-9]{1,2}/.exec(key);
    }

    getRowNumber(){
        return this.rowNumber;
    }

    getColumn(){
        return this.key[0];
    }
}

export {Key};