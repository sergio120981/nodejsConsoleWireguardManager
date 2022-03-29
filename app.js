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
const { inquirerMenu, pausa, listFiles, createConfigFile, showInterfaceInfo, getConfirmationDeleteFile } = require("./helpers/inquirer");


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
				console.log('');
				let r;
				if(opt){
					try{
						r = await db.getFileInfo(opt);
						if(r.length==1){
							const nR = await showInterfaceInfo(r[0]);
							
							if(await db.saveInterfaceData(nR))
								console.log('Actualizado satisfactoriamente.'.green);
							else
								console.log('No se actualizo correctamente.');

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


			case 1.3:

				const opt3 = await listFiles(await db.getConfigFiles());
				if(opt3){
					
					if(await getConfirmationDeleteFile(opt3))
						try {
							if(await db.deleteFile(opt3))
								{
									console.log('');
									console.log(`Se ha eliminado con exito: ${opt3}`.green);
								}
							else
							{
								console.log('');
								console.log(`Ha ocurrido algun error eliminando el registro: ${opt3}`.red);
							}
								
						} catch (error) {
							console.log('');
							console.log(`No se pudo eliminar el registro: ${opt3}`.red);
						}

				}
				else
					console.log('No se selecciono fichero a borrar'.red);

				break;
				
			case 2:
				confFile = await listFiles(await db.getConfigFiles());
				if(confFile===0)console.log('No se ha escogido fichero de configuracion');
				break;

			case 3:

				if(confFile) {
					console.log('aqui estamos');
				}
				else{
					console.log('');
					console.log(`No se ha seleccionado ningun fichero para trabajarlo.`.red);
				}

				break;
			
		}

		if(opt)await pausa();

	}while(opt);
	console.log("");

};


main();
