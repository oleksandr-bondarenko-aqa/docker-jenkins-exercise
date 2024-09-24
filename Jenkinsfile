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
