import { timeStamp } from "node:console";
import { Bloco } from "./block.interface";
import { hash } from "./helpers";

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
                hashBloco: hash(JSON.stringify(payload))
            },
            payload
        }
    }

    private get ultimoBloco(): Bloco{
        return this.#chain.at(-1) as Bloco
    }

    private hashUltimoBloco(): string{
        return this.ultimoBloco.header.hashBloco;
    }

    criarBloco(data:):Bloco['payload']{
        const novoBLoco: Bloco['payload'] = {
            sequencia: this.ultimoBloco.payload.sequencia + 1,
            timestamp: Date.now(),
            hashAnterior: this.hashUltimoBloco(),
            data: data
        }

        console.log(`Bloco ${novoBLoco.sequencia} criado: ${JSON.stringify(novoBLoco)}` )
        return novoBLoco;
    }
        enviarBloco(blocoMinerado: any): any {
        throw new Error("Method not implemented.");
    }
    minerarBloco(bloco: any) {
        throw new Error("Method not implemented.");
    }
}


