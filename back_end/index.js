const { getVsachieveList } = require('./controller/VSAchieveController');
const { getCompanyDetails } = require('./controller/CompanyDetailsController');
const { getWorkflowDetails, updateWorkflowDetails } = require('./controller/WorkflowManagementController');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// create application/json parser
app.use(cors());

// container.item(id, partitionKey).read().then((res)=>{
//     var read_item = res.resource;
//     console.log(res);
// });

const dummy_mode = 1; //0 for production mode, 1 for dummy mode

// dummy mode only start
const search_vsachieve_list_generator = (
    company_id,
    timestamp = 0,
    vsachieve_interval = 20,
    agent = '',
    end_time = 0
) => {
    const dummy_result = Array(vsachieve_interval).fill(0).map((_, idx) => {
        return {
            date: ((() => {
                let day = new Date(timestamp);
                day.setDate(day.getDate() + idx);
                day.setHours((day.getHours() + idx) % 24);
                return day.getTime();
            })()),
            agentName: ['Tom', 'Chris', 'May'][idx % 3],
            caseID: '19890535' + String(company_id).padStart(4, '0'),
            voiceURL: 'http://www.google.com',
            id: idx.toString(),
            company_id: ['0', '1', '2', '3', '4', '5', '6', '7'][idx % 8],
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

app.post('/get_company_details', jsonParser, async function (req, res) {
    const query_parm = req.body;
    console.log(query_parm);
    let query_result = await getCompanyDetails(
        query_parm.company_id
    );
    let res_result = {};
    res_result.resources = query_result;
    res.json(res_result);
});

app.post('/get_vsachieve_list', jsonParser, async (req, res) => {
    const query_parm = req.body;
    console.log(query_parm);
    let query_result = await getVsachieveList(
        query_parm.company_id,
        parseInt(query_parm.interval_value),
        parseInt(query_parm.page_num) + 1,
        query_parm.search_value_pair
    );
    let res_result = {};
    res_result.interval_value = query_parm.interval_value;
    res_result.page_num = query_parm.page_num;
    res_result.resources = query_result;
    res.json(res_result);
});

app.post('/get_workflow_details', jsonParser, async (req, res) => {
    const query_parm = req.body;
    console.log(query_parm);
    let query_result = await getWorkflowDetails(
        query_parm.company_id
    );
    let res_result = {};
    res_result.resources = query_result;
    res.json(res_result);
});

app.post('/update_workflow_details', jsonParser, async (req, res) => {
    const query_parm = req.body;
    console.log(query_parm);
    let query_result = await updateWorkflowDetails(
        query_parm.company_id,
        query_parm.data
    );
    let res_result = {};
    res_result.resources = query_result;
    res.json(res_result);
});

console.log('App Running in http://localhost:8000/');
app.listen(8000);