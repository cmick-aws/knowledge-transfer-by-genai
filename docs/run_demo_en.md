# Running the Demo

## Preparation

### Creating Users

Create users on the account creation screen. Since we'll be testing video calls later, please create at least 2 users.

### Creating Alerts

Here we'll create dummy alerts. You can create dummy alerts from the alert button in the top right.

![](./imgs/run_demo/dummy_alert.png)

Once created, they will appear on the dashboard.

![](./imgs/run_demo/dashboard.png)

Note that alert information is managed in DynamoDB using the [Alert type](../backend/common/src/@types/alert.ts). By creating a separate mechanism to import into DynamoDB, you can create a more realistic demo. Dummy alerts are created in the `createDummyAlert` function in [this file](../backend/api/src/alert/alert.service.ts). You can create custom dummy alerts by modifying this file and deploying (specifically, running `cdk deploy`).

#### (Example) For Manufacturing Industry

To create alerts for production line anomaly detection or equipment failure response, you can use [AWS IoT Core](https://aws.amazon.com/iot-core/). For details, please refer to the [tutorial](https://docs.aws.amazon.com/iot/latest/developerguide/iot-ddb-rule.html) or [IoT Core hands-on](https://catalog.us-east-1.prod.workshops.aws/workshops/b3e0b830-79b8-4c1d-8a4c-e10406600035/en-US).

### (Optional) Uploading Existing Knowledge

- From the AWS Management Console, go to `CloudFormation` > `KnowledgeTransferStack` > `Outputs` tab and note the value of `S3BucketsKnowledgeBucketNameXXX`.
- From the Management Console, open `S3` with the noted bucket name.
- Click the "Upload" button and upload documents you want to include in the search. You can use .txt files, .pdf files, as well as .docx, .xlsx formats. For details, please check the [official documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html).
- From the Management Console, access `Amazon Bedrock` > `Knowledge bases` and access the knowledge base with the description "Industrial Knowledge Transfer By GenAI" (the name is `KBKnowledgeTrKnowledgeXXXXX`).
- Select `Data sources` > `knowledgetransferstack-s3bucketsknowledgebucketxxxx` and click "Sync". When synchronization is complete, the documents will be imported into OpenSearch.

> [!Important]
> File names must be UTF-8 encoded. It is recommended to use alphanumeric characters rather than Japanese characters for naming.

#### (Example) For Manufacturing Industry

You can use [defect report sheets](../sample/manufacturing/不具合報告シート/) as sample existing knowledge.

![](./imgs/run_demo/manufacturing_ref_sample.png)

## Chat and Video Calls

### Generative AI Chat (1st time)

Click on an alert to go to the details screen where you can chat. You can ask questions about how to handle the alert. If the system cannot answer from existing knowledge, you'll get responses like "I cannot answer from these search results."

![](./imgs/run_demo/detail_chat.png)

### Video Call

Have the application open simultaneously with different accounts, using different browsers or different devices. From the alert details screen, specify the email address of the call recipient from the contact information and click the "Call" button. A dialog will open and a call room will be created.

![](./imgs/run_demo/contact.png)

The recipient will receive an incoming call notification. Clicking the phone button will start a Chime video call. Turn on your microphone and video, and try having a conversation simulating interaction with an expert.

![](./imgs/run_demo/calee_dialog.png)

### Call Recording

After the call ends, an icon will appear in the video call record on the alert details screen after a while (a light-colored icon indicates that video saving is in progress, please wait until it turns dark black).

- Video saving in progress

![](./imgs/run_demo/concatenating.png)

- Video saving complete

![](./imgs/run_demo/concated.png)

Click the icon to view the call recording video. If the status is "Complete", you can download and refer to the call record summary.

![](./imgs/run_demo/recorded.png)

### Generative AI Chat (2nd time)

Open any alert details screen and ask questions related to the call content, and you'll get answers based on that content. You can click on citation numbers like [1] to check the referenced call recording and its summary.

> [!Important]
> The import into the KnowledgeBase happens after the summary is completed, so it may not be reflected immediately. If you get a message like "Cannot answer as it's not found in the search results" similar to the first time, please wait a few minutes and try again.

![](./imgs/run_demo/citation.png)

## Troubleshooting

### Chat freezes when entering text with no output

Please check if you have enabled model access. For details, refer to [Deployment Instructions](./deploy_en.md#enabling-generative-ai-models).

### InvalidArgument error when opening reference links

If you see the error below, please check that the file names imported into the KnowledgeBase are UTF-8 encoded.

```xml
<e>
<script/>
<Code>InvalidArgument</Code>
<Message>Header value cannot be represented using ISO-8859-1.</Message>
<ArgumentName>response-content-disposition</ArgumentName>
<ArgumentValue>attachment; filename="ほげほげ.xlsx"</ArgumentValue>
<RequestId>XXXXXX</RequestId>
<HostId>...</HostId>
</e>
```
