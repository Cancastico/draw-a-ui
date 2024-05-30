import { AxiosNode } from "@/services/axios";
import { OpenAI } from "openai";

const systemPrompt = `You are an expert tailwind developer. A user will provide you with a
 low-fidelity wireframe of an application and you will return 
 a single html file that uses tailwind to create the website. Use creative license to make the application more fleshed out.
if you need to insert an image, use placehold.co to create a placeholder image. Respond only with the html file.`;

interface LlavaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[]
}

export async function POST(request: Request) {
  const { image } = await request.json();
  const cleanBase64Image = image.replace(/^data:image\/\w+;base64,/, "");
  const resp = await AxiosNode.post('/generate', { model: 'llava', prompt: systemPrompt, images: [cleanBase64Image] })

  const regex = /{[^}]*}/g;

  const matches = resp.data.match(regex);

  let list: any[] = [];

  if (matches) {
    list = matches.map((match: any) => JSON.parse(match));
  } else {
    console.log("Nenhum objeto encontrado.");
  }

  

  let stringResponse = '';
  list.forEach((item) => { if (item.response) { stringResponse = stringResponse + item.response } })
  

  return new Response(JSON.stringify({message:stringResponse}), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
