using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace textdb.Models 
{
    public class MailResult 
    {
            public string message{get;set;}

            public MailResult(string msg )
            {
                message = msg;
            }

    }
}