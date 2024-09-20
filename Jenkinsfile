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
                sh 'npm install'
                sh 'npm install mocha'
                sh 'chmod +x ./node_modules/.bin/mocha'
                sh 'chmod +x ./node_modules/.bin/playwright'
                sh 'npx playwright install --with-deps'  // Use --with-deps to install without sudo
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
