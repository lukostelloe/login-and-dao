<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to the site!</h1>
  <form action="login.php" method="post">
    <h2>LOGIN</h2>
    <?php if (isset($_GET["error"])) { ?>
      <p class="error"><?php echo $_GET["error"]; ?></p>
    <?php } ?>
    <label>User Name</label>
    <input type="text" name="uname" placeholder="User Name"><br>

    <label>Password</label>
    <input type="password" name="password" placeholder="Password"><br>

    <button type="submit">Login</button>
    <a href="signup.php" class="ca">Don't have an account? Sign up</a>
  </form>
  
</body>
</html>