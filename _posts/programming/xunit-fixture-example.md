---
title: Example XUnit Test Class Fixture
tags: [csharp, testing, programming, snippets]
date: "2021-10-27"
excerpt: An XUnit test fixture scoped at the class level.
---

These examples present an example of sharing fixture code with every method in a class. There are many variations of this design and the XUnit documentation does a great job of going over some of these variations.

This example shows the sharing of connection creation and database cleanup code between multiple tests. When the fixture is disposed (i.e. the running thread reaches the end of the `using` statement block), the database fixture's `Dispose` method is called.

A more fine grained implementation might separate DBConnection creation from DBCleanUp into two differently scoped fixtures. Fixtures can be scoped at the test, class, and collection (i.e. multiple classes) level.

**Resources**
- [Xunit Shared Context Docs Examples](https://xunit.net/docs/shared-context)

### Fixture Example Implementation

```c#
public class SharedDatabaseFixture : IDisposable
{
  public DbConnection Connection { get; }

  /* Constructor, establish database connection and open */
  public SharedDatabaseFixture()
  {
    connection = new NpgsqlConnection(
      Environment.GetEnvironmentVariable
        ("DB_CONNECTION_STRING"));

    connection.Open();
  }

  public APIDBContext CreateContext(DbTransaction transaction = null)
  {
    var context = new APIDBContext(
      new DbContextOptionsBuilder<APIDBContext>()
        .UseNpgsql(Connection).Options
    );

    if (transaction != null)
    {
      context.Database.UseTransaction(transaction);
    }

    return context;
  }

  public void Dispose()
  {
    using (var context = CreateContext())
    {
      context.Database.ExecuteSqlRaw("DELETE FROM users *;");
      context.Database.ExecuteSqlRaw("DELETE FROM posts *;");
      context.Database.ExecuteSqlRaw("DELETE FROM threads *;");
      context.SaveChanges();
    }

    Connection.Dispose();
  }

}
```

### Usage

```c#
public class DBTests : IClassFixture<SharedDatabaseFixture>
{
  public SharedDatabaseFixture Fixture { get; }

  [Fact]
  public void AddUser()
  {
    using (var context = DBFixture.CreateContext())
    {
      var newUser = new User()
      {
        Username = "testUsername",
        Password = "testPassword",
        Email = "testEmail"
      };

      context.Add<User>(newUser);
      context.SaveChanges();

      Assert.NotNull(
        context.Users.Where(u => u.Username == newUser.Username)
          .FirstOrDefault()
      );
    }
  }
}
```