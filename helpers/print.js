

const printUserInfo = (info) => {
    console.log(`${'Fichero de config'.green}      : ${info[0].interface_id}`);
    console.log(`${'Usuario'.green}                : ${info[0].usuario}`);
    console.log(`${'PublicKey'.green}              : ${info[0].publicKey}`);
    console.log(`${'AllowedIps'.green}             : ${info[0].allowedIps}`);
    console.log(`${'InterfacePrivateKey'.green}    : ${info[0].interfacePrivateKey}`);
    console.log(`${'InterfaceAdress'.green}        : ${info[0].interfaceAdress}`);
    console.log(`${'InterfaceDNS'.green}           : ${info[0].interfaceDns}`);
    console.log(`${'PeerPublicKey'.green}          : ${info[0].peerPublicKey}`);
    console.log(`${'PeerEndPoint'.green}           : ${info[0].peerEndPoint}`);
    console.log(`${'PeerAllowedIps'.green}         : ${info[0].peerAllowedIps}`);
    console.log(`${'PeerPersistentKeepAlive'.green}: ${info[0].peerPersistentKeepAlive}`);
}

module.exports={
    printUserInfo
}