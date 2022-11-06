
export const LAMPORTS_PER_SOL = 1000000000;

export enum SOLANA_NETWORKS {
  MAINNET = 'mainnet-beta',
  DEVNET = 'devnet',
  TESTNET = 'testnet',
  LOCALNET = 'localnet',
}

export const getLocalNodeURL = (): string => {
  return 'http://127.0.0.1:8899';
};

export const getTestnetNodeURL = (): string => {
  return 'https://api.devnet.solana.com';
};


const getExternalSolanaNodeUrl = (network: SOLANA_NETWORKS): string => {
  if (network === SOLANA_NETWORKS.MAINNET) {
    return `${process.env.SOLANA_MAINNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.DEVNET) {
    return `${process.env.SOLANA_DEVNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.TESTNET) {
    return `${process.env.SOLANA_DEVNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.LOCALNET) {
    return `${process.env.SOLANA_LOCALNET_URL}`;
  }
  return '';
};