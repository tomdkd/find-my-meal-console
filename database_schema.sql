CREATE TABLE IF NOT EXISTS `find_my_meal_console`.`receipts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `content` TEXT(10000) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER USER 'thomas'@'%' IDENTIFIED WITH mysql_native_password BY 'thomas';