vsachieve_interval = 200;
console.log(JSON.stringify(Array(vsachieve_interval).fill(0).map((_, idx) => {
        return {
            date: ((() => {
                let day = new Date();
                day.setDate(day.getDate() + idx);
                day.setHours((day.getHours() + idx) % 24);
                return day.getTime();
            })()),
            agentName: ['Tom', 'Chris', 'May'][idx % 3],
            caseID: '19890535' + String(idx+20).padStart(4, '0'),
            voiceURL: 'http://www.google.com',
            id: (idx+20).toString(),
            company_id: ['0', '1', '2', '3', '4', '5', '6', '7'][idx % 8],
        };
    })));

