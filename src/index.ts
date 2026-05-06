import { Blockchain } from "./blockchain";

const dificuldade =  Number(process.argv[2]) || 4
const blockchain = new Blockchain();

const numBlocos = Number(process.argv[3]) || 10;
let chain = blockchain.chain;

for (let i =0; i <=numBlocos; i++){
    const bloco = blockchain.criarbloco(`Bloco ${i}`);
    const mineInfo = blockchain.minerarBloco(bloco);
    chain = blockchain.enviarBloco(mineInfo.blocoMinerado)
}
console.log('----------------------------------------')
console.log(chain)