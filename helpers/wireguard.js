const fs = require('fs');

class WGConfig {
    _interface;
    _peers;

    constructor(){
        this._interface=[];
        this._peers=[];
    }

    loadFile(file){
        if( fs.existsSync(file) ){
            let f=fs.readFileSync(file, 'utf-8');
            let fArray=[...f.split(/\r?\n/)];

            const iStart=fArray.findIndex((linea)=>linea==['[Interface]'])+1;
            const iEnd=fArray.findIndex((linea)=>linea==['[Peer]']);
            
            const intArray=fArray.splice(iStart, iEnd-iStart);
            fArray.splice(iStart, 1);
            let key, value;

            intArray.forEach(configLine=>{
                const cL=configLine.trim();
                if(cL!==''){
                    [key, value]=cL.split(' = ');
                    this._interface[key]=value;
                }
            });

            console.log(fArray);

            //console.log(this._interface);
        }
        else {console.log('El fichero no se puede leer.');}
    }
}

module.exports=WGConfig;