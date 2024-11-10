// Create a public key from the Verbwrie Dashboard
// Add a Scope to it: "/v1/wallet/event/save"
const publicKey = "pk_live_43b17a70-002f-42b5-90d3-58ee05b06d56";

// Create a wallet application from Verbwire Dashboard
// Add respective allowed domains to it.
const applicationId = "WMyyqyOh_FKGKr8teSGMi";

// Get an API key from Alchemy
const alchemyKey = "7snPOyyk1LkPDggLFKQ_t9RC2NF3zqUM";

export const credentials = {
    publicKey,
    applicationId,
    alchemyKey,
};