using gwBackend.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gwBackend.Tests.Systems.Controllers
{
    public static class IdentityMocks
    {
        public static UserManager<User> GetMockUserManager()
        {
            var store = new Mock<IUserStore<User>>();
            return new Mock<UserManager<User>>(store.Object, null, null, null, null, null, null, null, null).Object;
        }

        public static SignInManager<User> GetMockSignInManager(UserManager<User> userManager)
        {
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<User>>();

            return new Mock<SignInManager<User>>(
                userManager,
                contextAccessor.Object,
                userPrincipalFactory.Object,
                null, null, null, null).Object;
        }
    }
}
