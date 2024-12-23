using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace FinalProject.Controllers
{
    public class HomeController : Controller
    {
        // Dashboard page
        public ActionResult Dashboard()
        {
            return View();
        }

        // Admin page
        public ActionResult admin()
        {
            return View();
        }

        // Profile page
        public new ActionResult Profile()
        {
            return View();
        }

        // Logout page (clear session)
        public ActionResult Logout()
        {

            Session.Clear();
            return RedirectToAction("LoginPage", "Home");
        }

        // Login page
        public ActionResult LoginPage()
        {
            return View();
        }

        public ActionResult RegistrationPage()
        {
            return View();
        }



        /*public JsonResult TreeFunction(RegistrationData registrationData)
         {
             // Validate or manipulate the data here
             var rModel = new
             {
                 Fname = registrationData.fName,
                 Lname = registrationData.lName,
                 Address = registrationData.uaddress,
                 UserID = registrationData.unumb,
                 userType = registrationData.Utype,
                 deptID = 1,
                 createAt = DateTime.Now,
                 updateAt = DateTime.Now

             };

             return Json(rModel, JsonRequestBehavior.AllowGet);
         }
        */




        public JsonResult LoadUser()
        {
            using (RegistrationContext db = new RegistrationContext())
            {
                var userData = (from eData in db.usertbl
                                join dData in db.depttbl on eData.userID equals dData.deptID
                                select new { eData, dData }).ToList();

                return Json(userData, JsonRequestBehavior.AllowGet);
            }
        }

        public void AddUser(RegistrationDTO registrationData)
        {
            using (var db = new RegistrationContext())
            {
                var userData = new usertblModel()
                {
                    userID = registrationData.userID,
                    fName = registrationData.fName.ToString(),
                    lName = registrationData.lName.ToString(),
                    Address = registrationData.Address.ToString(),
                    userType = registrationData.UserType.ToString(),

                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.usertbl.Add(userData);
                db.SaveChanges();
            }
        }

        /*
        public void UpdateUser(RegistrationDTO registrationData)
        {
            using (var db = new RegistrationContext())
            {
                var existingUser = db.usertbl
                    .FirstOrDefault(x => x.userID == registrationData.Unumb);

                if (existingUser == null)
                {
                    AddUser(registrationData);
                }
                else
                {
                    existingUser.fName = registrationData.Fname;
                    existingUser.lName = registrationData.Lname;
                    existingUser.Address = registrationData.Uaddress;
                    existingUser.userType = registrationData.Utype;
                    existingUser.updateAt = DateTime.Now;

                    db.usertbl.AddOrUpdate(existingUser);
                    db.SaveChanges();
                }
        
            }
        }
*/
    }
}
