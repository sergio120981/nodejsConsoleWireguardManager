
const sqlite3 = require('sqlite3').verbose();

class BD{
    
    constructor(){
        this._db = new sqlite3.Database(process.env.WG_DB, sqlite3.OPEN_READWRITE,(err) => {
            if (err) throw ('Error de conexion a la BD: '+err.message); });
    }
    
    _query(sql, params){
        return new Promise((resolve, reject) => {
            this._db.all(sql, params==undefined ? [] : params, (err, rows) => {
              if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
              } else {
                resolve(rows);
              }
            })
        });
    }

    _run(query) {
        return new Promise((resolve, reject) => {
            this._db.run(query, (err) => {
                    if(err) reject(err.message)
                    else    resolve(true)
            })
        })    
    }

    getConfigFiles(){
        return this._query('select id from wg_interface', []);
    }

    saveInterface(data){
        const values=`'${data.id}','${data.address}',${data.listenPort},'${(data.privateKey)?data.privateKey:''}','${(data.postUp)?data.postUp:''}','${(data.postDown)?data.postDown:''}'`;
        const sql= 'insert into wg_interface values ('+values+')';
        //return(sql);
        return this._run(sql);
    }

    getFileInfo(f){
        return this._query('select * from wg_interface where id=?', [f]);
    }
}

module.exports = BD;