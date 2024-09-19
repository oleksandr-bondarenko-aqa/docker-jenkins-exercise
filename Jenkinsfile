pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-excersise.git'
            }
        }
        stage('Install Node.js') {
            steps {
                sh '''
                curl -sL https://deb.nodesource.com/setup_16.x | bash -
                apt-get update
                apt-get install -y nodejs
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
