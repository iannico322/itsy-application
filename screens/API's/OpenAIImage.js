import * as FileSystem from 'expo-file-system';
import CryptoJS from "crypto-js";
import { getLocalStorage } from '../tempDB';

async function OpenAIImage({imagePath}) {
  const decryptText = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, "itsy");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return new Promise(async (resolve) => {
    const base64String = await FileSystem.readAsStringAsync(imagePath, { encoding: FileSystem.EncodingType.Base64 });
    const data = {
      model: "gpt-4-vision-preview",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": ` Please examine the items depicted in the image provided and generate a response that includes only food-related items. This includes any food items that are labeled or written in text make sure to include the brand if any has.
              
              The response should be in the following format:
              [
                {"name": "Banana", "quantity": "2pcs"},
                {"name": "Peanut", "quantity": "5pcs"}
              ]
              

             If no food items are detected, the response should be:
              [
                {"warning": "No food found"}
              ]

              The response should strictly adhere to the specified format and contain no additional text.

              avoid this response: json\n[\n  {\"name\": \"Chicken\", \"quantity\": \"2lbs\"}]

              make sure it looks like this: [\n  {\"name\": \"Chicken\", \"quantity\": \"2lbs\"}]`
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64,${base64String}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    };
    try {
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ await getLocalStorage("none2").then(e=>(decryptText(e)))}` // Use environment variable for API key
        },
        body: JSON.stringify(data)
      
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiResponse = await response.json();
      if (apiResponse.choices && apiResponse.choices.length > 0) {
       
        resolve(JSON.parse(apiResponse.choices[0].message.content));
      } else {
        console.error('No choices returned from API');
        resolve([]);
      }
    } catch (error) {
      resolve([]);
    }
  });
}
export default OpenAIImage;
