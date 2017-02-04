app.controller('loginController', function($scope, $http, $window){

	$scope.login = {
		username : "",
		password : ""
	};

	$scope.fazerLogin = function(){

		if ($scope.login.username == "" && $scope.login.password == ""){
			alert("Informe usuário e senha");
			return;
		}

		 var serviceBase = 'http://api-hck.hotmart.com/security/oauth/token';	


		var data = '?grant_type=password&username='+ $scope.login.username +'&password=' + $scope.login.password;
        var req = {
            method: 'POST',
            url: serviceBase + data,
            headers: {
                'Authorization': "Basic ZTZiZGVjY2ItNzM1OC00OTk3LWIzYzAtODk2NDBhZjEyZGRlOmQ5OWNmMTU0LTFjZGYtNDRiMi04MDJmLWU1YzhiYmU5NjY5OA=="                          
            },
            data: {}
        }

        $http(req).then(
            function (resposta) {               
                $window.sessionStorage.token = resposta.data.access_token;
                window.location = "painel-inicial.html"
            },
            function (erro) {
                console.log('erro',erro);
                alert("Verifique usuário ou senha");
            }
        );

		
	}

});