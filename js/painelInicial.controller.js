var app = angular.module('app', ['ui.mask','angular-loading-bar']);

app.controller('painelInicialController', function($scope, $http, $window){

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined){
        window.location = "index.html"
    }
	
    $scope.desabilitado = false;
    $scope.showCadastro = false;
    $scope.endereco = objEndereco();
    $scope.allEnderecos = {};
    $scope.url_rest = "http://api-hck.hotmart.com/hack-dragonfly/rest/v1/";

    $scope.abreCadastroEndereco = function(){
    	$scope.endereco = objEndereco();
        $window.scrollTo(0, 0);
        if ($scope.showCadastro){
            $scope.showCadastro = false;
            $scope.desabilitado = false;
        }else{
            $scope.showCadastro = true;

        }
        
    };
    
    $scope.getEndereco = function(id){       
        
         $http
            .get($scope.url_rest + 'address/'+ id, {headers: {
                'Authorization': "Bearer " + $window.sessionStorage.token                        
            }})
            .success(function(data){
                
                $scope.endereco = data;             
                $scope.showCadastro = true;
                $scope.desabilitado = true;
                $window.scrollTo(0, 0);
            })
            .error(function(){
                 $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
            });

        
    };

    $scope.listarEnderecos = function(){       

        var req = {
            method: 'GET',
            url: $scope.url_rest + 'address',
            headers: {
                'Authorization': "Bearer " + $window.sessionStorage.token                        
            },
            data: {}
        }

        $http(req).then(
            function (resposta) {               
                $scope.allEnderecos = resposta.data.data;
               
            },
            function (erro) {
                console.log('erro',erro);               
            }
        );
    };

    $scope.processaFormEndereco = function(){

    	if ($scope.endereco.id === -1){
    		$scope.cadastrarNovoEndereco();
    	}else{
    		$scope.alterarEndereco();
    	}
    };
    
    $scope.cadastrarNovoEndereco = function(){       


        $http
            .post($scope.url_rest + 'address', $scope.endereco, {headers: {
                'Authorization': "Bearer " + $window.sessionStorage.token                        
            }})
            .success(function(data){
                
                $.gritter.add({
                    title : "Sucesso!",
                    text : "Notícia cadastrada com sucesso!",
                    class_name : "gritter"
                });
                
                $scope.showCadastro = false;
                $scope.endereco = objEndereco();
                $scope.listarEnderecos();
            
            })
            .error(function(){
                 $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
            });
    };

    $scope.alterarEndereco = function(){
       var alteracao = {"label": $scope.endereco.label, "availableItems": [1]};
       $http
            .put($scope.url_rest + 'address/'+ $scope.endereco.id, alteracao,{headers: {
                'Authorization': "Bearer " + $window.sessionStorage.token                        
            }})
            .success(function(data){
                
                if(!data.erro) {
                    // deu certo a alteração
                    
                    $.gritter.add({
                        title : "Sucesso!",
                        text : "Endereço alterado com sucesso!",
                        class_name : "gritter"
                    });
                    
                    $scope.showCadastro = false;
                    $scope.desabilitado = false;
                    $scope.endereco = objEndereco();
                    $scope.listarEnderecos();
                } else {
                    $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
                }
            
            })
            .error(function(){
                 $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
            });
    };

     $scope.deletaEndereco = function(id){
       
       $http
            .delete($scope.url_rest + 'address/'+ id,{headers: {
                'Authorization': "Bearer " + $window.sessionStorage.token                        
            }})
            .success(function(data){
                
                if(!data.erro) {                  
                    
                    $.gritter.add({
                        title : "Sucesso!",
                        text : "Endereço deletado com sucesso!",
                        class_name : "gritter"
                    });
                    
                    $scope.endereco = objEndereco();
                    $scope.listarEnderecos();
                } else {
                    $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
                }
            
            })
            .error(function(){
                 $.gritter.add({
                        title : "Falha!",
                        text : "Ocorreu um erro!",
                        class_name : "gritter"
                    }); 
            });
    };
    
    $scope.procuraCep = function(cep){
        if (cep != null && cep != undefined && cep != ""){
             $http
            .get('http://api.postmon.com.br/v1/cep/'+ cep)
            .success(function(data){
                if (data.cidade != null && data.cidade != ""){
                    $scope.endereco.city = data.cidade;
                }
                if (data.estado != null && data.estado != ""){
                    $scope.endereco.state = data.estado;
                }
                 if (data.logradouro != null && data.logradouro != ""){
                    $scope.endereco.address = data.logradouro;
                }
                if (data.bairro != null && data.bairro != ""){
                    $scope.endereco.neighborhood = data.bairro;
                }
              
            
            })
        }
       
    }

    $scope.listarEnderecos();
    
});

function objEndereco(){
    return {
        id : -1,
        label : "",
        latitude : "",
        longitude : "",
        city : "",
        zipCode : "",
        state : "",
        complement : "",
        address : "",
        neighborhood : "",
        number : "",
        country : ""

    };
}

