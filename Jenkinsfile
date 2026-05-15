pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "my-registry.io"
        APP_NAME = "blood-donation"
        SONAR_TOKEN = credentials('sonar-token')
        DOCKER_CREDS = credentials('docker-registry-creds')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Secrets Scan') {
            steps {
                // Utilisation de Gitleaks ou Trufflehog
                sh 'docker run --rm -v $(pwd):/path zricethezav/gitleaks:latest detect --source="/path" --verbose'
            }
        }

        stage('Code Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build Images') {
            steps {
                parallel(
                    "Backend": {
                        sh "docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER} ./backend"
                    },
                    "Frontend": {
                        sh "docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER} ./frontend"
                    }
                )
            }
        }

        stage('Vulnerability Scan') {
            steps {
                parallel(
                    "Scan Backend": {
                        sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER}"
                    },
                    "Scan Frontend": {
                        sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER}"
                    }
                )
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-creds') {
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker logout ${DOCKER_REGISTRY} || true"
            cleanWs()
        }
        failure {
            echo "Pipeline failed! Sending notification..."
        }
    }
}
