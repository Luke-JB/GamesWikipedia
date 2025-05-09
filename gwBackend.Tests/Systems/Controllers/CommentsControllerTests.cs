using gwBackend.Controllers;
using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace gwBackend.Tests.Systems.Controllers
{
    public class CommentsControllerTests
    {
        private AppDbContext GetDbContext(string dbName)
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(dbName)
                .Options;
            var context = new AppDbContext(options);

            if (!context.Users.Any())
            {
                context.Users.Add(new Data.Models.User { Id = "user1", UserName = "testuser" });
                var game = new Game
                {
                    GameId = 42,
                    GameName = "Starfield",
                    GameGenre = "RPG",
                    GameDeveloper = "Bethesda",
                    GamePublisher = "Bethesda",
                    GameRelease = "2023-09-06",
                    GameCoop = false,
                    GameIndie = false,
                    GamePlatform = new List<string> { "PC", "Xbox" },
                    GameDirector = "Todd Howard",
                    GameWriter = "Emil Pagliarulo",
                    GameComposer = "Inon Zur",
                    GameDescription = "An epic sci-fi RPG set in space.",
                    GameInfo = "Explore, build, and conquer the stars."
                };

                context.Games.Add(game);
                context.SaveChanges();
            }
            return context;
        }

        [Fact]
        public async Task AddComment_CreatesComment_WhenUserIsAuthenticated()
        {
            // Arrange
            using var context = GetDbContext("AddCommentTestDb");

            // Retrieve existing user from context
            var user = context.Users.First(u => u.Id == "user1");

            // Mock UserManager
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object,
                null, null, null, null, null, null, null, null);

            userManagerMock.Setup(um => um.FindByIdAsync("user1"))
                .ReturnsAsync(user);

            // Create controller
            var controller = new CommentsController(context, userManagerMock.Object);

            // Set up a fake authenticated user
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "user1")
            };
            var identity = new ClaimsIdentity(claims, "TestAuth");
            var principal = new ClaimsPrincipal(identity);

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = principal }
            };

            var dto = new CommentDto
            {
                Text = "This game is incredible!"
            };

            // Act
            var result = await controller.AddComment(42, dto);

            // Assert
            var createdResult = Assert.IsType<CreatedResult>(result.Result);
            var createdComment = Assert.IsType<Comment>(createdResult.Value);

            Assert.Equal("user1", createdComment.UserId);
            Assert.Equal(42, createdComment.GameId);
            Assert.Equal("This game is incredible!", createdComment.Text);
        }
    }
}
