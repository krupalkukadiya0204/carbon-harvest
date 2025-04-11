const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

class BlockchainService {
    constructor(ccpPath, walletPath, user) {
        this.ccpPath = ccpPath;
        this.walletPath = walletPath;
        this.user = user;
        this.contractName = 'carbonCreditContract';
        this.network = null;
        this.contract = null;
        this.gateway = null;
    }

    async connect() {
        // Simulate connection to the blockchain network with comments.
        console.log('Simulating connection to Hyperledger Fabric network...');
        try {
            const ccp = JSON.parse(fs.readFileSync(this.ccpPath, 'utf8'));
            const wallet = await Wallets.newFileSystemWallet(this.walletPath);
            const identity = await wallet.get(this.user);
            if (!identity) {
                throw new Error(`An identity for the user "${this.user}" does not exist in the wallet`);
            }

            this.gateway = new Gateway();
            await this.gateway.connect(ccp, {
                wallet,
                identity: this.user,
                discovery: { enabled: true, asLocalhost: true }
            });

            this.network = await this.gateway.getNetwork('mychannel');
            // this.contract = this.network.getContract(this.contractName);
            console.log('Connected to the blockchain network.');
        } catch (error) {
            console.error('Failed to connect to the blockchain network:', error);
            throw error;
        }

        // this.contract = this.network.getContract(this.contractName);
        this.contract = "contract"
    }

    async disconnect() {
        if (this.gateway) {
            this.gateway.disconnect();
            console.log('Disconnected from the blockchain network.');
        }
    }

    async issueCredit(creditData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking IssueCredit with data: ${JSON.stringify(creditData)}`);
            // Simulate query the blockchain
            const blockchainData = {
                creditId: "credit123",
                status: "issued",
                ...creditData
            }
            console.log("Simulating data retrieved from the blockchain:", blockchainData)
            // const result = await this.contract.submitTransaction('IssueCredit', JSON.stringify(creditData));
            const result = await this.contract.submitTransaction('IssueCredit', JSON.stringify(creditData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "IssueCredit": ${error}`);
            throw error;
        }
    }

    async transferCredit(creditID, newOwnerID) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking TransferCredit for creditID: ${creditID} to newOwnerID: ${newOwnerID}`);
            const blockchainData = {
                creditId: creditID,
                newOwner: newOwnerID
            };
            console.log("Simulating data retrieved from the blockchain:", blockchainData);
            const result = await this.contract.submitTransaction('TransferCredit', creditID, newOwnerID);
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "TransferCredit": ${error}`);
            throw error;
        }
    }

    async retireCredit(creditID) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking RetireCredit for creditID: ${creditID}`);
            const blockchainData = {
                creditId: creditID,
                status: "retired"
            };
            const result = await this.contract.submitTransaction('RetireCredit', creditID);
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "RetireCredit": ${error}`);
            throw error;
        }
    }

    async verifyCredit(creditID, verificationData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking VerifyCredit for creditID: ${creditID} with data: ${JSON.stringify(verificationData)}`);
            const blockchainData = {
                creditId: creditID,
                verificationData
            };
            const result = await this.contract.submitTransaction('VerifyCredit', creditID, JSON.stringify(verificationData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "VerifyCredit": ${error}`);
            throw error;
        }
    }

    async createProject(projectData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking CreateProject with data: ${JSON.stringify(projectData)}`);
            const blockchainData = {
                status: "project created",
                ...projectData
            }
            const result = await this.contract.submitTransaction('CreateProject', JSON.stringify(projectData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "CreateProject": ${error}`);
            throw error;
        }
    }

    async updateProject(projectId, updatedData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking UpdateProject for projectId: ${projectId} with data: ${JSON.stringify(updatedData)}`);
            const blockchainData = {
                projectId,
                ...updatedData,
                status: "project updated"
            };
            const result = await this.contract.submitTransaction('UpdateProject', projectId, JSON.stringify(updatedData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "UpdateProject": ${error}`);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking CreateUser with data: ${JSON.stringify(userData)}`);
            const blockchainData = {
                userId: userData.userId,
                ...userData,
                status: "user created"
            };
            const result = await this.contract.submitTransaction('CreateUser', JSON.stringify(userData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "CreateUser": ${error}`);
            throw error;
        }
    }

    async updateUser(userId, updatedData) {
        try {
            // Simulate smart contract invocation and data retrieval
            console.log(`Simulating invoking UpdateUser for userId: ${userId} with data: ${JSON.stringify(updatedData)}`);
            const blockchainData = {
                userId,
                ...updatedData,
                status: "user updated"
            };
            const result = await this.contract.submitTransaction('UpdateUser', userId, JSON.stringify(updatedData));
            return JSON.parse(result.toString());
        } catch (error) {
            console.error(`Failed to submit transaction "UpdateUser": ${error}`);
            throw error;
        }
    }
}

module.exports = BlockchainService;