using FluentAssertions;
using gwBackend.Controllers;
using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using gwBackend.Controllers;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace gwBackend.Tests.Systems.Controllers
{
    public class UserControllerTests
    {
        [Fact]
        public async Task Register_CreatesUser_WhenValid()
        {
            // Arrange: Mock UserManager and SignInManager
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase("UserTestDb")
                .Options;
            var mockContext = new AppDbContext(options);

            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockSignInManager = new Mock<SignInManager<User>>(
                mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                null, null, null, null
            );


            // Setup mock behaviors for UserManager
            mockUserManager.Setup(u => u.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            mockUserManager.Setup(u => u.AddToRoleAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            mockSignInManager.Setup(s => s.SignInAsync(It.IsAny<User>(), false, null))
                .Returns(Task.CompletedTask);

            var controller = new UserController(mockContext, mockUserManager.Object, mockSignInManager.Object);


            // Create a sample user DTO
            var dto = new NewUserDto
            {
                Username = "newuser",
                Email = "test@example.com",
                Password = "Test@1234",
                Name = "Test User"
            };

            // Act: Call the Register action
            var result = await controller.Register(dto);

            // Assert: Ensure the result is OK (successful)
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value); // Ensure the user is returned in the response
        }
    }
}