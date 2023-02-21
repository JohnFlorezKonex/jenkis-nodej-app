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
            sh 'npm run start'
        }
    }
  }
}