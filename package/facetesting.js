// npm install @huggingface/inference
// npm install @huggingface/hub
// npm install @huggingface/agents
import { HfInference } from "@huggingface/inference";
import readline from "readline";

const HF_TOKEN = "";

const inference = new HfInference(HF_TOKEN);

// Chat completion API

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let messages = [];

var waitForUserInput = function () {
  rl.question("USR>", function (input) {
    if (input == "bye") {
      rl.close();
    } else {
      inference.chatCompletion({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [...messages,
        { "role": "user", "content": input }
        ],
        max_tokens: 512,
        temperature: 0.5,
      }).then(out => {
        console.log('GPT>' + out.choices[0].message.content);
        //console.log('GPTJson>' + JSON.stringify(out));
        messages = messages.concat([{ "role": "user", "content": input }, { "role": "system", "content": out.choices[0].message.content }]);
        waitForUserInput();
      })
    }
  });
}

waitForUserInput();