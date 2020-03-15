pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('SCM Check') {
            steps {
                git 'https://github.com/Moodrammer/Symphonia-FE'
            }
        }
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
