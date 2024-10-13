const { CompanyDetailsDB } = require('./DBConfigINIT');

const table_name = 'COMPANY_DETAILS';

const getCompanyDetails = async (companyID) => {
    let valuePairForQuery = [];
    valuePairForQuery.push({
        name: '@id',
        value: companyID.toString()
    });
    const querySpec = {
        query:
            'SELECT * FROM ' + table_name + ' t WHERE t.id = @id',
            parameters: valuePairForQuery
    }
    console.log('Timestamp: ' + (new Date()).toDateString());
    console.log(querySpec);
    var response = await CompanyDetailsDB.items.query(querySpec).fetchAll();
    return response.resources;
}

module.exports = { getCompanyDetails };