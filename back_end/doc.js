//Voice Summary Achieve CREATE

//Voice Summary Achieve READ
app.post('/get_vsachieve_list', (req, res) => {
    req = 
    {
        'company_name': 'String', //Company identifier
        'interval_value': 20, //default 20, optional
        'page_num': 'Interger', //Last achieve identifer of previous pagination, Optional
        'search_value_pair': [{
            'value_name': 'String', //Value name tend to update
            'value': 'Any' //VALE tend to update
        }]
        /*
            'start': 'Timestamp', //Start of time range for search
            'end': 'Timestamp', //End of time range for search
            'agent_name': 'String' //Name of responsible agent for search
        */
    }
    res = {
        date: 'Tiemstamp',
        agentName: 'String',
        caseID: 'String',
        voiceURL: 'String',
        interval_value: 'Interger',
        total_count_in_search: 'Interger'
    }
});
//Voice Summary Achieve UPDATE

//Voice Summary Achieve DELETE


//Company Details CREATE

//Company Details READ
app.post('/get_company_details/', (req, res) => {
    req = 
    {
        'company_name': 'String', //Company identifier
    }
});
//Company Details UPDATE
app.post('/update_company_details/', (req, res) => {
    req = 
    {
        'company_name': 'String', //Company identifier
        'value_pair': [{
            'value_name': 'String', //Value name tend to update
            'value': 'Any' //VALE tend to update
        }]
    }
});
//Company Details DELETE


