import * as operSystem from 'node:os';
import { osConstants } from "../osConstants.js";


export const os = async (option) => {
    try{
        switch(option){
            case osConstants.eol: {
                console.log(operSystem.EOL);
                break;
            }
            case osConstants.architecture: {
                console.log(operSystem.arch());
                break;
            }
            case osConstants.homedir: {
                console.log(operSystem.homedir());
                break;
            }
            case osConstants.cpus: {
                console.log(operSystem.cpus());
                break;
            }
            case osConstants.username: {
                console.log(operSystem.userInfo().username);
                break;
            }
        }
    } catch (err){
        throw err;
    }
}