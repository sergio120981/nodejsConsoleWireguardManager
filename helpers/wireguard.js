const { exec } = require('child_process');

const getKeyAndPub = async () => {

    return new Promise((resolve, reject) => {
        let res;
        exec('umask 077; wg genkey | tee /tmp/key____wg | wg pubkey > /tmp/pub____wg ; cat /tmp/key____wg ; cat /tmp/pub____wg; rm /tmp/*____wg', (error, stdout, stderr) => {
        if (error) {
            reject(`error: ${error.message}`);
            return;
        }
    
        if (stderr) {
            reject(`stderr: ${stderr}`);
            return;
        }
        
        resolve(stdout.split('\n'));

        }); 
    });
}

module.exports=getKeyAndPub;