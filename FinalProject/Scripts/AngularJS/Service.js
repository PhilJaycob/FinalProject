app.service("FinalProjectService", function ($http) {

   /* this.threeFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/TreeFunction",
            data: registrationData
        })
        return response
    }*/
    this.submitFunc = function (userData) {
        var response = $http({
            method: "post",
            url: "/Home/AddUser",
            data: registrationData
        })
        return response
    }

    /*
    this.loadChartServiceFunc = function () {
        return $http.get("/Home/LoadPieChartData");
    }
    */

})