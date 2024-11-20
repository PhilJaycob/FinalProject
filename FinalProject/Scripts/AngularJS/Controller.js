app.controller("FinalProjectController", function ($scope, FinalProjectService) {

    // Initialize function to call Fetchfunc when the controller is initialized.
    $scope.initFunc = function () {
        $scope.Fetchfunc();
    };

    // Function to retrieve user input data and display it in an alert box.
    $scope.getInputData = function () {
        var alertFname = $scope.Fname;
        alert("First Name:  " + alertFname + "\n" +
            "Last Name: " + $scope.Lname + "\n" +
            "Email: " + $scope.Uemail + "\n" +
            "Address: " + $scope.Uaddress + "\n" +
            "Phone Number: " + $scope.Uphone + "\n" +
            "Department: " + $scope.UDept + "\n" +
            "Building: " + $scope.Ubldg + "\n" +
            "User Type: " + $scope.Utype + "\n" +
            "Number: " + $scope.Unumb
        );
    };

    // Initialize an empty array to store user credentials.
    var Usercredentials = [];

    // Function to fetch and parse credentials from session storage.
    $scope.Fetchfunc = function () {
        var Getcredentials = sessionStorage.getItem("Credentialinformation");

        // If credentials exist, parse them into the Usercredentials array, otherwise set it to an empty array.
        if (Getcredentials) {
            var Parsedinfo = JSON.parse(Getcredentials);
            Usercredentials = Parsedinfo || [];
        } else {
            Usercredentials = [];
        }
    };

    // Function to add a new user credential to the array and store it in session storage.
    $scope.Arraystorage = function () {
        // Search for an existing user with the same full name in the Usercredentials array.
        var Search = Usercredentials.find(ASearch =>
            ASearch.FirstName === $scope.Fname &&
            ASearch.LastName === $scope.Lname);

        // If no user is found, validate password strength and add new credentials.
        if (Search == undefined) {
            if (
                ($scope.Fname && $scope.Fname.length > 64) ||
                ($scope.Lname && $scope.Lname.length > 64)
            ) {
                alert("Names must be 64 characters or less.");
                return;
            }

            var emailPattern = /^[a-zA-Z0-9._%+-]+@ust\.edu\.ph$/;

            if (!emailPattern.test($scope.Uemail)) {
                alert("Your email must end with @ust.edu.ph.");
                return;
            }


            if ($scope.Uaddress.length > 96) {
                alert("Your address must be 96 characters long or less.");
                return;
            }

            if ($scope.Uphone.length !== 11 || !/^\d{11}$/.test($scope.Uphone)) {
                alert("Your phone number must be exactly 11 digits.");
                return;
            }

            if ($scope.Upassword.length > 7 &&
                /[$_!#-]/.test($scope.Upassword) &&
                /[0-9]/.test($scope.Upassword)
            ) {

                // Add new user credentials to the array.
                Usercredentials.push({
                    FirstName: $scope.Fname,
                    LastName: $scope.Lname,
                    Email: $scope.Uemail,
                    Password: $scope.Upassword,
                    Address: $scope.Uaddress,
                    PhoneNumber: $scope.Uphone,
                    UserName: $scope.Uemail,
                    Department: $scope.UDept,
                    Building: $scope.Ubldg,
                    UserType: $scope.Utype,
                    Number: $scope.Unumb
                });

                // Convert credentials to a JSON string and store them in session storage.
                var Sessionstring = JSON.stringify(Usercredentials);
                sessionStorage.setItem("Credentialinformation", Sessionstring);
                alert("Welcome to GrowlingBidet, " + $scope.Fname + "!");
                window.location.href = "/Home/LoginPage";
            } else {
                // Alert if the password does not meet the requirements.
                alert("Your password must be at least 8 characters long and include a number and a special character.");
            }
        } else {
            // Alert if the user already exists.
            alert("User is already existing!");
        }
    };

    // Function to reset all input fields to null.
    $scope.Cancelfunc = function () {
        $scope.Fname = null;
        $scope.Lname = null;
        $scope.Uemail = null;
        $scope.Upassword = null;
        $scope.Uaddress = null;
        $scope.Uphone = null;
        $scope.UDept = null;
        $scope.Ubldg = null;
        $scope.Utype = null;
        $scope.Unumb = null;// Reset User Type
    };

    // Function to validate user login by checking entered credentials against stored data.
    $scope.Loginvalidation = function () {
        var Validate = Usercredentials.find(ASearch =>
            ASearch.UserName === $scope.Username &&
            ASearch.Password === $scope.Upassword2);

        // If no match is found, display an error message.
        if (Validate == undefined) {
            alert("The username or password you entered is incorrect. Please try again.");
        } else {
            // If credentials are valid, redirect to the dashboard page.
            alert("Login successful.");
            window.location.href = "/Home/Dashboard";
        }
    };
});