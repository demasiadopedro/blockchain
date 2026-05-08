import { BinaryLike } from "crypto";
import * as crypto from 'crypto';


export function hash(data: BinaryLike): string {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

export function validarHash(
    {hash, dificuldade=4, prefixo= '0'}: 
    {hash: string, dificuldade: number, prefixo: string} 
): Boolean{
    const check = prefixo.repeat(dificuldade);
    return hash.startsWith(check)
}