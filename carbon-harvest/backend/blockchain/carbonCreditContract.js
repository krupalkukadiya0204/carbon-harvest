/**
 * @file Smart Contract for Carbon Credit Management
 * @description This smart contract manages the issuance, transfer, retirement, and verification of carbon credits,
 * as well as the creation and updating of users and projects.
 */

class CarbonCreditContract {
    constructor() {
        this.carbonCredits = new Map();
        this.users = new Map();
        this.projects = new Map();
    }

    /**
     * Issues a new carbon credit.
     * @param {Object} creditData - Data for the new credit.
     * @param {string} creditData.creditId - Unique identifier for the credit.
     * @param {string} creditData.projectId - ID of the project associated with the credit.
     * @param {string} creditData.issuanceDate - Date when the credit was issued.
     * @param {number} creditData.quantity - Amount of carbon offset.
     * @param {string} creditData.verificationStatus - Initial verification status.
     * @param {string} creditData.verificationData - Data related to verification.
     * @param {string} creditData.ownerId - Initial owner of the credit.
     * @returns {Object} - The created credit object.
     * @throws {Error} - Throws an error if the creditId already exists.
     */
    IssueCredit(creditData) {
        // Input Validation: Check if creditData is properly structured
        if (!creditData || !creditData.creditId || !creditData.projectId || !creditData.issuanceDate || !creditData.quantity || !creditData.verificationStatus || !creditData.verificationData || !creditData.ownerId) {
            throw new Error("Invalid credit data structure.");
        }
        if (this.carbonCredits.has(creditData.creditId)) {
            throw new Error(`Credit with ID ${creditData.creditId} already exists.`);
        }

        const newCredit = {
            ...creditData,
            ownershipHistory: [creditData.ownerId],
            retirementStatus: false,
        };

        this.carbonCredits.set(creditData.creditId, newCredit);
        return newCredit;
    }

    /**
     * Transfers a carbon credit from one owner to another.
     * @param {Object} transferData - Data for the credit transfer.
     * @param {string} transferData.creditId - ID of the credit to transfer.
     * @param {string} transferData.newOwnerId - ID of the new owner.
     * @returns {Object} - The updated credit object.
     * @throws {Error} - Throws an error if the credit does not exist.
     */
    TransferCredit(transferData) {
        // Input Validation: Check if transferData is properly structured
        if (!transferData || !transferData.creditId || !transferData.newOwnerId) {
            throw new Error("Invalid transfer data structure.");
        }
        const credit = this.carbonCredits.get(transferData.creditId);
        if (!credit) {
            throw new Error(`Credit with ID ${transferData.creditId} not found.`);
        }
        // Access Control: Ensure the current owner is the one transferring the credit (add more logic later)
        if (credit.ownerId != transferData.currentOwnerId){
            throw new Error(`You are not the owner of this credit.`);
        }

        credit.ownerId = transferData.newOwnerId; // Update the ownerId
        // Reentrancy: Ensure that the ownershipHistory array doesn't become infinitely large.
        if (credit.ownershipHistory.length > 100) credit.ownershipHistory.shift();
        credit.ownershipHistory.push(transferData.newOwnerId);
        return credit;
    }

    /**
     * Marks a carbon credit as retired.
     * @param {Object} retireData - Data for the credit retirement.
     * @param {string} retireData.creditId - ID of the credit to retire.
     * @param {string} retireData.retirerId - ID of the user retiring the credit.
     * @returns {Object} - The updated credit object.
     * @throws {Error} - Throws an error if the credit does not exist.
     */
    RetireCredit(retireData) {
        // Input Validation: Check if retireData is properly structured
        if (!retireData || !retireData.creditId || !retireData.retirerId) {
            throw new Error("Invalid retirement data structure.");
        }
        const credit = this.carbonCredits.get(retireData.creditId);
        if (!credit) {
            throw new Error(`Credit with ID ${retireData.creditId} not found.`);
        }
        // Access Control: Ensure only the owner or authorized users can retire the credit (add more logic later)
        if (credit.ownerId != retireData.retirerId){
            throw new Error(`You are not the owner of this credit.`);
        }
        // Retire the credit
        credit.retirementStatus = true;
        credit.retirerId = retireData.retirerId;
        return credit;
    }

    /**
     * Verifies a carbon credit and updates its verification status.
     * @param {Object} verifyData - Data for the credit verification.
     * @param {string} verifyData.creditId - ID of the credit to verify.
     * @param {string} verifyData.verificationData - New verification data.
     * @param {string} verifyData.verificationStatus - New verification status.
     * @returns {Object} - The updated credit object.
     * @throws {Error} - Throws an error if the credit does not exist.
     */
    VerifyCredit(verifyData) {
        // Input Validation: Check if verifyData is properly structured
        if (!verifyData || !verifyData.creditId || !verifyData.verificationData || !verifyData.verificationStatus) {
            throw new Error("Invalid verification data structure.");
        }
        const credit = this.carbonCredits.get(verifyData.creditId);
        if (!credit) {
            throw new Error(`Credit with ID ${verifyData.creditId} not found.`);
        }
        // Access Control: add logic to ensure only the authorized user can verify the credit

        // Update the credit
        credit.verificationData = verifyData.verificationData;
        credit.verificationStatus = verifyData.verificationStatus;
        return credit;
    }

    /**
     * Creates a new carbon sequestration project.
     * @param {Object} project - Project data.
     * @param {string} project.projectId - Unique project identifier.
     * @param {string} project.description - Description of the project.
     * @param {string} project.location - Project location.
     * @param {string} project.type - Type of the project.
     * @param {string} project.verificationBody - Name of the verification body.
     * @returns {Object} - The created project object.
     * @throws {Error} - Throws an error if the projectId already exists.
     */
    CreateProject(project) {
        // Input Validation: Check if project is properly structured
        if (!project || !project.projectId || !project.description || !project.location || !project.type || !project.verificationBody) {
            throw new Error("Invalid project data structure.");
        }
        if (this.projects.has(project.projectId)) {
            throw new Error(`Project with ID ${project.projectId} already exists.`);
        }
        this.projects.set(project.projectId, project);
        return project;
    }

    /**
     * Updates an existing carbon sequestration project.
     * @param {Object} projectData - Updated project data.
     * @param {string} projectData.projectId - ID of the project to update.
     * @param {string} projectData.description - Updated description.
     * @param {string} projectData.location - Updated location.
     * @param {string} projectData.type - Updated type.
     * @param {string} projectData.verificationBody - Updated verification body.
     * @returns {Object} - The updated project object.
     * @throws {Error} - Throws an error if the project does not exist.
     */
    UpdateProject(projectData) {
        // Input Validation: Check if projectData is properly structured
        if (!projectData || !projectData.projectId || !projectData.description || !projectData.location || !projectData.type || !projectData.verificationBody) {
            throw new Error("Invalid project data structure.");
        }
        const project = this.projects.get(projectData.projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectData.projectId} not found.`);
        }
        // Update the project
        Object.assign(project, projectData);// Reentrancy vulnerability.
        return project;
    }

    /**
     * Creates a new user.
     * @param {Object} user - User data.
     * @param {string} user.userId - Unique user identifier.
     * @param {string} user.publicKey - User's public key.
     * @param {string} user.role - User's role.
     * @returns {Object} - The created user object.
     * @throws {Error} - Throws an error if the userId already exists.
     */
    CreateUser(user) {
        // Input Validation: Check if user is properly structured
        if (!user || !user.userId || !user.publicKey || !user.role) {
            throw new Error("Invalid user data structure.");
        }
        if (this.users.has(user.userId)) {
            throw new Error(`User with ID ${user.userId} already exists.`);
        }
        this.users.set(user.userId, user);
        return user;
    }

    /**
     * Updates an existing user.
     * @param {Object} userData - Updated user data.
     * @param {string} userData.userId - ID of the user to update.
     * @param {string} userData.publicKey - Updated public key.
     * @param {string} userData.role - Updated role.
     * @returns {Object} - The updated user object.
     * @throws {Error} - Throws an error if the user does not exist.
     */
    UpdateUser(userData) {
        // Input Validation: Check if userData is properly structured
        if (!userData || !userData.userId || !userData.publicKey || !userData.role) {
            throw new Error("Invalid user data structure.");
        }
        const user = this.users.get(userData.userId);
        if (!user) {
            throw new Error(`User with ID ${userData.userId} not found.`);
        }
        // Update the user
        Object.assign(user, userData);// Reentrancy vulnerability.
        return user;
    }
}

module.exports = CarbonCreditContract;