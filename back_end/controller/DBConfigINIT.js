const { DefaultAzureCredential }  =  require('@azure/identity');
const { CosmosClient } = require('@azure/cosmos');

const credential = new DefaultAzureCredential();

const client = new CosmosClient({
    endpoint: 'https://louischu.documents.azure.com:443',
    aadCredentials: credential
});

const database = client.database('CPU_test');
const CompanyDetailsDB = database.container('COMPANY_DETAILS');
const VS_AchieveDB = database.container('VS_Achieve');
const WorkflowManagementDB = database.container('COMPANY_WORKFLOW');

module.exports = { CompanyDetailsDB, VS_AchieveDB, WorkflowManagementDB};