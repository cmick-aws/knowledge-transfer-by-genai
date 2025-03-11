# Deployment Instructions

## Enabling Generative AI Models

You need to enable the generative AI models from the AWS Management Console. Two types of models need to be enabled: the embedding model (Titan Embed Text v1) and the chat response model (Claude 3).

### Embedding Model (Titan Embed Text v1)

From the Management Console, go to your deployment region (e.g., ap-northeast-1) > `Bedrock` > Model access, and enable Titan Embedding G1 - Text.

![](./imgs/run_demo/model_access_2.png)

### Chat Response Model (Claude 3)

Next, from the Management Console, go to the chat response model region (default is us-west-2) > `Bedrock` > Model access, and enable the Claude 3 model.

![](./imgs/run_demo/model_access_1.png)

> [!Important]
> If you want to change the chat response model region from us-west-2, modify the `bedrockRegion` in [cdk.json](../cdk/cdk.json). For more details, see "Deploying with CDK" below.

## Deploying with CDK

- Please prepare a UNIX command and Node.js, Docker execution environment. If you don't have one, you can use [AWS EC2 Setup for Prototyping](https://github.com/aws-samples/ec2-setup-for-prototyping) (access via SSH).
- Clone this repository

```sh
git clone https://github.com/aws-samples/knowledge-transfer-by-genai
```

- Install [esbuild](https://esbuild.github.io/) and [AWS CDK](https://aws.amazon.com/cdk/)

```sh
npm i -g esbuild
npm i -g aws-cdk
```

- Install npm packages that the project depends on, then build

```sh
cd knowledge-transfer-by-genai
npm install
npm run build
```

- Before CDK deployment, you need to perform Bootstrap once for the us-east-1 region and your deployment region. Here we'll deploy to the Tokyo region (ap-northeast-1). Replace \<account id\> with your deployment account ID.

```sh
cd cdk
cdk bootstrap aws://<account id>/us-east-1
cdk bootstrap aws://<account id>/ap-northeast-1
```

- Edit the following items in [cdk.json](../cdk/cdk.json) as needed

  - `bedrockRegion`: Region for using the chat response model (default: us-west-2)
  - `allowedIpV4AddressRanges`, `allowedIpV6AddressRanges`: Specify allowed IP address ranges

- Deploy the project. Depending on your environment, it takes about 20 minutes.

```sh
cdk deploy --require-approval never --all
```

- If you get output like below, it's successful. The web application URL will be output at `KnowledgeTransferStack.DistributionUrl`, please access it from your browser.

```sh
 ✅  KnowledgeTransferStack

✨  Deployment time: 732.74s

Outputs:
...
KnowledgeTransferStack.DistributionUrl = https://xxxxxxx.cloudfront.net
...
Stack ARN:
arn:aws:cloudformation:ap-northeast-1:1234:stack/KnowledgeTransferStack/yyyy

✨  Total time: 762.56s
```

This concludes the deployment instructions. Please proceed to [Running the Demo](./run_demo.md).

## Troubleshooting

### CDK deploy

The deployment command deploys two stacks: [UsEast1Stack](../cdk/lib/us-east-1-stack.ts) and [KnowledgeTransferStack](../cdk/lib/knowledge-transfer-stack.ts). The `KnowledgeTransferStack` must be deployed to a region **other than** us-east-1. If you see the following error message during deployment, please verify that the deployment region is **not** us-east-1.

```
CrossRegionEventRuleXXXX
Resource handler returned message: "Source EventBus and Target EventBus must not be the same.
```