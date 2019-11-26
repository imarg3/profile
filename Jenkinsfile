pipeline {
  agent any
  stages {
    stage('Building Image') {
      agent any
      steps {
        mail(subject: 'Test Mail from Jenkins Blue Ocean', body: 'Hello This is a test email sent from Jenkins Server.', from: 'garpit@cdac.in', to: 'garpit@cdac.in')
      }
    }

  }
  environment {
    registry = 'admincoder/centos7-jdk8'
    registryCredential = 'Adm!nc0der'
  }
}