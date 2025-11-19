pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "Clonando repositorio..."
                checkout scm
            }
        }

        stage('Confirmacion') {
            steps {
                echo "Pipeline ejecutado correctamente."
                sh 'ls -la'
            }
        }
    }
}
