import { BinaryLike } from "crypto";
import * as crypto from 'crypto';


export function hash(data: BinaryLike): string {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}