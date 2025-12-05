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
            steps {
                echo "Instalando dependencias del backend..."
                dir('backend-music-portal') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend - Build') {
            steps {
                echo "Construyendo backend..."
                dir('backend-music-portal') {
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend - Install dependencies') {
            steps {
                echo "Instalando dependencias del frontend..."
                dir('music-portal') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
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
