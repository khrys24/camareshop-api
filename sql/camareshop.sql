-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema camare_shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema camare_shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `camare_shop` DEFAULT CHARACTER SET utf8 ;
USE `camare_shop` ;

-- -----------------------------------------------------
-- Table `camare_shop`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camare_shop`.`cities` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `zipcode` INT NOT NULL,
  PRIMARY KEY (`city_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camare_shop`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camare_shop`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_users_cities1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `camare_shop`.`cities` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camare_shop`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camare_shop`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `contact_number` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `date_delivered` DATETIME NOT NULL,
  `total` DOUBLE(10,2) NOT NULL DEFAULT 0.0,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_orders_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_orders_cities1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `camare_shop`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `camare_shop`.`cities` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camare_shop`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camare_shop`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `price` DOUBLE(10,2) NOT NULL DEFAULT 0.0,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camare_shop`.`order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camare_shop`.`order_items` (
  `order_item_id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL DEFAULT 0,
  `total` DOUBLE(10,2) NOT NULL DEFAULT 0.0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`order_item_id`),
  INDEX `fk_order_items_products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_order_items_orders1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_items_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `camare_shop`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_items_orders1`
    FOREIGN KEY (`order_id`)
    REFERENCES `camare_shop`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
