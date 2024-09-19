pipeline {
    agent {
        docker {
            image 'node:20'   // Use the Node.js Docker image
            args '-u root'    // Run as root to have proper permissions
        }
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
