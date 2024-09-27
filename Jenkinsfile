pipeline {
    agent any
    tools {
        nodejs 'Node_22' //
    }
    environment {
        RP_ENDPOINT = 'http://192.168.0.108:8081/api/v1'
        RP_PROJECT = 'docker-jenkins-exercise'
        RP_LAUNCH = 'Playwright Test Run'
        RP_DESCRIPTION = 'Playwright tests'
        RP_ATTRIBUTES = 'platform:jenkins'
        RP_MODE = 'DEFAULT'
        RP_DEBUG = 'false'
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
                sh 'npm install playwright mocha @reportportal/agent-js-mocha'
                sh 'chmod +x ./node_modules/.bin/*'
                sh 'npx playwright install-deps'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                withCredentials([string(credentialsId: 'reportportal-token', variable: 'RP_API_KEY')]) {
                    sh 'npx mocha --reporter @reportportal/agent-js-mocha test/loginTest.js'
                }
            }
        }
    }
    post {
        always {
            script {
                node {
                    cleanWs()
                }
            }
        }
        success {
            slackSend(
                color: '#36a64f',
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.\nReportPortal: http://${env.RP_ENDPOINT.split('/api/v1')[0]}/ui/#${env.RP_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.\nReportPortal: http://${env.RP_ENDPOINT.split('/api/v1')[0]}/ui/#${env.RP_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
    }
}
