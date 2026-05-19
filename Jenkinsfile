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
                    withCredentials([
                        usernamePassword(credentialsId: 'docker-registry-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS'),
                        file(credentialsId: 'cosign-key', variable: 'COSIGN_KEY_PATH'),
                        string(credentialsId: 'cosign-password', variable: 'COSIGN_PASSWORD')
                    ]) {
                        sh '''
                            set +x
                            # Create a temporary docker config for cosign
                            TMP_DOCKER_CONFIG=$(mktemp -d)
                            chmod 777 "$TMP_DOCKER_CONFIG"
                            
                            echo "$DOCKER_PASS" | docker --config "$TMP_DOCKER_CONFIG" login -u "$DOCKER_USER" --password-stdin
                            chmod 644 "$TMP_DOCKER_CONFIG/config.json"
                            
                            COSIGN_KEY_CONTENT=$(cat "$COSIGN_KEY_PATH")
                            
                            # Use a function to avoid multi-line expansion issues in variables
                            sign_image() {
                                image_name=$1
                                docker run --rm \
                                    -e COSIGN_PASSWORD="$COSIGN_PASSWORD" \
                                    -e COSIGN_KEY="$COSIGN_KEY_CONTENT" \
                                    -e DOCKER_CONFIG=/auth \
                                    -v "$TMP_DOCKER_CONFIG":/auth \
                                    -v /var/run/docker.sock:/var/run/docker.sock \
                                    gcr.io/projectsigstore/cosign:v2.4.1 \
                                    sign --key env://COSIGN_KEY --tlog-upload=false "$image_name"
                            }
                            
                            echo "Signing Backend images..."
                            sign_image "$DOCKER_HUB_USER/$APP_NAME-backend:$BUILD_NUMBER"
                            sign_image "$DOCKER_HUB_USER/$APP_NAME-backend:latest"
                            
                            echo "Signing Frontend images..."
                            sign_image "$DOCKER_HUB_USER/$APP_NAME-frontend:$BUILD_NUMBER"
                            sign_image "$DOCKER_HUB_USER/$APP_NAME-frontend:latest"
                            
                            # Cleanup
                            rm -rf "$TMP_DOCKER_CONFIG"
                            set -x
                        '''
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
