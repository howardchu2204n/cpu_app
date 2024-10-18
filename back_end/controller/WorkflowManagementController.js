const { WorkflowManagementDB } = require('./DBConfigINIT');

const table_name = 'COMPANY_WORKFLOW';

const getWorkflowDetails = async (companyID) => {
    const querySpec = {
        query:
            'SELECT * FROM ' + table_name + ' t WHERE t.company_id = @company_id',
        parameters: [{
            name: '@company_id',
            value: companyID.toString()
        }]
    };
    console.log('Timestamp: ' + (new Date()).toDateString());
    console.log(querySpec);
    var response = await WorkflowManagementDB.items.query(querySpec).fetchAll();
    return response.resources;
}

const updateWorkflowDetails = async (companyID, data) => {
    const dataChange = { 'stage_data': data };
    const querySpec = {
        query:
            'SELECT * FROM ' + table_name + ' t WHERE t.company_id = @company_id',
        parameters: [{
            name: '@company_id',
            value: companyID.toString()
        }]
    };
    console.log('Timestamp: ' + (new Date()).toDateString());
    console.log(querySpec);
    console.log(dataChange);

    const { resources: itemDefList } = await WorkflowManagementDB.items.query(querySpec).fetchAll();
    if (!itemDefList.length == 0) {
        const id = itemDefList[0].id;
        const item = WorkflowManagementDB.item(id, undefined);
        const { resource: readDoc } = await item.read();
        readDoc.stage_data = data;
        var response = await item.replace(readDoc);
        return { status: 'success' };
    }
    return { status: 'error' };
}

module.exports = { getWorkflowDetails, updateWorkflowDetails };