using FinalProject.Models;
using Org.BouncyCastle.Bcpg;
using System;
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

        // Other actions
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        public ActionResult RegistrationPage()
        {
            return View();
        }



        public string OneFunction()
        {
            return "VALUE FROM ONE FUNCTION";
        }

        public int TwoFunction(string FName, string LName)
        {
            if (FName.ToLower().Equals("Amado") && LName.ToLower().Equals("Sapit"))
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        // Assuming 'registrationData' is a model, define it accordingly.
        // For example:
        public class RegistrationData
        {
            public string Fname { get; set; }
            public string Lname { get; set; }
            public string Address { get; set; }
            public string UserID {  get; set; }

           /* public string Username { get; set; }
            public string Password { get; set; } */
        }

        public JsonResult TreeFunction(RegistrationData registrationData)
        {
            // Validate or manipulate the data here
            var rModel = new
            {
                Fname = registrationData.Fname,
                Lname = registrationData.Lname,
                Address = registrationData.Address,
                UserID = registrationData.UserID,
                deptID = 1,
                createAt = DateTime.Now,
                updateAt = DateTime.Now
                /*Username = "asdfgtyuiol",
                Password = "lkjhgfdsa"*/
            };

            return Json(rModel, JsonRequestBehavior.AllowGet);
        }
        public void AddUser(RegistartionModel registrationData)
        {
            using (var db = new RegistrationContext())
            {

                var number = Convert.ToInt32(registrationData.numbs);
                var deptartment = Convert.ToInt32((registrationData.deptartment));
                var userData= new usertblModel()
             
                {
                    fName = registrationData.Fname.ToString(),
                    lName = registrationData.Lname.ToString(),
                    Address = registrationData.Address.ToString(),
                    userID = 1,
                    deptID = 1,
                    /*postID = 1,
                    statID = 1,
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now*/
                };

                db.usertbl.Add(userData);
                db.SaveChanges();
            }
        }

        public void UpdateUser(RegistartionModel registrationData)
        {
            using (var db = new RegistrationContext())
            {
                var userID = db.usertbl. Where(x => x.fName.Equals(registrationData.Fname.ToString()) && x.lName.Equals(registrationData.Lname.ToString()))
                    .FirstOrDefault();
                if (    userID == null)
                {
                    AddUser(registrationData);
                }
                else
                {
                    userID.updateAt = DateTime.Now;
                    db.usertbl.AddOrUpdate((usertblModel)userID);
                    db.SaveChanges();
                }
            }
        }

        public JsonResult LoadUser()
        {
            using (var db = new RegistrationContext())
            {
                var userData = (from eData in db.usertbl
                                join dData in db.depttbl on eData.deptID equals dData.deptID
                               select new { eData, dData }).ToList();
                        
                return Json(userData, JsonRequestBehavior.AllowGet);
            }
        }
    }
}   