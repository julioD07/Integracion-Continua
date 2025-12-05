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
                    image 'node:20'       // versión LTS estable
                    args '-u root:root'   // permisos root dentro del contenedor
                }
            }
            steps {
                echo "Instalando dependencias y construyendo backend..."
                dir('backend-music-portal') {
                    sh 'rm -rf node_modules/.cache'  // limpia cache para evitar conflictos
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend - Install & Build') {
            agent {
                docker { 
                    image 'node:20'
                    args '-u root:root'
                }
            }
            steps {
                echo "Instalando dependencias y construyendo frontend..."
                dir('music-portal') {
                    sh 'rm -rf node_modules/.cache'
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
