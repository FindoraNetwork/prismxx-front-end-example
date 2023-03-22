import axios from 'axios';
import { ethers } from 'ethers';
import { getSimBridgeContract } from './getContract';

export default async function getPrismConfig(wallet: ethers.Wallet) {
  const result: any = await axios.get(
    'https://dev-qa01.dev.findora.org:8668/display_checkpoint',
  );

  if (!result.data?.prism_bridge_address) throw 'no prism_bridge_address';

  const bridgeAddress = result.data.prism_bridge_address;

  const prismContract = await getSimBridgeContract({
    address: bridgeAddress,
    wallet,
  });

  const [ledgerAddress, assetAddress] = await Promise.all([
    prismContract.ledger_contract(),
    prismContract.asset_contract(),
  ]);

  return { ledgerAddress, assetAddress, bridgeAddress };
}
