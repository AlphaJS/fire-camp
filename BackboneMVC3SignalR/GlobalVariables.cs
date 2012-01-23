using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackboneMVC3SignalR
{
    public static class GlobalVariables
    {
        

        // read-write variable
        public static List<Models.Message> Messages
        {
            get
            {
                return HttpContext.Current.Application["Messages"] as List<Models.Message>;
            }
            set
            {
                HttpContext.Current.Application["Messages"] = value;
            }
        }
    }


}