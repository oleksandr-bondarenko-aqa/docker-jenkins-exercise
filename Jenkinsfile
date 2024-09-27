pipeline {
    agent any
    tools {
        nodejs 'Node_22'
    }
    environment {
        REPORT_PORTAL_TOKEN = credentials('reportportal-token') // Use the credential ID
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
                // Create reportportal.conf.json
                writeFile file: 'reportportal.conf.json', text: """
{
  "endpoint": "http://192.168.0.108:8081/api/v1",
  "project": "docker-jenkins-exercise",
  "token": "${REPORT_PORTAL_TOKEN}",
  "launch": "Playwright Test Run",
  "description": "Playwright tests",
  "attributes": [
    {
      "key": "platform",
      "value": "jenkins"
    }
  ],
  "mode": "DEFAULT",
  "debug": false
}
"""
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx mocha --reporter @reportportal/agent-js-mocha --reporter-options configFile=./reportportal.conf.json test/loginTest.js'
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
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.\nReportPortal: http://192.168.0.108:8081/ui/#${env.REPORT_PORTAL_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.\nReportPortal: http://192.168.0.108:8081/ui/#${env.REPORT_PORTAL_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
    }
}
