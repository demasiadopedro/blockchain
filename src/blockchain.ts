import { Bloco } from "./block.interface";

export class Blockchain{
   #chain: Bloco[] = [];
   private prefixoPow = '0';
   constructor(private readonly dificuldade= 4){
        this.#chain.push(this.criarBlocoGenesis())
   }
    private criarBlocoGenesis(): Bloco {
        const payload = {
            sequencia: 0,
            timestamp: Number(new Date()),
            dados: 'esse é o primeiro bloco',
            hashAnterior:'',
        }
        throw new Error("Function not implemented.");
    }
}


