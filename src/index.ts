import * as dotenv from 'dotenv';
dotenv.config();

import { getEvmWallet } from './utils/getWallet';
import { evmToNativeOfFRC721 } from './prism';
import { NETWORK_CONFIG } from './config';

async function main() {
  console.log('Get Wallet...');
  const evmWallet = await getEvmWallet();

  await evmToNativeOfFRC721(
    'fra1w99qlz0du6r76c6ketqz3tz2wcfe0xsl0ez5qa6t09muu92srtaswah8wa', // fra wallet address
    evmWallet, // evm wallet classes
    NETWORK_CONFIG.tokens.FRC721, // erc721 contract address
    '15', // erc721 nft tokenID
  );

  console.log('End!');
}

main().catch((err) => console.log(err.message));
