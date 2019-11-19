(function() {
    'use strict';
    var unidescApp = angular.module("unidescApp");
    unidescApp.controller('camisetaController', camisetaController);

    camisetaController.$inject = ['$scope', '$http'];

    function camisetaController($scope, $http) {

        // $scope.message = "alo vc";
        var vm = this;
        var SERVICE_HOST_HTTP = "http://104.167.117.151";

        vm.init = function() {
            vm.listaProdutos();
        };



        vm.testService = function() {
            unidescService.test();
        };

        vm.index = -1;
        vm.produto = {};
        vm.produtos = [];




        vm.adicionarProdutos = function() {
            if (vm.index === -1) {
                vm.produtos.push(vm.produto);
                $http.post(SERVICE_HOST_HTTP + '/produtos/', vm.produto)
                    .then(
                        function(response) {
                            console.log(response);
                        },
                        function(err) {
                            console.log(err);
                        }
                    );
            } else {
                vm.produtos[vm.index] = vm.produto;
            }
            vm.produto = {};
            vm.index = -1;
        };

        vm.listaProdutos = function() {
            //$http.get('/someUrl', data, config)
            //.then(successCallback, errorCallback);
            $http.get(SERVICE_HOST_HTTP + '/produtos')
                .then(
                    function(response) {
                        vm.produtos = response.data.produtos;
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        };
        vm.editarProduto = function(item) {
            vm.produto = angular.copy(vm.produtos[item]);
            vm.index = item;
        };

        vm.deletarProduto = function(item) {
            vm.produtos.splice(item, 1);
        };
        vm.LimparProduto = function(item) {
            vm.produto = {};
            vm.index = -1;
        };

    }

    //----------------------------------------------------------------------------------------------








}());