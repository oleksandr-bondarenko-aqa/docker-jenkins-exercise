pipeline {
    agent any
    tools {
        nodejs 'Node_22'  // Specify NodeJS version
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-excersise.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                    apt-get update && apt-get install -y \
                    libglib2.0-0 \
                    libnss3 \
                    libnspr4 \
                    libdbus-1-3 \
                    libatk1.0-0 \
                    libatk-bridge2.0-0 \
                    libcups2 \
                    libdrm2 \
                    libxcb1 \
                    libxkbcommon0 \
                    libasound2
                '''
                sh 'npm install'
                sh 'npm install mocha'
                sh 'chmod +x ./node_modules/.bin/mocha'
                sh 'chmod +x ./node_modules/.bin/playwright'
                sh 'npx playwright install'  // This should not need sudo now
            }
        }

        stage('Run Tests') {
            steps {
                sh './node_modules/.bin/mocha test/loginTest.js'  // Explicitly run mocha
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
