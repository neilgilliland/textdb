using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;

namespace textdb.Controllers
{
    public class PageController : Controller
    {
        public ActionResult Home()
        {
            return View();
        }

        public ActionResult Instructors()
        {
            return View();
        }

        public ActionResult Maps()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ContactUs(int? selection)
        {
            Dictionary<int, string> list = new Dictionary<int, string>();
            Dictionary<int, string> mail = new Dictionary<int, string>();

            string connection = "Server=29060858-f045-4504-9f56-a0a4013d07a1.sqlserver.sequelizer.com;Database=db29060858f04545049f56a0a4013d07a1;User ID=ofsnlnackvawumla;Password=o4ztwf84FqediFfPQX2zSLT3WiUcJsZBcYbmmoRCoWakB75ZStmaJbrKjFEns5to;";
            using (SqlConnection db = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("select * from Contact", db);
                db.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                ViewBag.Selection = selection;

                while (reader.Read())
                {
                    list.Add((int)reader["ContactId"], (string)reader["Description"]);
                    mail.Add((int)reader["ContactId"], (string)reader["email"]);
                }

                reader.Close();
            }

            ViewBag.mail = mail;

            //list.Add(1, "Stirling Class");
            //list.Add(2, "Falkirk Class ");
            //list.Add(3, "Other");

            return View( list );
        }

        [HttpPost]
        public ActionResult ContactUs()
        {
            //Request["contact-name"];
            //Request["contact-email"];
            //Request["enquiry-text"];

            return Home();
        }

        public FileResult png(string id )
        {
            return File("~/png/"+id, "image/png");
        }

        public FileResult jpg(string id )
        {
            return File("~/jpg/"+id, "image/jpg");
        }

    }
}
