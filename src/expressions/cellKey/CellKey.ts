class CellKey{
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

    private getRange(toKey: CellKey){
        if(this.getColumn() !== toKey.getColumn()){
            return [];
        }

        const range = [];
        for (let rowNumber = this.getRowNumber(); rowNumber <= toKey.getRowNumber(); rowNumber++) {
            range.push(this.getColumn() + rowNumber);
        }

        return range;
    }

    public getNextKey() {
        const nextRow = this.getRowNumber() === 50
            ? 50
            : this.getRowNumber() + 1 ;

        return this.getColumn() + nextRow;
    }

    static getRange(rangeString: string): Array<string>{
        const keys = rangeString.split(':');
        const keyFrom = new CellKey(keys[0]);
        const keyTo = new CellKey(keys[1]);

        return  keyFrom.getRange(keyTo);
    }

}

export {CellKey};