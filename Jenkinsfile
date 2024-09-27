pipeline {
    agent any
    tools {
        nodejs 'Node_18' // Use a stable NodeJS version
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
                sh 'npm install playwright mocha @reportportal/agent-js-mocha@5.0.3'
                sh 'chmod +x ./node_modules/.bin/*'
                sh 'npx playwright install-deps'
                sh 'npx playwright install'
            }
        }
        // Remove Configure ReportPortal stage since we're using environment variables
        // Remove Verify Configuration stage
        stage('Run Tests') {
            steps {
                withCredentials([string(credentialsId: 'reportportal-token', variable: 'RP_API_KEY')]) {
                    withEnv([
                        'RP_ENDPOINT=http://192.168.0.108:8081/api/v1',
                        'RP_PROJECT=superadmin_personal',
                        'RP_LAUNCH=Playwright Test Run',
                        'RP_DESCRIPTION=Playwright tests',
                        'RP_ATTRIBUTES=platform:jenkins',
                        'RP_MODE=DEFAULT',
                        'RP_DEBUG=true'
                    ]) {
                        sh 'echo "RP_API_KEY is set"'
                        // Print non-sensitive environment variables
                        sh 'env | grep RP_ | grep -v RP_API_KEY || true'
                        // Run the tests
                        sh '''
                        set -e
                        npx mocha --reporter @reportportal/agent-js-mocha test/loginTest.js
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
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.\nReportPortal: http://192.168.0.108:8081/ui/#superadmin_personal/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.\nReportPortal: http://192.168.0.108:8081/ui/#superadmin_personal/launches/all\nSee details: ${env.BUILD_URL}"
            )
        }
    }
}
