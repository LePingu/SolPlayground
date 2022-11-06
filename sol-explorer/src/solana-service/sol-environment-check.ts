import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getTestnetNodeURL, LAMPORTS_PER_SOL } from "../sol-connect/sol-connect";

export async function getVersion(): Promise<string> {
    const url = getTestnetNodeURL();
    const connection = new Connection(url, 'confirmed');
    const version = await connection.getVersion();
    return version['solana-core'];
}

export function getNewKeyPair(): KeyConfig {
    const keypair = Keypair.generate();
    const address = keypair?.publicKey.toString();
    const secret = JSON.stringify(Array.from(keypair.secretKey));
    const keyConfig: KeyConfig = {
        address: address,
        secret: secret
    }
    return keyConfig;
}

export async function fundWallet(address: string): Promise<string> {
    const url = getTestnetNodeURL();
    const connection = new Connection(url, 'confirmed');
    const airdropSignature = await connection.requestAirdrop(
        new PublicKey(address),
        1 * LAMPORTS_PER_SOL
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
    });
    return latestBlockHash.blockhash;
}