import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputIcon from '@mui/icons-material/Input';
import DirectionsIcon from '@mui/icons-material/Directions';
import { HfInference } from "@huggingface/inference";

import FormControl from '@mui/material/FormControl';
import { useState, useRef } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box } from "@mui/material";
import axios from "axios";



const ChatVerify = () => {

  const listRef = useRef(null);
  const [chatText, setChatText] = useState([{ role: "user", content: "" }]);
  const [chatPreText, setChatPreText] = useState([{ role: "system", content: "empty content" }]);
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setChatText(chat_texts =>
      chat_texts.map((obj, idx) => {
        if (idx == chat_texts.length - 1) {
          obj.content = e.target.value;
        }
        return obj;
      })
    );

    listRef.current?.lastElementChild?.scrollIntoView();
  }

  const HF_TOKEN = "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";

  const inference = new HfInference(HF_TOKEN);

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setLoading(true);
      inference.chatCompletion({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [...chatPreText, ...chatText],
        max_tokens: 512,
        temperature: 0.5,
      }).then(out => {
        setChatText(messages => {
          setLoading(false);
          return messages.concat([{ "role": "system", "content": out.choices[0].message.content }, { "role": "user", "content": "" }]);
        });
      });
    }
  }

  useEffect(() => {
    setLoading(true);
    axios.post('http://localhost:8000/get_workflow_details', { company_id: '0' }).then(success => {

      setChatPreText(chatPreText => {
        setLoading(false);
        return ["There are some workflow maping for ID & response to take in following, you are assume you are a call center agent to read that mapping"]
          .concat(success.data.resources[0].stage_data.map((stage, idx) => {
            let text = "";
            if (idx == 0) {
              text = text + "For there are action-to-taken at first, and "
            } else {
              text = text + "For there are action-to-taken in ID=" + stage.stageIdenty + ", and ";
            }
            text += `"` + stage.stageSummary + `"` +
              (
                stage.condition.length == 0 ?
                  " nomore action needed" :
                  stage.condition.map(cdt => " if user stated or acted" + ` "` + cdt.conditionTriggerDesc + `" we might reference the text with ID=` + cdt.jumpTo).join(", ")
              )
            return text;
          })).concat([`conversation might start now, user will ask the question about above`]).map(txt => ({ "role": "system", "content": txt }))
      });
    }, error => { });
  }, []);

  return (
    <Grid
      container
      xs={12}
      sx={{ background: "linear-gradient(to bottom right,#32a1ce, #e66465)", height: "600px", padding: 1 }}
    >
      <Grid item xs={12}>
        <Box xs={12} sx={{ height: "500px", overflow: "scroll", background: "white" }} ref={listRef}>
          {
            chatText.slice(0, chatText.length).map(text_obj => (
              <Box
                sx={{ borderBottom: text_obj.role == "system" ? "2px solid red" : "2px solid green", display: "flex", flexDirection: "column", margin: "5px", padding: "3px" }}
                xs={12}
              >
                <div style={{ color: text_obj.role == "system" ? "red" : "green" }}>{text_obj.role}</div>
                <div style={{ fontSize: "20px", paddingLeft: "20px" }}>{text_obj.content.split('\n').map(text => (<>{text}<br /></>))}</div>
              </Box>
            ))
          }
        </Box>
      </Grid>

      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Input you question to verify the workflow!"
          inputProps={{ 'aria-label': 'Input you question to verify the workflow!' }}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={chatText[chatText.length - 1].content}
          disabled={loading}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => { onKeyDown({ keyCode: 13 }); }}>
          <InputIcon />
        </IconButton>
      </Paper>
      <div sx={{ background: "white"/*, display: 'none' */ }}></div>
    </Grid >
  );
};

export default ChatVerify;
