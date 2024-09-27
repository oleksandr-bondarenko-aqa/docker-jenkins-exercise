pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright/node:v1.37.1-focal'
            args '-u root'
        }
    }
    tools {
        nodejs 'Node_18'
    }
    environment {
        RP_ENDPOINT = 'http://192.168.0.108:8081/api/v1'
        RP_PROJECT = 'docker-jenkins-exercise'
        RP_TOKEN = credentials('alex-rp-api-key_Di3xvfVHRXSbKgHv6tIQkcraivi_HXI9RfObVp7WYmYsVZr_mrNxCC5ou_JRM1ci')
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
                                sh 'chmod +x ./node_modules/.bin/playwright'
                                sh 'chmod +x ./node_modules/.bin/mocha'
                                sh 'npx playwright install-deps'
                                sh 'npx playwright install'
                            }
                        }
        stage('Run Tests') {
            steps {
                sh 'npx mocha --reporter mocha-reportportal-agent test/loginTest.js'
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
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.\nReportPortal: http://192.168.0.108:8081/ui/#${env.RP_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.\nReportPortal: http://192.168.0.108:8081/ui/#${env.RP_PROJECT}/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
    }
}
