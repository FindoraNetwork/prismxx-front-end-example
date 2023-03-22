import { ethers } from 'ethers';
import NFT721ABI from '../abis/NFT721.json';
import SimBridgeABI from '../abis/SimBridge.json';

export const getERC721Contract = ({
  address,
  wallet,
}: {
  address: string;
  wallet: ethers.Wallet;
}) => {
  return new ethers.Contract(address, NFT721ABI, wallet);
};

export const getSimBridgeContract = ({
  address,
  wallet,
}: {
  address: string;
  wallet: ethers.Wallet;
}) => {
  return new ethers.Contract(address, SimBridgeABI, wallet);
};
