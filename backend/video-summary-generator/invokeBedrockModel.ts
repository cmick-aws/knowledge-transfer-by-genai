import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { updateMeeting } from "@industrial-knowledge-transfer-by-genai/common";

const { KNOWLEDGE_BUCKET_NAME, BEDROCK_REGION, BEDROCK_MODEL_ID } = process.env;

const s3Client = new S3Client({});
const bedrockClient = new BedrockRuntimeClient({ region: BEDROCK_REGION });

const SUMMARY_INSTRUCTIONS = `
Your task is to take minutes. You will be given a raw transcript of the meeting audio file.
This transcript was converted from speech to text by an imperfect machine learning model, so it may not be grammatically correct.
Also, since it is a recording of human conversation, it may contain filler words and expressions that are needed for the flow of the conversation.
Therefore, you will first organize the given transcript into a readable minutes, and then create a summary.
<guideline>
- Organize the entire text of a given transcript as a meeting minute
- Identify the main points
- List decisions and action items
- Create a summary based on the above
- Provide background and details to support the summary
- Write the minutes in the same language as the transcript
</guideline>
Adhere to the guidelines above, and after determining the language of the transcript below, create minutes based on the transcript.
<transcript>TRANSCRIPT</transcript>
`;

export const invokeBedrockModel = async (event) => {
  let result: any = { status: "FAILED" };

  const transcriptUri =
    event.TranscriptionJob.TranscriptionJob.Transcript.TranscriptFileUri;

  const bucketName = transcriptUri.split("/")[3];
  const fileName = `${transcriptUri.split("/").slice(-2).join("/")}`;

  try {
    // Download the file from S3
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });
    const fileObject = await s3Client.send(getObjectCommand);
    const data = JSON.parse(await fileObject.Body!.transformToString());

    // Get the transcript
    const transcript = JSON.stringify(data.results.transcripts[0].transcript);
    const prompt = SUMMARY_INSTRUCTIONS.replace("TRANSCRIPT", transcript);

    console.debug(`transcript: ${transcript}`);
    console.debug(`prompt: ${prompt}`);

    // Create the payload for Bedrock
    const messages = [
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      },
    ];

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 4096,
      messages: messages,
      temperature: 0,
      top_p: 1,
    });

    console.log(`Invoking model: ${BEDROCK_MODEL_ID}`);

    const invokeModelCommand = new InvokeModelCommand({
      body,
      modelId: BEDROCK_MODEL_ID,
    });
    const response = await bedrockClient.send(invokeModelCommand);

    console.log(`bedrock response: ${JSON.stringify(response)}`);

    // Save the response value
    const assistantResponse = JSON.parse(Buffer.from(response.body).toString());
    console.log(`assistantResponse: ${JSON.stringify(assistantResponse)}`);

    const summaryFileName = `${event.Source.Payload.MeetingId}/${event.Source.Payload.SourceFileName}-summary.txt`;
    console.log(`summaryFileName: ${summaryFileName}`);

    // Save the response value in S3
    const putObjectCommand = new PutObjectCommand({
      Bucket: KNOWLEDGE_BUCKET_NAME,
      Key: summaryFileName,
      Body: assistantResponse.content[0].text,
      ContentType: "text/plain",
    });
    await s3Client.send(putObjectCommand);

    // Update the meeting on DynamoDB
    await updateMeeting(event.Source.Payload.MeetingId, {
      summarizedAt: new Date().toISOString(),
    });

    result = {
      bucketName: KNOWLEDGE_BUCKET_NAME,
      summaryKeyName: summaryFileName,
      status: "SUCCEEDED",
    };
  } catch (e) {
    console.error(`Error: ${e}`);
    throw e;
  }

  console.log(`result: ${JSON.stringify(result)}`);

  return result;
};
