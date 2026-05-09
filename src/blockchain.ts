import { timeStamp } from "node:console";
import { Bloco } from "./block.interface";
import { hash, validarHash } from "./helpers";
import { Blob } from "node:buffer";

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

    minerarBloco(bloco: Bloco['payload']) {
        let nonce: number = 0;
        let inicio: number = Date.now();
        while(true) {
            const hashBloco = hash(JSON.stringify(bloco));
            const hashPow = hash(hashBloco + nonce);
            if(validarHash({hash:hashPow, dificuldade: this.dificuldade, prefixo: this.prefixoPow})){
                const final: number= Date.now();
                const hashReduzido = hashBloco.slice(0,12)
                const tempoMinerado= (final -inicio) /1000;
                console.log(`Bloco #${bloco.sequencia} minerado em ${tempoMinerado}s.`)
                console.log(`hash reduzido: ${hashReduzido}`)
                console.log('Tentativas:', nonce)
                return { 
                    blocoMinerado:{
                        payload: {
                            ...bloco
                        },
                        header: {
                            nonce: nonce,
                            hashBloco: hashBloco
                        }
                    }
                }
            }
            nonce++
        }


    }
    enviarBloco(blocoMinerado: Bloco): Bloco[] {
        if(verificarBloco( blocoMinerado)) {
            this.#chain.push(blocoMinerado)
            console.log(`O Bloco ${blocoMinerado.payload.sequencia} a Blockchain: ${JSON.stringify(blocoMinerado, null,2)}`)
        }
        return this.#chain;
    }
     
}


