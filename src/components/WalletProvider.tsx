import { ReactNode } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

// Import wallet adapters - you can add more wallets here
const wallets = [
  // Add wallet adapters here when available
];

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        aptosConnectDappId: "your-dapp-id", // Optional: Get this from Aptos Connect
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}