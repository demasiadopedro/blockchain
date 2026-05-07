import { Bloco } from "./block.interface";
import {createHmac} from 'crypto-js';


export class Blockchain{
   #chain: Bloco[] = [];
   private prefixoPow = '0';
   constructor(private readonly dificuldade= 4){
        this.#chain.push(this.criarBlocoGenesis())
   }
    private criarBlocoGenesis(): Bloco {
        const payload: Bloco['payload'] = {
            sequencia: 0,
            timestamp: Number(new Date()),
            data: 'esse é o primeiro bloco',
            hashAnterior:'',
        }


        return {
            header:{
                nonce: 0,
                hashBloco: createHmac('sha256').update(payload).digest('hex')
            }
        }
    }
}


