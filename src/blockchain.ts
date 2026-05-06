export interface Bloco{
    header : {
        nonce: number
        hashBloco: string
    }
    payload: {
        sequencia: number
        timestamp: number
        data: any
        hashAnterior: string
    }
}
