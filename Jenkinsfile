pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "aro2304"
        APP_NAME = "hemoflow"
        DOCKER_REGISTRY = ""
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Secrets Scan') {
            steps {
                sh 'docker run --rm -v $(pwd):/path zricethezav/gitleaks:latest detect --source="/path" --no-git --verbose || true'
            }
        }

        stage('Build Images') {
            steps {
                parallel(
                    "Backend": {
                        sh 'docker build -t $DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER -t $DOCKER_HUB_USER/$APP_NAME-backend:latest ./backend'
                    },
                    "Frontend": {
                        sh 'docker build -t $DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER -t $DOCKER_HUB_USER/$APP_NAME-frontend:latest ./frontend'
                    }
                )
            }
        }

        stage('Vulnerability Scan') {
            steps {
                parallel(
                    "Scan Backend": {
                        sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL $DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER'
                    },
                    "Scan Frontend": {
                        sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL $DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER'
                    }
                )
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-registry-creds') {
                        sh 'docker push $DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER'
                        sh 'docker push $DOCKER_HUB_USER/$APP_NAME-backend:latest'
                        sh 'docker push $DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER'
                        sh 'docker push $DOCKER_HUB_USER/$APP_NAME-frontend:latest'
                    }
                }
            }
        }

        stage('Sign Images') {
            steps {
                script {
                    // Download cosign binary directly to the agent to avoid Docker-in-Docker volume/auth issues
                    sh 'curl -L https://github.com/sigstore/cosign/releases/download/v2.4.1/cosign-linux-amd64 -o cosign && chmod +x cosign'
                    
                    withCredentials([
                        file(credentialsId: 'cosign-key', variable: 'COSIGN_KEY_PATH'),
                        string(credentialsId: 'cosign-password', variable: 'COSIGN_PASSWORD')
                    ]) {
                        docker.withRegistry('', 'docker-registry-creds') {
                            sh '''
                                set +x
                                export COSIGN_PASSWORD="$COSIGN_PASSWORD"
                                
                                echo "Signing Backend images..."
                                ./cosign sign --key "$COSIGN_KEY_PATH" --tlog-upload=false $DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER
                                ./cosign sign --key "$COSIGN_KEY_PATH" --tlog-upload=false $DOCKER_HUB_USER/$APP_NAME-backend:latest
                                
                                echo "Signing Frontend images..."
                                ./cosign sign --key "$COSIGN_KEY_PATH" --tlog-upload=false $DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER
                                ./cosign sign --key "$COSIGN_KEY_PATH" --tlog-upload=false $DOCKER_HUB_USER/$APP_NAME-frontend:latest
                                set -x
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout $DOCKER_REGISTRY || true'
            cleanWs()
        }
        failure {
            echo "Pipeline failed! Sending notification..."
        }
    }
}
