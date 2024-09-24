pipeline {
    agent any
    tools {
        nodejs 'Node_22'
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
                sh 'npx mocha test/loginTest.js'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
