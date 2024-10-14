pipeline {
    agent any
    tools {
        nodejs 'Node_18'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-excersise.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install playwright mocha'
                sh 'chmod +x ./node_modules/.bin/*'
                sh 'npx playwright install-deps'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                withEnv(['REPORT=true']) {
                    sh '''
                    set -e
                    npx mocha test/loginTest.js
                    '''
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                color: '#36a64f',
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.See details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.See details: ${env.BUILD_URL}"
            )
        }
    }
}
