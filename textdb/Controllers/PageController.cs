using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Net;
using System.Net.Mail;
using System.Configuration;

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
            Dictionary<int, dynamic> mail = new Dictionary<int, dynamic>();

            string connection = ConfigurationManager.AppSettings["SQLSERVER_CONNECTION_STRING"];     
            //string connection = "Server=29060858-f045-4504-9f56-a0a4013d07a1.sqlserver.sequelizer.com;Database=db29060858f04545049f56a0a4013d07a1;User ID=ofsnlnackvawumla;Password=o4ztwf84FqediFfPQX2zSLT3WiUcJsZBcYbmmoRCoWakB75ZStmaJbrKjFEns5to;";
            using (SqlConnection db = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("select * from Contact", db);
                db.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                ViewBag.Selection = selection;

                while (reader.Read())
                {
                    list.Add((int)reader["ContactId"], (string)reader["Description"]);
                    mail.Add((int)reader["ContactId"], new { email=(string)reader["email"], name=(string)reader["name"] } );
                }

                reader.Close();
            }

            TempData.Remove( "mail");
            TempData.Add("mail", mail);

            return View( list );
        }

        [HttpPost]
        public ActionResult ContactUs( int contactId, string name, string email, string text)
        {
            Dictionary<int, dynamic> mail = (Dictionary<int, dynamic> )TempData["mail"];

            dynamic contact = mail[contactId];

            var toAddress = new MailAddress(contact.email, contact.name);
            var punterAddress = new MailAddress(email, name);

            string subject = "Message from "+name;
            string body = text;
        
            string host = ConfigurationManager.AppSettings["MAILGUN_SMTP_SERVER"];     
            int port = Convert.ToInt32( ConfigurationManager.AppSettings["MAILGUN_SMTP_PORT"] );
            string uid = ConfigurationManager.AppSettings["MAILGUN_SMTP_LOGIN"];
            string pwd = ConfigurationManager.AppSettings["MAILGUN_SMTP_PASSWORD"];
            
            var fromAddress = new MailAddress("contacts@longrivertaichi.mailgun.org", "longrivertaichi contacts");

            var smtp = new SmtpClient
            {
                Host = host,
                Port = port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(uid, pwd)
            };
            var message = new MailMessage(fromAddress, toAddress){ Subject=subject, Body=body };
            message.ReplyToList.Add( punterAddress );
            smtp.Send(message);

            return View("ConfirmContact");
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
