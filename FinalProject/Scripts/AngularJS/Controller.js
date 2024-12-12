app.controller("FinalProjectController", function ($scope, FinalProjectService) {

    // Initialize variables
    var Usercredentials = [];
    var loggedInUser = null; // Tracks the logged-in user's email.

    // Initialize function to call Fetchfunc and load profile when the controller is initialized.
    $scope.initFunc = function () {
        $scope.Fetchfunc();
        $scope.LoadProfile();
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

    // Function to fetch and parse credentials from session storage.
    $scope.Fetchfunc = function () {
        var Getcredentials = sessionStorage.getItem("Credentialinformation");
        Usercredentials = Getcredentials ? JSON.parse(Getcredentials) : [];
    };

    // Function to add a new user credential to the array and store it in session storage.
    $scope.Arraystorage = function () {
        var Search = Usercredentials.find(ASearch =>
            ASearch.FirstName === $scope.Fname &&
            ASearch.LastName === $scope.Lname
        );

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

                var Sessionstring = JSON.stringify(Usercredentials);
                sessionStorage.setItem("Credentialinformation", Sessionstring);
                alert("Welcome to GrowlingBidet, " + $scope.Fname + "!");
                window.location.href = "/Home/LoginPage";
            } else {
                alert("Your password must be at least 8 characters long and include a number and a special character.");
            }
        } else {
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
        $scope.Unumb = null;
    };

    // Function to validate user login by checking entered credentials against stored data.
    $scope.Loginvalidation = function () {
        var Validate = Usercredentials.find(ASearch =>
            ASearch.UserName === $scope.Username &&
            ASearch.Password === $scope.Upassword2
        );

        if (Validate == undefined) {
            alert("The username or password you entered is incorrect. Please try again.");
        } else {
            sessionStorage.setItem("LoggedInUserEmail", Validate.Email);
            alert("Login successful.");
            window.location.href = "/Home/Dashboard";
        }
    };

    // Function to load the logged-in user's profile
    $scope.LoadProfile = function () {
        loggedInUser = sessionStorage.getItem("LoggedInUserEmail");

        if (!loggedInUser) {
            alert("No user is logged in. Redirecting to login page.");
            window.location.href = "/Home/LoginPage";
            return;
        }

        var currentUser = Usercredentials.find(user => user.Email === loggedInUser);

        if (!currentUser) {
            alert("User not found. Redirecting to login page.");
            window.location.href = "/Home/LoginPage";
            return;
        }

        $scope.Fname = currentUser.FirstName;
        $scope.Lname = currentUser.LastName;
        $scope.Uemail = currentUser.Email;
        $scope.Uaddress = currentUser.Address;
        $scope.Uphone = currentUser.PhoneNumber;
        $scope.UDept = currentUser.Department;
        $scope.Ubldg = currentUser.Building;
        $scope.Utype = currentUser.UserType;
        $scope.Unumb = currentUser.Number;
    };

    // Function to save updates to the user's profile
    $scope.SaveProfile = function () {
        if (!loggedInUser) {
            alert("No user is logged in. Cannot update profile.");
            return;
        }

        var currentUser = Usercredentials.find(user => user.Email === loggedInUser);

        if (!currentUser) {
            alert("Error: User not found!");
            return;
        }

        currentUser.FirstName = $scope.Fname;
        currentUser.LastName = $scope.Lname;
        currentUser.Address = $scope.Uaddress;
        currentUser.PhoneNumber = $scope.Uphone;
        currentUser.Department = $scope.UDept;
        currentUser.Building = $scope.Ubldg;
        currentUser.UserType = $scope.Utype;
        currentUser.Number = $scope.Unumb;

        sessionStorage.setItem("Credentialinformation", JSON.stringify(Usercredentials));
        alert("Profile updated successfully!");
    };
    $scope.loadEmpFunc = function () {
        var getData = FinalProjectService.loadEmpFunc();
        getData.then(function (ReturnedData) {
            $scope.employeesData = ReturnedData.data;
            $(document).ready(function () {
                $('#myTable').DataTable();
            });
        });
    }
    $scope.loadChart = function () {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});