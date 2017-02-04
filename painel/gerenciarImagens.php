<?php
    session_start();
    if(!isset($_SESSION['logado'])){
        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>Painel Administrativo - Login</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">        
        <link rel="stylesheet" href="../css/loading-bar.min.css">
        <link rel="stylesheet" href="../css/jquery.gritter.css">        
        <link rel="stylesheet" href="../css/estilo.css">
        
    </head>
    <body>
        
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="painel-inicial.php" target="_self">
                Gerenciar Imagens
              </a>
            </div>
          </div>
        </nav>
        
        <div ng-controller="gerenciarImagensController">       
        
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="alert alert-info">
                            Notícia: <strong>{{noticia.noticiatitulo}} de {{noticia.noticiadata}}</strong>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h3> Cadastro de imagens </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <input type="file" nv-file-select uploader="uploader" multiple>
                        <hr/>

                        <ul>
                            <li ng-repeat="item in uploader.queue" ng-init="item.imagemtitulo=''"> 
                                Nome: <span ng-bind="item.file.name"></span><br/>
                                Titulo: <input type="text" ng-model="item.imagemtitulo"><br/>
                                <button type="button" ng-click="item.upload()">Upload</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h3> Imagens cadastradas </h3>
                    </div>
                </div> 
                <div class="row" ng-show="imagens.length == 0">
                    <div class="col-xs-12">
                       Nenhuma imagem cadastrada.
                    </div>
                </div> 
                 <div class="row">
                    <div class="col-xs-12 col-sm-3 col-md-3" ng-repeat="imagem in imagens">
                        <img ng-src="../upload/{{imagem.imagemarquivo}}" title="{{imagem.imagemtitulo}}" class="img-responsive">
                        <button type="button" class="btn btn-danger btn-block" ng-click="excluirImagem(imagem.idimagem)"> Excluir </button>
                        <hr/>
                    </div>
                </div>                
            </div>   
            
        </div>
        
        <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>        
        <script src="../js/jquery/jquery.gritter.min.js"></script>        
        <script src="../js/angular/angular.min.js"></script>
        <script src="../js/angular/ui-utils.min.js"></script>        
        <script src="../js/angular/loading-bar.min.js"></script>    
        <script src="../js/angular/angular-file-upload.min.js"></script>        
        <script src="../js/gerenciarImagens.controller.js"></script>
    </body>
</html>