import { ethers } from 'ethers';
import * as bech32ToBuffer from 'bech32-buffer';
import { getERC721Contract, getSimBridgeContract } from '../utils/getContract';
import getPrismConfig from '../utils/getPrismConfig';

export const fraAddressToHashAddress = (address: string) => {
  const { data, prefix } = bech32ToBuffer.decode(address);
  if (prefix == 'eth') {
    return '0x01' + Buffer.from(data).toString('hex');
  }
  return '0x' + Buffer.from(data).toString('hex');
};

export async function evmToNativeOfFRC721(
  nativeWallet: string,
  evmWallet: ethers.Wallet,
  assetCode: string,
  tokenId: string,
) {
  const findoraTo = fraAddressToHashAddress(nativeWallet);

  const { bridgeAddress, ledgerAddress } = await getPrismConfig(evmWallet);

  const erc721Contract = await getERC721Contract({
    address: assetCode,
    wallet: evmWallet,
  });

  const prismContract = await getSimBridgeContract({
    address: bridgeAddress,
    wallet: evmWallet,
  });

  const ownerOf = await erc721Contract.ownerOf(tokenId);
  if (ownerOf !== evmWallet.address) throw 'not tokenId';

  const tsxApprove = await erc721Contract.approve(ledgerAddress, tokenId);
  const resultApprove = await tsxApprove.wait();

  if (resultApprove.status == 1) {
    const tsxDeposit = await prismContract.depositFRC721(
      assetCode,
      findoraTo,
      tokenId,
    );
    const resultDeposit = await tsxDeposit.wait();
    console.log(`Tsx Hash: ${resultDeposit.hash}`);
  }
}
