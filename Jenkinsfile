pipeline {
  agent any
  tools {
    nodejs '12.22.12'
  }
  environment {
      CI = "false"
      HOME = '.'
      NPM_CONFIG_CACHE = 'npm-cache'
  }
  stages {
    stage('TEST npm whoami') {
    withCredentials([string(
                credentialsId: 'npm-token',
                variable: 'NPM_TOKEN')]) {
        sh "echo //registry.npmjs.org/:_authToken=${env.NPM_TOKEN} > .npmrc"
        sh 'npm whoami'
        sh 'rm .npmrc'
      }
    }
    // Install Dependencies
    stage('Install Dependencies') {
      steps{
          sh 'npm install'
      }
    }
    // Tests
    stage('Unit Tests') {
      steps{
          sh 'npm run test'
      }
    }
    // Test Connection
    stage('Test Connection') {
      steps{  
            sh 'node -v'
        }
    }
  }
}