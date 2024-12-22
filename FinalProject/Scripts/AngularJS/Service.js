app.service("FinalProjectService", function ($http) {

    /*this.threeFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/TreeFunction",
            data: registrationData
        })
        return response
    }*/
    this.submitFunc = function (registrationData) {
        return $http({
            method: "POST",
            url: "/Home/AddUser",
            data: registrationData
        });
    };

    /*
    this.loadChartServiceFunc = function () {
        return $http.get("/Home/LoadPieChartData");
    }
    */

})