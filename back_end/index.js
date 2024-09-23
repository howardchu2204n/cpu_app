const { getVsachieveList } = require('./ controller/VSAchieveController');
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
                return day.getTime();
            })()),
            agentName: ['Peter', 'Ben', 'Louis'][idx % 3],
            caseID: '19890535' + String(company_id).padStart(4, '0'),
            voiceURL: 'http://www.google.com',
            id: idx.toString(),
            company_id: ['0', '1', '2', '3', '4', '5'][idx % 6],
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

app.post('/get_vsachieve_list', jsonParser, async (req, res) => {
    const query_parm = req.body;
    const query_result = await getVsachieveList(
        query_parm.company_id,
        parseInt(query_parm.interval_value),
        parseInt(query_parm.page_num) + 1,
        query_parm.search_value_pair
    );
    res.json(query_result);
});

console.log('App Running in http://localhost:8000/');
app.listen(8000);