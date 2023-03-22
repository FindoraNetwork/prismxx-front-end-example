import { NETWORK_CONFIG } from '../config';
import { ethers } from 'ethers';

export async function getEvmWallet() {
  const provider = new ethers.JsonRpcProvider(
    NETWORK_CONFIG.evmUrl,
    NETWORK_CONFIG.chainId,
  );

  const wallet = new ethers.Wallet(NETWORK_CONFIG.evmPrivate, provider);
  return wallet;
}
