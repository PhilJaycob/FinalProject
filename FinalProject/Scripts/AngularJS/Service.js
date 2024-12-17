app.service("FinalProjectService", function ($http) {

    this.submitFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/AddUser",
            data: registrationData
        })
        return response;
    }

})