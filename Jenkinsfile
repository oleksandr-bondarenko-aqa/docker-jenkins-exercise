pipeline {
    agent any
    tools {
        nodejs 'Node_18'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    git url: 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-exercise.git',
                        credentialsId: 'github-pat',
                        branch: 'master'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install @reportportal/agent-js-mocha@5.0.3'
                sh 'npm install playwright mocha chai'
                sh 'npx playwright install-deps'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                withCredentials([string(credentialsId: 'reportportal-token', variable: 'RP_API_KEY')]) {
                    withEnv([
                        'RP_ENDPOINT=http://192.168.0.108:8081/api/v1',
                        'RP_PROJECT=superadmin_personal',
                        'RP_LAUNCH=Playwright Test Run',
                        'RP_DESCRIPTION=Playwright tests',
                        'RP_PLATFORM=jenkins'
                    ]) {
                        sh '''
                        set -e
                        node runTests.js
                        '''
                    }
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
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.ReportPortal: http://192.168.0.108:8081/ui/#superadmin_personal/launches/all See details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.ReportPortal: http://192.168.0.108:8081/ui/#superadmin_personal/launches/all See details: ${env.BUILD_URL}"
            )
        }
    }
}
