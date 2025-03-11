# Knowledge Transfer Using Generative AI

[English](./README-en.md) | [日本語](./README.md)

The emergence of generative AI has enabled troubleshooting and decision support across various fields. While RAG technology is important for utilizing company-specific knowledge with AI, a "human-in-the-loop" mechanism is effective for knowledge that is not explicitly documented. This sample demonstrates a skill transfer system that accumulates expert knowledge through video calls and allows AI to utilize that knowledge. This approach can be applied to a wide range of fields such as manufacturing, IT operations, healthcare, construction and infrastructure maintenance, enabling effective skill transfer to the next generation.

![](./docs/imgs/human-in-the-loop.png)
![](./docs/imgs/screen1.png)
![](./docs/imgs/screen2.png)

## Background

In recent years, the emergence of generative AI has made natural dialogue and text generation possible. This technology is expected to be used for troubleshooting and decision support in various fields such as manufacturing, IT operations, healthcare, and education.

When utilizing generative AI in these fields, it is necessary to reference specific documented knowledge held by each company or organization. To achieve this, the use of RAG (Retrieval-Augmented Generation) is important. Through RAG, AI can search and reference past records and expert knowledge to generate appropriate responses.

However, specific knowledge is not always documented, and in many cases, it is personalized. In such cases, a **human-in-the-loop** mechanism is effective. This is a method where AI and humans collaborate, with humans addressing problems that AI cannot solve while accumulating knowledge. For example, in the following industry examples, video calls can be used to facilitate knowledge accumulation:

- **Manufacturing**: Troubleshooting on-site and transferring skilled technicians' know-how. In production line anomaly detection and equipment failure response, generative AI presents solutions by referencing past response records, while skilled technicians support handling through video calls to check the site. This enables quick and accurate responses, and skills are passed on to the next generation.

- **IT Operations**: Real-time response to server failures and system troubles. AI identifies the root cause of failures and suggests solutions by referencing past resolutions, but for complex problems or new failures, experienced operations engineers provide additional instructions through video calls for quick recovery. This enables knowledge sharing and technical inheritance.

- **Healthcare**: Remote medical care and emergency response advice from experienced doctors. Generative AI presents similar past cases based on patient symptoms and medical history, and experienced doctors provide real-time advice and determine treatment policies through video calls. This shares knowledge in medical settings and improves treatment accuracy, especially in areas with scarce medical resources.

- **Construction/Infrastructure Maintenance**: On-site emergency response and problem solving. For maintenance of aging infrastructure and unexpected troubles at construction sites, AI presents handling methods based on past data, and skilled technicians check the site through video calls and give appropriate instructions. This strengthens emergency response capabilities.

This sample demonstrates a mechanism where expert knowledge is accumulated through video calls, and generative AI uses that knowledge to enable future troubleshooting. This mechanism has the potential to be used for skill transfer and troubleshooting in various industries.

### Example of Skill Transfer in Manufacturing

In manufacturing, the on-site know-how and experience of skilled technicians are essential for troubleshooting and optimizing production processes. However, with the aging population, declining birthrate, and retirement of skilled technicians, such knowledge is often personalized, making transfer to the next generation a challenge. Especially in regional factories, chronic labor shortages are serious, making skill transfer from experts even more difficult.

By utilizing generative AI, even less experienced staff can troubleshoot by referencing past response records and skilled technicians' knowledge. For example, when an anomaly occurs in a production line, AI presents solutions, and if necessary, skilled technicians check the site through video calls and give appropriate instructions. This interaction is recorded and can be referenced by subsequent technicians, enabling skill transfer to the next generation.

![](./docs/imgs/concept.png)

- The operator checks alerts from the site.
- The operator inquires with the generative AI chatbot. The chatbot responds with causes, handling methods, and recommended on-site confirmation actions based on past reports.
- The operator requests the on-site engineer to check the situation via remote call, based on the AI-generated response.
- The on-site engineer checks the actual situation and performs response work. If cause identification or resolution is difficult, they may ask an expert to join the call.
- When the response is completed, the cause and handling method are documented and saved in a report.

By repeating such responses, the know-how of skilled technicians accumulates in past response histories, and it is expected that this knowledge can be effectively utilized even after skilled technicians retire. For more details, please see this blog: "[AWS Summit Japan: Skill Transfer with Generative AI! Introduction to Process Manufacturing Demo](https://aws.amazon.com/jp/blogs/news/aws-summit-japan-2024-generative-ai-demo-for-process-manufacturing/)" (in Japanese).

## Architecture

First, we'll introduce the overall architecture incorporating human-in-the-loop, then the application configuration, and finally the details of the recording pipeline.

### Human-in-the-loop

This architecture is a mechanism where generative AI and experts collaborate to accumulate knowledge, and AI supports troubleshooting.

- Users interact with AI in chat format through the generative AI service [Amazon Bedrock](https://aws.amazon.com/bedrock/).
- AI uses the [RAG (Retrieval-Augmented Generation)](https://aws.amazon.com/what-is/retrieval-augmented-generation/) method to search for existing knowledge from [Amazon OpenSearch Serverless](https://aws.amazon.com/opensearch-service/features/serverless/) and provide appropriate answers.
- Existing knowledge is stored in S3 buckets in advance and used as search targets.
- When new troubles occur that AI cannot handle, users interact with experts in real-time through the video call service [Amazon Chime](https://aws.amazon.com/chime/).
- After the call ends, the recorded call is converted to text by [Amazon Transcribe](https://aws.amazon.com/transcribe/), and then Amazon Bedrock creates a summary, which is added as new knowledge. This allows this knowledge to be used as a data source for RAG in subsequent troubleshooting, improving the response rate.

![](./docs/imgs/arch-overview.png)

### Application

- Frontend: A [React](https://react.dev/) app is delivered via [Amazon CloudFront](https://aws.amazon.com/cloudfront/) and [Amazon S3](https://aws.amazon.com/s3/), providing the user interface.
- Authentication: User authentication is performed using [Amazon Cognito](https://aws.amazon.com/cognito/).
- Video Calls: [AWS AppSync](https://aws.amazon.com/appsync/), [AWS Lambda](https://aws.amazon.com/lambda/), and [Amazon Chime](https://aws.amazon.com/chime/) are combined to provide video call functionality.
- Backend: Alert management, call record management, and chat functionality are implemented using AWS Lambda, Amazon Bedrock, [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), and Amazon OpenSearch Serverless. On Lambda, a [NestJS](https://nestjs.com/) application runs using [AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter).

![](./docs/imgs/arch-app.png)

### Recording Pipeline

When a video call ends, the following process is automatically executed:

- [Amazon EventBridge](https://aws.amazon.com/eventbridge/) detects the end of the call and triggers [AWS Step Functions](https://aws.amazon.com/step-functions/).
- Step Functions performs text conversion of the call recording (Amazon Transcribe), summary creation (Amazon Bedrock), and data ingestion into OpenSearch.
- The generated summary is ingested through the [Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) API and used for subsequent troubleshooting.

This architecture enables continuous skill transfer through the collaboration of generative AI and human knowledge.

![](./docs/imgs/arch-video-pipeline.png)

## Contents

- [Deployment Instructions](./docs/deploy_en.md)
- [Running the Demo](./docs/run_demo_en.md)
- [Local Development](./docs/dev_local_en.md)

## License

This sample is provided under the MIT-0 license. For details, please check the [license file](./LICENSE).

## Contribution

Please see [here](./CONTRIBUTING.md).
