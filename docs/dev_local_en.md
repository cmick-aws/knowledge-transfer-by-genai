# Local Development

## Preparation

### Backend

- Deploy by following the [Deployment Instructions](./deploy_en.md)
- Set environment variables

```sh
export ACCOUNT_ID=1234567890
export REGION=ap-northeast-1
export ALERT_TABLE_NAME=KnowledgeTransferStack-DatabaseAlertTableXXXX
export MEETING_TABLE_NAME=KnowledgeTransferStack-DatabaseMeetingTableXXXX
export CONCATENATED_BUCKET_NAME=knowledgetransferstack-s3bucketsconcatenatedbucket-xxxx
export TRANSCRIPTION_BUCKET_NAME=knowledgetransferstack-s3bucketstranscriptionbucke-xxxx
export KNOWLEDGE_BUCKET_NAME=knowledgetransferstack-s3bucketsknowledgebucketxxx
export KNOWLEDGE_BASE_ID=XXXXX
export BEDROCK_REGION=us-west-2
export BEDROCK_AGENT_REGION=ap-northeast-1
```

### Frontend

- Navigate to the frontend directory

```sh
cd frontend
```

- Copy [.env.template](../frontend/src/.env.template) to the same directory and rename it to `.env`
- Open `.env` and fill in the items
  - Set `VITE_APP_ALERT_API_ENDPOINT` to `http://localhost:3000/api`

```sh
VITE_APP_USER_POOL_ID="ap-northeast-1_XXXXXX"
VITE_APP_USER_POOL_CLIENT_ID="xxxxxxx"
VITE_APP_CHIME_BACKEND="https://xxxxx.appsync-api.ap-northeast-1.amazonaws.com/graphql"
VITE_APP_ALERT_API_ENDPOINT="http://localhost:3000/api"
```

## Starting the Local Environment

Execute the following in the project root directory

```sh
npm run dev
```