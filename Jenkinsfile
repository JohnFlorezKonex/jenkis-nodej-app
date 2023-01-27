pipeline {
    agent any
    tools {
      nodejs '12.22.12'
    }
    environment {
        CI = "false"
        AWS_ACCOUNT_ID="967374987218"
        AWS_DEFAULT_REGION="us-east-1" 
        CLUSTER_NAME="default"
        SERVICE_NAME="custom-test-service"
        TASK_DEFINITION_NAME="task-backend-test"
        DESIRED_COUNT="1"
        IMAGE_REPO_NAME="967374987218.dkr.ecr.us-east-1.amazonaws.com/test-backend-app"
        IMAGE_TAG="${env.BUILD_ID}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        PORT = "3000"
	      registryCredential = "redcap-s3-aws"
    }
   
    stages {

    // Tests
    stage('Unit Tests') {
      steps{
        script {
          sh 'npm install'
	        sh 'npm test -- --watchAll=false'
        }
      }
    }
        
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
          /*REPO_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"  
          sh "pwd"
          sh "ls"
          sh "docker build -t ${IMAGE_REPO_NAME}:${IMAGE_TAG} ."
          sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPO_NAME}"*/
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
            docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
                dockerImage.push()
            }
            /*REPO_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"  
            sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com" 
            sh "docker push ${REPO_NAME}"*/
         }
        }
      }
      
    stage('Deploy') {
     steps{
            withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                script {
			              sh './script.sh'
                }
            } 
        }
      }      
      
    }
}

