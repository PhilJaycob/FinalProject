app.service("FinalProjectService", function ($http) {

    this.oneFunc = function () {
        return $http.get("/Home/OneFunction");
    }
    this.twoFunc = function (firstName, lastName) {
        var Response = $http({
            method: "post",
            url: "/Home/TwoFunction",
            params: {
                FName: firstName,
                LName: lastName,
                userName: Username
            }
        })
        return Response;
    }
    this.threeFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/TreeFunction",
            data: registrationData
        })
        return response
    }
    this.submitFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/Updateuser",
            data: registrationData
        })
        return response;
    }

})