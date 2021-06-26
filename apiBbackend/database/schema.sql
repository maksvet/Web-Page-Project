CREATE DATABASE  IF NOT EXISTS `FS1030IndividualProject`;
USE `FS1030IndividualProject`;

DROP TABLE IF EXISTS `portfoliio`;
CREATE TABLE `portfoliio` (
  `portfolio_id` INT NOT NULL AUTO_INCREMENT ,
  `link` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`portfolio_id`)
);
INSERT INTO `portfoliio` (`link`, `description`)
VALUES ('https://github.com/maksvet', 'My GitHub'),
('https://gitlab.com/maksvet', 'My GitLab'),
('https://www.codewars.com/users/maksvet', 'My Codewars');


DROP TABLE IF EXISTS `date_to`;
CREATE TABLE `date_to` (
  `date_to_id` INT NOT NULL AUTO_INCREMENT ,
  `start_date` DATE NULL,
  `finish_date` DATE NULL,
  PRIMARY KEY (`date_to_id`)
);


DROP TABLE IF EXISTS `contact_info`;
CREATE TABLE `contact_info` (
  `name` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  `contact_id` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`contact_id`)
);


DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` VARCHAR(255) NOT NULL,
  `contact_id` INT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `contact_id_ibfk_4` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);
INSERT INTO `admin` (`admin_id`, `contact_id`, `password`)

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `address_id` INT NOT NULL AUTO_INCREMENT ,
  `country` VARCHAR(255) NOT NULL,
  `province` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `street_address` VARCHAR(255) NULL,
  PRIMARY KEY (`address_id`)
);


DROP TABLE IF EXISTS `personal_info`;
CREATE TABLE `personal_info` (
  `address_id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  `personal_info_id` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`personal_info_id`),
  KEY `address_id` (`address_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `address_id_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `contact_id_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);




DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `education_id` int NOT NULL AUTO_INCREMENT,
  `education_title` varchar(255) DEFAULT NULL,
  `traning_title` varchar(255) DEFAULT NULL,
  `date_to_id` int NOT NULL,
  `contact_id` int NOT NULL,
  `address_id` int NOT NULL,
  PRIMARY KEY (`education_id`),
  KEY `date_to_id` (`date_to_id`),
  KEY `address_id` (`address_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `address_id_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `contact_id_ibfk_5` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`),
  CONSTRAINT `date_to_id_ibfk_2` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`)
);



DROP TABLE IF EXISTS `contact_form_input`;
CREATE TABLE `contact_form_input` (
  `input_id` VARCHAR (255) NOT NULL ,
  `time_stamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `contact_id` INT NOT NULL,
  `content` LONGTEXT,
  PRIMARY KEY (`input_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `contact_id_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);
INSERT INTO `contact_form_input` (`input_id`, `contact_id`, `content`)
VALUES ("XXXXe26-aeca-4a5f-9f20-f866995d5247", 1, 'second message');

DROP TABLE IF EXISTS `work_experience`;
CREATE TABLE `work_experience` (
  `experience_id` INT NOT NULL AUTO_INCREMENT ,
  `position` VARCHAR(255) NOT NULL,
  `date_to_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  `task` LONGTEXT NOT NULL,
  PRIMARY KEY (`experience_id`),
  KEY `date_to_id` (`date_to_id`),
  KEY `address_id` (`address_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `date_to_id_ibfk_3` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`),
  CONSTRAINT `address_id_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `contact_id_ibfk_3` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);
