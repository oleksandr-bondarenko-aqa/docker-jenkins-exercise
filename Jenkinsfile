pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-excersise.git'
            }
        }
        stage('Build and Test with Docker') {
            steps {
                script {
                    docker.image('node:20').inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
