pipeline {
    agent any
    tools {
      nodejs '12.22.12'
    }
    environment {
        CI = "false"
        AWS_ACCOUNT_ID="967374987218"
        AWS_DEFAULT_REGION="us-east-1" 
        CLUSTER_NAME="neat-qa"
        SERVICE_NAME="back_altenar"
        TASK_DEFINITION_NAME="back_altenar"
        DESIRED_COUNT="1"
        IMAGE_REPO_NAME="967374987218.dkr.ecr.us-east-1.amazonaws.com/neat-app-qa"
        IMAGE_TAG="back_altenar"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
	      registryCredential = "redcap-s3-aws"
    }
   
    stages {
      // Tests
      stage('Unit Tests') {
        steps{
            sh 'npm install --force --legacy-peer-deps '
            echo 'npm test -- --watchAll=false'
        }
      }
      // Building Docker images
      stage('Building image') {
        steps{
          script {
            dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
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
         }
        }
      }
      
      stage('Deploy') {
      steps{
              withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                  script {
                      sh 'chmod +x ./script.sh'
                      sh './script.sh'
                  }
              } 
          }
        }      
        
      }
}