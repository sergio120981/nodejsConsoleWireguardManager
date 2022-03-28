#!/usr/bin/node

/*
if(process.env.USER!="root"){
	console.log("Se debe ejecutar como root o sudo");
	return;
}

*/
require("colors");
require('dotenv').config();

const BD = require("./db/db");
const { inquirerMenu, pausa, listFiles, createConfigFile, showInterfaceInfo } = require("./helpers/inquirer");


const main = async () => {

	let opt=0;
	let confFile='';

	const db=new BD;

	do{
	
		opt = await inquirerMenu();
		

		switch (opt){
			case 1: break;

			case 1.1:

				let resp = await createConfigFile();
				try{
					let q = await db.saveInterface(resp);
					if(q)console.log('Completado con exito.'.green);
					else console.log('Algo raro paso'.red);
				}
				catch(err){
					console.log('Errores detectados en la insercion.'.red);
				}

				break;


			case 1.2:

				const opt = await listFiles(await db.getConfigFiles());
				let r;
				if(opt){
					try{
						r = await db.getFileInfo(opt);
						if(r.length==1){
							const nR = await showInterfaceInfo(r[0]);
							console.log(nR);
						}
						else
							console.log('No se cuenta 1 registro en la captura de informacion, opt 1.2.'.red);
					}
					catch(err){
						throw err;
						console.log('Errores detectados en la busqueda de FILE.'.red);
					}
					
					//console.log(r);
				}

				break;
				showInterfaceInfo

				confFile = await listFiles(await db.getConfigFiles());
				if(confFile===0)console.log('No se ha escogido fichero de configuracion');
				break;
			
		}

		if(opt)await pausa();

	}while(opt);
	console.log("");

};


main();
