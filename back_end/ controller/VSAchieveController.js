const { VS_AchieveDB } = require('./DBConfigINIT');

const table_name = 'VS_Achieve';

const getVsachieveList = async (companyID, intervalValue, pageNum, valuePair) => {
    const comma = valuePair.length == 0 ? '' : ' and ';
    const valuePairNameQueryString = comma + valuePair.map(
        (obj) => {
            switch (obj.value_name) {
                case 'start':       return 't.' + obj.value_name + ' > @' + obj.value_name
                case 'end':         return 't.' + obj.value_name + ' < @' + obj.value_name
                case 'agentName':   return 't.' + obj.value_name + ' like \'%\' || @' + obj.value_name + '|| \'%\''
                default:            return 't.' + obj.value_name + ' = @' + obj.value_name
            }
        }
    ).join(' and ');
    let valuePairForQuery = valuePair.map(
        (obj) => ({
            name: '@' + obj.value_name,
            value: obj.value
        })
    );
    valuePairForQuery.push({
        name: '@company_id',
        value: companyID.toString()
    });
    const querySpec = {
        query: 
        'SELECT * FROM ' + table_name + ' t WHERE t.company_id = @company_id' + valuePairNameQueryString + 
        ' ORDER BY t.date OFFSET ' + (parseInt(intervalValue) * (parseInt(pageNum) - 1)) + ' LIMIT ' + intervalValue,
        parameters: valuePairForQuery
    }
    console.log('Timestamp: ' + (new Date()).toDateString());
    console.log(querySpec);
    var response = await VS_AchieveDB.items.query(querySpec).fetchAll();
    return response.resources;
}

module.exports = { getVsachieveList };