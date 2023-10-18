
import axios from 'axios'

import CryptoJS from "crypto-js"

import FormData from 'form-data';
import { getLocalStorage } from '../tempDB';


async function OpenAIImage({image}) {


  const decryptText = (encryptedText)=> {
    const bytes = CryptoJS.AES.decrypt(encryptedText, "itsy");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

 

  console.log(image,"sds helo")

      const file =image;
      const formData = new FormData();
      formData.append('image', file);
  
      const options = {
        method: 'POST',
        url: 'https://microsoft-computer-vision3.p.rapidapi.com/describe',
        params: {
          language: 'en',
          maxCandidates: '1',
          'descriptionExclude[0]': 'Celebrities'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '096d7043d4msh2675ca63ad13d15p1e2935jsnacda8f927c83',
          'X-RapidAPI-Host': 'microsoft-computer-vision3.p.rapidapi.com'
        },
        data: formData
      };
  
     
        const response = await axios(options);
        console.log(response.data.description.captions[0].text)

         const apiMessages =  { role: "user", content:` what is the food items on this paragraph: " ${response.data.description.captions[0].text}" 
         expected output:
          [
            {"food_indentified": [
                {
                  "name":"food1",
                  "quantity": "1pc"
                },
                {
                  "name":"food2",
                  "quantity": "1pc"
                },
                ...
            ]
            }
        ]
         `}


          const apiRequestBody = {
              "model": "gpt-3.5-turbo",
              "messages": [
                { 
                  "role": "system",
                   "content": `You are a professional advance AI that can extract Food from a paragrap. Your task is to generate a list of foods you identify on a sentences. This should be the following format: [{"food_indentified": [
                    {
                      "name":"food1",
                      "quantity": "1pc"
                     },
                     {
                      "name":"food2",
                      "quantity": "1pc"
                     },
                     ...
                   ]
                  }]
                  
                  make sure to follow that format if you identify any Foods Items, if none just say  : No Food found!
                  
                  `,
              
                },
                {
                  "role":"user","content":` what is the food items on this paragraph: " a close up of a banana"`
                },
                { 
                  "role": "assistant", "content": `[{"food_indentified": [
                    {
                      "name":"banana",
                      "quantity": "1ps"
                     }
                   ]
                  }]`
              
                },

                {
                  "role":"user","content":` what is the food items on this paragraph: "an apple and mango in a table"`
                },
                { 
                  "role": "assistant", "content": `[{"food_indentified": [
                    {
                      "name":"apple",
                      "quantity": "1ps"
                     },
                     {
                      "name":"mango",
                      "quantity": "1ps"
                     }
                   ]
                  }]`
                },

                {
                  "role":"user","content":` what is the food items on this paragraph: "a close up of a dog"`
                },
                { 
                  "role": "assistant", "content": `No Food found!`
                  
              
                },
                {
                  "role":"user","content":` what is the food items on this paragraph: "2 banana on the table"`
                },
                { 
                  "role": "assistant", "content": `[{"food_indentified": [
                    {
                      "name":"shrimp",
                      "quantity": "2ps"
                     }
                   ]
                  }]`
                  
              
                },
                apiMessages
              ]
            }
    

            try {
              const textresponse = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
                headers: {
                  Authorization: `Bearer ${ await getLocalStorage("none").then(e=>(decryptText(e)))}`,
                  "Content-Type": "application/json",
                }
              });

              console.log(textresponse.data.choices[0].message.content)
              return textresponse.data.choices[0].message.content ;
            } catch (error) {
               return "Something went wrong";
            }
        
}

export default OpenAIImage

