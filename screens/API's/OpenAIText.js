
import axios from 'axios'

import CryptoJS from "crypto-js"
import { getLocalStorage } from '../tempDB';

let cancelRequest; 

async function OpenAIText({product}) {

  const source = axios.CancelToken.source();
 

  

  
  


  const decryptText = (encryptedText)=> {
    
    const bytes = CryptoJS.AES.decrypt(encryptedText, "itsy");
    return bytes.toString(CryptoJS.enc.Utf8);
  };



  const bodyPrompt = `Generate at least 2 dishes in JSON format based on the following products, preferences, and language. Also, include an estimate of how many people each dish can serve. make sure to include time duration on the steps. make the steps as detailed as possible.
  Products: [${product}]
  Preferences: [${ await getLocalStorage("SelectedPrefence").then
(e=>e)}]
  Language [${ await getLocalStorage("Language").then
  (e=>e)}]
  
  Output:[{"name": "dish name1","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"},{"name": "dish name2","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"} ]`;

  const apiMessages = { role: "user", content: bodyPrompt };

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a professional chef with 10 years of experience. Your task is to generate a list of recipes.`,
      },
      {
        role: "user",
        content: `
            Generate min at least 2 dishes in JSON format based on the following products, preferences, and language:
    
            Products: [chicken,pieces dried bay leave, soy sauce,white vinegar,cloves garlic,water,cooking oil,sugar, salt,peppercorn]
            Preferences: [Filipino Style]
            Language: [english]
            
            Output:[{"name": "dish name1","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"},{"name": "dish name2","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"} ]
    
        
            `,
      },
      {
        role: "assistant",
        content: `[
              {
                  "name": "Chicken Adob",
                  "ingredients": ["2 lbs chicken", "3 pieces dried bay leaves","6 tablespoons soy sauce","4 tablespoons white vinega","5 cloves garlic","1 1/2 cups water","3 tablespoons cooking oil","1 teaspoon sugar","1/4 teaspoon salt","1 teaspoon whole peppercorn"],
                  "cooking_steps": ["1. Combine chicken, soy sauce, and garlic in a large bowl. Mix well. Marinate the chicken for at least 1 hour. Note: the longer the time, the better 2 lbs chicken, 6 tablespoons soy sauce", "2. Heat a cooking pot. Pour cooking oil. 3 tablespoons cooking oil", "3. When the oil is hot enough, pan-fry the marinated chicken for 2 minutes per side."," 4. Pour-in the remaining marinade, including garlic. Add water. Bring to a boil 1 1/2 cups water", "5. Add dried bay leaves and whole peppercorn. Simmer for 30 minutes or until the chicken gets tender 3 pieces dried bay leaves, 1 teaspoon whole peppercorn","6. Add vinegar. Stir and cook for 10 minutes. 4 tablespoons white vinegar","Put-in the sugar, and salt. Stir and turn the heat off.Serve hot. Share and Enjoy! 1 teaspoon sugar, 1/4 teaspoon salt"],"serves": "4 people"
              }
              
          ]
            `,
      },
      {
        role: "user",
        content: `
            Generate min at least 2 dishes in JSON format based on the following products, preferences, and language:
    
            Products: [chicken,pieces dried bay leave, soy sauce,white vinegar,cloves garlic,water,cooking oil,sugar, salt,peppercorn]
            Preferences: [Filipino Style]
            Language: [Bisaya]
            
            Output:[{"name": "dish name1","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"},{"name": "dish name2","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"} ]
    
        
            `,
      },
      {
        role: "assistant",
        content: `[
            {
                "name": "Chicken Adob",
                "ingredients": ["2 lbs nga manok", "3 ka piraso nga uga nga dahon sa bay","6 ka kutsarang toyo","4 ka kutsarang puti nga suka","5 ka cloves nga ahos", "1 1/2 ka tasang tubig","3 kutsara nga mantika sa pagluto ","1 ka kutsarita nga asukar", "1/4 ka kutsarita nga asin", "1 ka kutsarita nga tibuok peppercorn"],
                "cooking_steps": [1. Isagol ang manok, toyo, ug ahos sa usa ka dako nga panaksan. Sagola og maayo. I-marinate ang manok sulod sa labing menos 1 ka oras. Pahinumdom: mas taas ang oras, mas maayo 2 lbs nga manok, 6 ka kutsara nga toyo", "2. Pag-init og kaldero. Ibubo ang lana sa pagluto. 3 ka kutsara nga lana sa pagluto", "3. Kung init na ang mantika, i-pan-fry ang gi-marinate nga manok sulod sa 2 ka minuto matag kilid."," 4. Ibubo ang nahabilin nga marinade, lakip ang ahos. Idugang ang tubig. Dad-a sa usa ka hubag 1 1/2 tasa tubig", "5. Idugang ang uga nga dahon sa bay ug tibuok peppercorn. Lutoa sulod sa 30 minutos o hangtud nga ang manok mohumok 3 ka piraso nga uga nga dahon sa bay, 1 ka kutsarita nga tibuok peppercorn","6. Idugang ang suka. Pagpalihok ug pagluto sulod sa 10 minutos. 4 tablespoons puti nga suka","Ibutang-sa asukar, ug asin. Pagpalihok ug palonga ang kainit.Isilbi nga init. Ipakigbahin ug Enjoy! 1 ka kutsarita nga asukar, 1/4 ka kutsarita nga asin"],"serves": "4 ka tao"
            }
            
        ]
          `,
      },
      {
        role: "user",
        content: `
          Generate min at least 2 dishes in JSON format based on the following products, preferences, and language:
  
          Products: [chicken,pieces dried bay leave, soy sauce,white vinegar,cloves garlic,water,cooking oil,sugar, salt,peppercorn]
          Preferences: [Filipino Style]
          Language: [UwU]
          
          Output:[{"name": "dish name1","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"},{"name": "dish name2","ingredients": ["ingredient1", "ingredient2", ],"cooking_steps": ["1. step1", "2. step2", ],"serves": "number of people"} ]
  
      
          `,
      },
      {
        role: "assistant",
        content: `[
          {
              "name": "Chicken Adobo >_<",
              "ingredients": ["2 lbs chicken", "3 pieces dried bay leaves","6 tablespoons soy sauce","4 tablespoons white vinega","5 cloves garlic","1 1/2 cups water","3 tablespoons cooking oil","1 teaspoon sugar","1/4 teaspoon salt","1 teaspoon whole peppercorn"],
              "cooking_steps": [
                "1. OwO Combine chicken, soy sauce, and garlic in a warge bowl. Mix well. Mawinate the chicken fow at weast 1 hour. Notice: the wongew the time, the bettew! ^w^ 2 lbs chicken, 6 tabwespoons soy sauce",
                "2. Heat a cooking pot. Pour cooking oiw. 3 tabwespoons cooking oiw OwO",
                "3. When the oiw is hot enough, pan-fwy the mawinated chicken fow 2 minutes pew side. UwU",
                "4. Pour-in the wemaining mawinade, incwuding garlic. Add watew. Bwing to a boiw. 1 1/2 cups watew",
                "5. Add dwied bay weaves and whole peppewcorn. Simmew fow 30 minutes ow untiw the chicken gets tendew. 3 pieces dwied bay weaves, 1 teaspoon whole peppewcorn",
                "6. Add vinegar. Stiw and cook fow 10 minutes. 4 tabwespoons white vinegar",
                "Put-in the sugaw and sawt. Stiw and tuwn the heat off. Sewve hot. Shawe and Enjoy! ^_^ 1 teaspoon sugaw, 1/4 teaspoon sawt"
                ],"serves": "4 people UwU"
          },
          
      ]
        `,
      },
      apiMessages,
    ],
  };

      
      cancelRequest = () => {
        source.cancel('Operation canceled by the user.');
       
        
      }

     try  {
    const  response =  axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${ await getLocalStorage("none").then(e=>(decryptText(e)))}`,
        "Content-Type": "application/json",
      }
    });
  
    return JSON.parse((await response).data.choices[0].message.content);
  } catch (e) {
    return [];
  }

  


 




        
}

export default OpenAIText

export { cancelRequest };