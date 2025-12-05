pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "Clonando repositorio..."
                checkout scm
            }
        }

        stage('Backend - Install dependencies') {
            agent {
                docker { image 'node:25.2' }
            }
            steps {
                echo "Instalando dependencias del backend..."
                dir('backend-music-portal') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend - Build') {
            agent {
                docker { image 'node:25.2' }
            }
            steps {
                echo "Construyendo backend..."
                dir('backend-music-portal') {
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend - Install dependencies') {
            agent {
                docker { image 'node:25.2' }
            }
            steps {
                echo "Instalando dependencias del frontend..."
                dir('music-portal') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            agent {
                docker { image 'node:25.2' }
            }
            steps {
                echo "Construyendo frontend..."
                dir('music-portal') {
                    sh 'npm run build'
                }
            }
        }

        stage('Confirmacion') {
            steps {
                echo "CI ejecutado exitosamente."
            }
        }
    }

    post {
        failure {
            echo "❌ El pipeline falló."
        }
        success {
            echo "✅ Pipeline ejecutado correctamente."
        }
    }
}
