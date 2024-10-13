
const defaultStartDate = (new Date()).getTime();
const defaultEndDate = (() => {
    let date = new Date();
    date.setMonth(date.getMonth() + 12);
    return date.getTime();
})();

const initialState = {
    loading: false,
    data: null,
    error: null,
    type: "",
    parameters: {
        "company_id": '0',
        "interval_value": 20,
        "page_num": '0',
        "search_value_pair": [
            {
                "value_name": "start",
                "value": defaultStartDate
            },
            {
                "value_name": "end",
                "value": defaultEndDate
            },
            {
                "value_name": "agentName",
                "value": ''
            }
        ]
    }
};
export default initialState;