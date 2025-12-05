pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "Clonando repositorio..."
                checkout scm
            }
        }

        stage('Backend - Install & Build') {
            agent {
                docker { 
                    image 'node:25.2' 
                    args '-u root:root'
                }
            }
            steps {
                echo "Instalando dependencias y construyendo backend..."
                dir('backend-music-portal') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend - Install & Build') {
            agent {
                docker { 
                    image 'node:25.2' 
                    args '-u root:root'
                }
            }
            steps {
                echo "Instalando dependencias y construyendo frontend..."
                dir('music-portal') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Confirmación') {
            steps {
                echo "✅ CI ejecutado exitosamente."
            }
        }
    }

    post {
        failure {
            echo "❌ El pipeline falló."
        }
        success {
            echo "✅ Pipeline completado correctamente."
        }
    }
}
