app.controller("FinalProjectController", function ($scope, FinalProjectService) {
    // Session storage
    $scope.userInformation = []; // Moved userInformation to scope to keep it consistent within controller.

    // Fetch credentials from session storage
    $scope.fetchFunc = function () {
        var getCredentials = sessionStorage.getItem("credentials");
        if (getCredentials) {
            $scope.userInformation = JSON.parse(getCredentials); // Update scope variable directly
        }
    };

    // Check if user is logged in
    $scope.isLoggedIn = function () {
        return $scope.userInformation.length > 0;
    };

    // Login Function
    $scope.loginFunc = function () {
        var user = $scope.userInformation.find(function (user) {
            return user.Email === $scope.email && user.Password === $scope.pass;
        });

        if (user) {
            sessionStorage.setItem("currentUser", JSON.stringify(user)); // Store user in session storage
            window.location.href = "/Home/Dashboard"; // Redirect on success
        } else {
            alert("Invalid Email or Password"); // Show error on failure
        }
    };

    // Register Function
    $scope.submitFunc = function () {
        var isExisting = $scope.userInformation.find(function (x) {
            return x.Email === $scope.email; // Corrected to match Email key
        });

        if (isExisting === undefined) {
            // Create new user and add to the userInformation array
            $scope.userInformation.push({
                Firstname: $scope.fName,
                Lastname: $scope.lName,
                Email: $scope.email,
                Password: $scope.pass,
                Address: $scope.uAddress,
                Phone: $scope.uPhone
            });

            // Save the updated array to sessionStorage
            sessionStorage.setItem("credentials", JSON.stringify($scope.userInformation));

            // Redirect after successful registration
            window.location.href = "/Home/LoginPage";
        } else {
            alert("User already exists with this Email.");
        }
    };

    // Clear input fields
    $scope.cancelFunc = function () {
        $scope.fName = '';
        $scope.lName = '';
        $scope.mName = '';
        $scope.email = '';
        $scope.pass = '';
        $scope.uAddress = '';
        $scope.uPhone = '';
    };

    // Logout Function
    $scope.logoutFunc = function () {
        sessionStorage.removeItem("currentUser"); // Remove the current user from session storage
        window.location.href = "/Home/LoginPage"; // Redirect to Login page
    };

    // Fetch user information from sessionStorage when the controller is initialized
    $scope.fetchFunc();
});
