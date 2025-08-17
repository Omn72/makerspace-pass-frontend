import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Initialize Aptos client for testnet
const config = new AptosConfig({ network: Network.TESTNET });
export const aptos = new Aptos(config);

// Smart contract address - you'll need to deploy your Move module and update this
export const MODULE_ADDRESS = "0x1"; // Replace with your deployed module address
export const MODULE_NAME = "MyModule";

// Type definitions matching your Move struct
export interface AccessPass {
  pass_id: string;
  member_name: string;
  certifications: string[];
  safety_training: boolean;
  creation_timestamp: string;
}

// Function to create access pass
export const createAccessPass = async (
  account: any,
  memberName: string
) => {
  const transaction = {
    data: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::create_access_pass`,
      functionArguments: [memberName, Math.floor(Date.now() / 1000).toString()],
    },
  };

  try {
    const response = await (window as any).aptos.signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    return response;
  } catch (error) {
    console.error("Error creating access pass:", error);
    throw error;
  }
};

// Function to add certification
export const addCertification = async (
  account: any,
  memberAddress: string,
  certificationType: string,
  isSafetyTraining: boolean
) => {
  const transaction = {
    data: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::add_certification`,
      functionArguments: [memberAddress, certificationType, isSafetyTraining],
    },
  };

  try {
    const response = await (window as any).aptos.signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    return response;
  } catch (error) {
    console.error("Error adding certification:", error);
    throw error;
  }
};

// Function to get access pass data
export const getAccessPass = async (accountAddress: string): Promise<AccessPass | null> => {
  try {
    const resource = await aptos.getAccountResource({
      accountAddress,
      resourceType: `${MODULE_ADDRESS}::${MODULE_NAME}::AccessPass`,
    });
    
    return resource.data as AccessPass;
  } catch (error) {
    console.log("No access pass found for this account");
    return null;
  }
};

// Function to initialize counter (admin only)
export const initializeCounter = async (admin: any) => {
  const transaction = {
    data: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::initialize_counter`,
      functionArguments: [],
    },
  };

  try {
    const response = await (window as any).aptos.signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    return response;
  } catch (error) {
    console.error("Error initializing counter:", error);
    throw error;
  }
};