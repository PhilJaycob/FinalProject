﻿app.controller("FinalProjectController", function ($scope, FinalProjectService) {


    // Initialize function to call Fetchfunc and load profile when the controller is initialized.
    
    $scope.initFunc = function () {
        $scope.submitFunc();
        $scope.Fetchfunc();
        $scope.LoadProfile();
    };


   
    // Function to add a new user credential to the array and store it in local storage.
    $scope.localStorage = function () {
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

                var Localstring = JSON.stringify(Usercredentials);
                localStorage.setItem("Credentialinformation", Localtring);
                alert("Welcome to UST MyBidet, " + $scope.Fname + "!");
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
            localStorage.setItem("LoggedInUserEmail", Validate.Email);
            alert("Login successful.");
            window.location.href = "/Home/Dashboard";
        }
    };

    // Function to load the logged-in user's profile
    $scope.LoadProfile = function () {
        loggedInUser = localStorage.getItem("LoggedInUserEmail");

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

        localStorage.setItem("Credentialinformation", JSON.stringify(Usercredentials));
        alert("Profile updated successfully!");
    };
    
    $scope.submitFunc = function () {
        var userData = {
            fName: $scope.Fname,
            lName: $scope.Lname,
            userID: $scope.Unumb,
            Address: $scope.Uaddress,
            UserType: $scope.Utype,
           // Dept: $scope.UDept
        };

        var getData = FinalProjectService.submitFunc(userData)
        getData.then(function (ReturnedData) {
            console.log("User submitted successfully.");
        }).catch(function (error) {
            console.error("Error submitting user: ", error);
        });
    };


    $scope.testAlert = function () {
        console.log("test")
    };  
    
    $scope.loaduserFunc = function () {
        var getData = FinalProjectService.loaduserFunc();
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