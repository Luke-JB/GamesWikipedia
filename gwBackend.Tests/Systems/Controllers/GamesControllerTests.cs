using gwBackend.Controllers;
using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gwBackend.Tests.Systems.Controllers
{
    public class GamesControllerTests
    {
        private AppDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase("GamesTestDb")
                .Options;

            var context = new AppDbContext(options);

            if (!context.Games.Any())
            {
                context.Games.AddRange(
                    new Game
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
                        GameInfo = "Explore, build, and conquer the stars.",
                    },
                    new Game
                    {
                        GameId = 43,
                        GameName = "GTA5",
                        GameGenre = "Action",
                        GameDeveloper = "Rockstar",
                        GamePublisher = "Rockstar",
                        GameRelease = "2013-08-25",
                        GameCoop = false,
                        GameIndie = false,
                        GamePlatform = new List<string> { "PC", "Xbox", "PS3" },
                        GameDirector = "Unknown",
                        GameWriter = "Unknown",
                        GameComposer = "Unknown",
                        GameDescription = "A third-person action game based on crime and gang warfare.",
                        GameInfo = "Run heists, rob banks, fight gangs.",
                    }
                );
                context.SaveChanges();
            }
            return context;
        }
        [Fact]
        public async Task GetGame_ReturnGame_WhenIdExists()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new GamesController(context);

            // Act
            var result = await controller.GetGame(42);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GameDto>(okResult.Value);

            Assert.Equal(42, dto.GameId);
            Assert.Equal("Starfield", dto.GameName);
        }
        [Fact]
        public async Task GetGame_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new GamesController(context);

            // Act
            var result = await controller.GetGame(999); // ID that doesn't exist

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
        [Fact]
        public async Task GetGames_ReturnsAllGames()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new GamesController(context);

            // Act
            var result = await controller.GetGames();

            // Assert
            var games = Assert.IsType<List<Game>>(result.Value);
            Assert.Equal(2, games.Count);
        }
    }
}
