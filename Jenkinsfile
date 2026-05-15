pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "aro2304"
        APP_NAME = "hemoflow"
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
                sh 'docker run --rm -v $(pwd):/path zricethezav/gitleaks:latest detect --source="/path" --verbose || true'
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
                        sh "docker build -t ${DOCKER_HUB_USER}/${APP_NAME}-backend:${BUILD_NUMBER} -t ${DOCKER_HUB_USER}/${APP_NAME}-backend:latest ./backend"
                    },
                    "Frontend": {
                        sh "docker build -t ${DOCKER_HUB_USER}/${APP_NAME}-frontend:${BUILD_NUMBER} -t ${DOCKER_HUB_USER}/${APP_NAME}-frontend:latest ./frontend"
                    }
                )
            }
        }

        stage('Vulnerability Scan') {
            steps {
                parallel(
                    "Scan Backend": {
                        sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_HUB_USER}/${APP_NAME}-backend:${BUILD_NUMBER}"
                    },
                    "Scan Frontend": {
                        sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_HUB_USER}/${APP_NAME}-frontend:${BUILD_NUMBER}"
                    }
                )
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-registry-creds') {
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-backend:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-backend:latest"
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-frontend:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-frontend:latest"
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
