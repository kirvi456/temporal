 
node{
  
  stage('clonacion'){
    git branch: 'master',
    credentialsId: 'credenciales1',
    url: 'https://github.com/kirvi456/cliente_interno.git'
    
  }

  stage('instalacion de modulos'){
    sh 'sudo npm install'
  }
  
  stage('instalar la libreria'){
    sh 'sudo npm install -g polymer-cli --unsafe-perm'
  }  
   
  stage('lanzar aplicacion'){
    sh 'npm start -- --hostname 0.0.0.0 --port 8081 &'
  }

}
