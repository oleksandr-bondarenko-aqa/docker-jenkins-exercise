pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your Git repository
                git branch: 'main', url: 'https://github.com/oleksandr-bondarenko-aqa/docker-jenkins-excersise.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your Mocha tests
                sh 'npx mocha test/loginTest.js'
            }
        }
    }

    post {
        always {
            // Archive test reports (if any)
            archiveArtifacts artifacts: '**/test-results.xml', allowEmptyArchive: true

            // Clean up after the build
            cleanWs()
        }
    }
}
