using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BackboneMVC3SignalR.Models;

namespace BackboneMVC3SignalR.Controllers
{
   
    public class MessagesController : Controller
    {
        //
        // GET: /Messages/

        public ActionResult Index()
        {
            List<Message> s = new List<Message>();
            if (GlobalVariables.Messages != null)
            {
                s = GlobalVariables.Messages;

            }

            return Json(s, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Index(string content)
        {
            List<Message> s = new List<Message>();
            if (GlobalVariables.Messages != null)
            {
                s = GlobalVariables.Messages;
                
              
            }
            s.Add(new Message{ content = content});
            GlobalVariables.Messages = s;
         
           
            return Json(s, JsonRequestBehavior.AllowGet);
           
        }
        
      
    }
}
