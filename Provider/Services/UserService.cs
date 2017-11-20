using Provider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Provider.Services
{
    public class UserService
    {
        public User ValidateUser(string username, string password)
        {
            if(username.ToLower() == "test" && password == "test")
            {
                return new User
                {
                    Name = "pankaj",
                    Email = "pan@gmail.com",

                };
            }

            return null;
        }
    }
}