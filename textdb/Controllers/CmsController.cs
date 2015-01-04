using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace textdb.Controllers
{
    public class CmsController : Controller
    {
        public FileResult html(string id )
        {
            return File("~/html/"+id+".html", "text/html");
        }

    }
}
