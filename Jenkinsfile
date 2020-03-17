pipeline {
    agent any
    stages {
        stage('SCM Check') {
            steps {
                git credentialsId: '95f22d8f-3ff4-46e8-ad52-136a1f5c61d6', url: 'https://github.com/Moodrammer/Symphonia-FE.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install package.json'
                sh 'npm run build'
            }
        }
         stage('Test') {
            steps {
                sh 'npm run test:unit'
            }
        }
           
    }
}
