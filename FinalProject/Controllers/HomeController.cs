using FinalProject.Models;
using Org.BouncyCastle.Bcpg;
using System;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static FinalProject.Controllers.HomeController;

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



        /* public JsonResult TreeFunction(RegistrationData registrationData)
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



         public JsonResult LoadUser()
         {
             using (var db = new RegistrationContext())
             {
                 var userData = (from eData in db.usertbl
                                 join dData in db.depttbl on eData.UserID equals dData.deptID
                                select new { eData, dData }).ToList();

                 return Json(userData, JsonRequestBehavior.AllowGet);
             }
         }
     }
        */

        public void AddUser(registrationController registrationData)
        {
            using (var db = new RegistrationContext())
            {
                var userData = new usertblModel()
                {
                    userID = registrationData.Unumb,
                    fName = registrationData.Fname.ToString(),
                    lName = registrationData.Lname.ToString(),
                    Address = registrationData.Uaddress.ToString(),
                    userType = registrationData.Utype.ToString(),
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.usertbl.Add(userData);
                db.SaveChanges();
            }

        }
    }
}