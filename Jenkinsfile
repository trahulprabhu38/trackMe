pipeline {
    agent any

    environment {
        // Configure these in Jenkins credentials or environment variables
        RENDER_CLIENT_SERVICE_ID = 'your-client-service-id'
        RENDER_SERVER_SERVICE_ID = 'your-server-service-id'
        RENDER_API_KEY = credentials('RENDER_API_KEY') // Store in Jenkins credentials
        CLIENT_DIR = 'client'
        SERVER_DIR = 'server'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir(env.CLIENT_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Build Client') {
            steps {
                dir(env.CLIENT_DIR) {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir(env.SERVER_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    // Deploy Client (Static Site)
                    sh """
                        curl -X POST \
                        -H 'Authorization: Bearer ${RENDER_API_KEY}' \
                        -H 'Content-Type: application/json' \
                        https://api.render.com/v1/services/${RENDER_CLIENT_SERVICE_ID}/deploys
                    """

                    // Deploy Server (Web Service)
                    sh """
                        curl -X POST \
                        -H 'Authorization: Bearer ${RENDER_API_KEY}' \
                        -H 'Content-Type: application/json' \
                        https://api.render.com/v1/services/${RENDER_SERVER_SERVICE_ID}/deploys
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend(color: 'good', message: 'Deployment to Render succeeded!')
        }
        failure {
            slackSend(color: 'danger', message: 'Deployment to Render failed!')
        }
    }
}