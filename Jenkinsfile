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
                    docker.withRegistry('', 'docker-registry-creds') {
                        withCredentials([file(credentialsId: 'cosign-key', variable: 'COSIGN_KEY_PATH'), string(credentialsId: 'cosign-password', variable: 'COSIGN_PASSWORD')]) {
                            sh '''
                                set +x
                                COSIGN_KEY_CONTENT=$(cat "$COSIGN_KEY_PATH")
                                
                                echo "Signing Backend images..."
                                docker run --rm \
                                    -e COSIGN_PASSWORD="$COSIGN_PASSWORD" \
                                    -e COSIGN_KEY="$COSIGN_KEY_CONTENT" \
                                    -v /var/run/docker.sock:/var/run/docker.sock \
                                    -v /home/jenkins/.docker/config.json:/root/.docker/config.json \
                                    gcr.io/projectsigstore/cosign:v2.4.1 \
                                    sign --key env://COSIGN_KEY --tlog-upload=false \
                                    $DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER
                                
                                docker run --rm \
                                    -e COSIGN_PASSWORD="$COSIGN_PASSWORD" \
                                    -e COSIGN_KEY="$COSIGN_KEY_CONTENT" \
                                    -v /var/run/docker.sock:/var/run/docker.sock \
                                    -v /home/jenkins/.docker/config.json:/root/.docker/config.json \
                                    gcr.io/projectsigstore/cosign:v2.4.1 \
                                    sign --key env://COSIGN_KEY --tlog-upload=false \
                                    $DOCKER_HUB_USER/$APP_NAME-backend:latest
                                
                                echo "Signing Frontend images..."
                                docker run --rm \
                                    -e COSIGN_PASSWORD="$COSIGN_PASSWORD" \
                                    -e COSIGN_KEY="$COSIGN_KEY_CONTENT" \
                                    -v /var/run/docker.sock:/var/run/docker.sock \
                                    -v /home/jenkins/.docker/config.json:/root/.docker/config.json \
                                    gcr.io/projectsigstore/cosign:v2.4.1 \
                                    sign --key env://COSIGN_KEY --tlog-upload=false \
                                    $DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER
                                
                                docker run --rm \
                                    -e COSIGN_PASSWORD="$COSIGN_PASSWORD" \
                                    -e COSIGN_KEY="$COSIGN_KEY_CONTENT" \
                                    -v /var/run/docker.sock:/var/run/docker.sock \
                                    -v /home/jenkins/.docker/config.json:/root/.docker/config.json \
                                    gcr.io/projectsigstore/cosign:v2.4.1 \
                                    sign --key env://COSIGN_KEY --tlog-upload=false \
                                    $DOCKER_HUB_USER/$APP_NAME-frontend:latest
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
