const express = require('express');
const app = express();

const dummy_mode = 1; //0 for production mode, 1 for dummy mode

// dummy mode only start
const search_vsachieve_list_generator = (
    company_id,
    timestamp = 0, 
    vsachieve_interval = 20,
    agent = '',
    end_time = 0
) => {
    const dummy_result = Array(vsachieve_interval).fill(0).map((_,idx) => {
        return {
            date: ((() => {
                let day = new Date(timestamp);
                day.setDate(day.getDate() + idx);
                return day.getTime();
            })()),
            agentName: ['Peter', 'Ben', 'Louis'][idx % 3],
            caseID: '19890535' + company_id,
            voiceURL:'www.google.com',
        };
    });
    return dummy_result.filter(obj =>   
        //based on dummy data, not able to search globaly
        //, only searching the agent from pre-built 20 records as above generating
        (agent == '') ? 
            true
            :
            obj.agentName.includes(agent)
    ).filter(obj =>   
        //based on dummy data, not able to search globaly
        //, only searching the agent from pre-built 20 records as above generating
        (end_time == 0) ? 
            true
            :
            obj.date <= end_time
        );
}
// dummy mode only end

app.get('/test/:test_param', function (req, res) {
    res.status(200).json(req.params);
});
    
app.get('/get_vsachieve_list_first/:company_id', function (req, res) {
    //get first 20
   if(dummy_mode == 1) {
        res.status(200).json(  //dummy data
            search_vsachieve_list_generator(
                company_id = req.params.company_id
            )
        );
    } else {
        res.status(404).json({  
            error_msg: 'Error: produciotn mode not yet implemented'
        });
    }
});

app.get('/get_vsachieve_list_next/:company_id/:timestamp', function (req, res) {
    //get next 20
    if(dummy_mode == 1) {
        res.status(200).json(  //dummy data
            search_vsachieve_list_generator(
                company_id = req.params.company_id, 
                timestamp = parseInt(req.params.timestamp) + 86400000 //plus one day
            )
        );
    } else {
        res.status(404).json({  
            error_msg: 'Error: produciotn mode not yet implemented'
        });
    }
});

app.get('/search_vsachieve_list_by_param/:company_id/:start/:end/:agent_name', function (req, res) {
    
    let timestamp = 
    req.params.start == 'unset'
    ? undefined : parseInt(req.params.start);
    let end_time = 
    req.params.end == 'unset'
    ? undefined : parseInt(req.params.end);
    
    if(dummy_mode == 1) {

        res.status(200).json(  //dummy data
            search_vsachieve_list_generator(
                company_id = req.params.company_id, 
                timestamp = timestamp,
                vsachieve_interval = undefined,
                agent = req.params.agent_name,
                end_time = end_time
            )
        );
    } else {
        res.status(404).json({  
            error_msg: 'Error: produciotn mode not yet implemented'
        });
    }
});

app.get('/search_vsachieve_list_by_param/:company_id/:start/:end', function (req, res) {
    
    let timestamp = 
    req.params.start == 'unset'
    ? undefined : parseInt(req.params.start);
    let end_time = 
    req.params.end == 'unset'
    ? undefined : parseInt(req.params.end);
    
    if(dummy_mode == 1) {

        res.status(200).json(  //dummy data
            search_vsachieve_list_generator(
                company_id = req.params.company_id, 
                timestamp = timestamp,
                vsachieve_interval = undefined,
                agent = undefined,
                end_time = end_time
            )
        );
    } else {
        res.status(404).json({  
            error_msg: 'Error: produciotn mode not yet implemented'
        });
    }
});

app.get('/get_company_details/:company_id', function (req, res) {
    if(dummy_mode == 1) {
        res.status(200).json({  //dummy data
            company_id: req.params.company_id,
            company_name: 'Dummy Company',
            company_mail: 'dummy@dummy.com',
            company_address: 'G/F, Dummy Street, No. 0',
            company_phone: '12345678'
        });
    } else {
        res.status(404).json({  
            error_msg: 'Error: produciotn mode not yet implemented'
        });
    }
});
console.log('App Running in http://localhost:8000/');
app.listen(8000)