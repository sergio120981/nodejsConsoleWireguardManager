const inquirer = require("inquirer");
let fs=require('fs');
const { red, green } = require("colors");
const { resolve } = require("path");
require("colors");

const inquirerMenu=async()=>{
    console.clear();
    console.log('========================='.green);
    console.log('  SELECCIONE UNA OPCION  '.yellow);
    console.log('========================='.green);

	const preguntas=[{
	    type: "list",
	    name: "opcion",
	    message: "Que desea hacer?",
	    choices:[
            
            {
                name: `${'1. '.green} Gestionar fichero de configuracion.`
            },
            {
                value: 1.1,
                name: `${'1.1. '.green} Crear fichero de configuracion.`
            },
            {
                value: 1.2,
                name: `${'1.2. '.green} Modificar fichero de configuracion.`
            },
            {
                value: 1.3,
                name: `${'1.3. '.green} Eliminar fichero de configuracion.`
            },
            {
                value: 2,
                name: `${'2. '.green} Seleccionar fichero de configuracion.`
            },
            {
                value: 3,
                name: `${'3. '.green} Configurar Peer.`
            },
            {
                value: 4,
                name: `${'4. '.green} .`
            },
            {
                value: 5,
                name: `${'5. '.green} .`
            },
            {
                value: 6,
                name: `${'6. '.green} .`
            },
            {
                value: 0,
                name: '0. Salir'.red
            }
	    ]
	}];

    const {opcion}= await inquirer.prompt(preguntas);
    return opcion;
}


const pausa = async () => {

    const question = [
        {
            type: "input",
            name: 'enter',
            message: 'Presione '+'ENTER'.red+' para continuar'
        }
    ];

    const {enter}=await inquirer.prompt(question);
    return enter;
};

const listarFicherosWG= async( arrayFiles ) => {
    console.clear();

    let choices=[];
    JSON.parse(arrayFiles).forEach(element => {
        choices.push({value: element, name: element});
    });
    
	const preguntas=[{
	    type: "list",
	    name: "opcion",
	    message: "Selecciones el fichero de configuracion?",
	    choices}];

    const {opcion}= await inquirer.prompt(preguntas);
    return opcion;    
}


const listFiles= async( arrayFiles ) => {
    //console.clear();

    let choices=[];
    
    arrayFiles.forEach(row=>{
        choices.push({value: row.id, name: row.id});
    })

    choices.push({value: 0, name: red('Cancelar')});

	const preguntas=[{
	    type: "list",
	    name: "opcion",
	    message: "Seleccione el fichero de configuracion: ".green,
	    choices}];
    console.log('');
    const {opcion}= await inquirer.prompt(preguntas);
    
    return opcion;    
}

    const createConfigFile = async ()=> {
        const question = [
            {
                type: "input",
                name: 'id',
                message: 'Ruta del fichero de configuracion: ',
                validate(value){
                    if(value.length===0){
                        return 'Ingrese un valor';
                    }
                    //agregar mas condiciones a la creacion del fichero en el fs
                    return true;
                }
            },
            {
                type: "input",
                name: 'address',
                message: 'Address: ',
                validate(value){
                    if(value.length===0){
                        return 'Ingrese un valor';
                    }
                    /// restriccion de segmento IP
                    return true;
                }
            },
            {
                type: "input",
                name: 'listenPort',
                message: 'ListenPort (51820 default): ',
                default: 51820
            },
            {
                type: "input",
                name: 'privateKey',
                message: 'PrivateKey: '
            },
            {
                type: "input",
                name: 'postUp',
                message: 'PostUp: '
            },
            {
                type: "input",
                name: 'postDown',
                message: 'PostDown: '
            }
        ];
        const resp=await inquirer.prompt(question);
        return resp;
    };

    const showInterfaceInfo = async (info) => {
        const question = [
            {
                type: "input",
                name: 'address',
                message: 'Address: ',
                default: info.address,
                validate(value){
                    if(value.length===0){
                        return 'Ingrese un valor';
                    }
                    /// restriccion de segmento IP
                    return true;
                }
            },
            {
                type: "input",
                name: 'listenPort',
                message: 'ListenPort: ',
                default: info.listenPort
            },
            {
                type: "input",
                name: 'privateKey',
                message: 'PrivateKey: ',
                default: info.privateKey
            },
            {
                type: "input",
                name: 'postUp',
                message: 'PostUp: ',
                default: info.postUp
            },
            {
                type: "input",
                name: 'postDown',
                message: 'PostDown: ',
                default: info.postDown
            }
        ];
        console.log('');
        console.log('...Correccion de la configuracion del fichero...'.green);
        console.log(green(info.id));
        console.log('');
        const resp = await inquirer.prompt ( question );
        resp['id']=info.id;
        return resp;
    }

    const getConfirmationDeleteFile = async( file ) => {
        const question = [
            {
                type: "confirm",
                name: 'confirm',
                message: 'Seguro que desea eliminar el registro correspondiente a: '.green+file,
            }];
        console.log('');
        const resp = await inquirer.prompt ( question );
        return resp;
    }

module.exports={
	inquirerMenu,
	pausa,
    listarFicherosWG,
    listFiles,
    createConfigFile,
    showInterfaceInfo,
    getConfirmationDeleteFile
};
