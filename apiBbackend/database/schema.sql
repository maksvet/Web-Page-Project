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
VALUES ('\https://github.com/maksvet', 'My GitHub'),
('https://gitlab.com/maksvet', 'My GitLab'),
('https://www.codewars.com/users/maksvet', 'My Codewars');

DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
  `skill_id` INT NOT NULL AUTO_INCREMENT ,
  `skill` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`skill_id`)
);
INSERT INTO `skill` (`skill`)
VALUES ('Tools/Methodologies: Visual Studio Code, Git, Node JS, Express, React, MySQL.'),
('Operating Systems: Windows, MAC OS.'),
('Other software: Adobe Photoshop, Autodesk AutoCAD, Gravograph CNC software, SAP, Microsoft Office Tools.');

DROP TABLE IF EXISTS `highlights_qualifications`;
CREATE TABLE `highlights_qualifications` (
  `qualification_id` INT NOT NULL AUTO_INCREMENT ,
  `qualification` LONGTEXT NOT NULL,
  PRIMARY KEY (`qualification_id`)
);
INSERT INTO `highlights_qualifications` (`qualification`)
VALUES ('Shop Certification Authority maintenance release qualified.'),
('Proficient in AS9100, ISO9001 and other relevant aerospace industry standards.'),
('Experienced in working with precision measuring tools.'),
('Skillful in testing hydraulic, pneumatic and electrical components.'),
('Specialize in repair & overhaul of aircrafts components.');

DROP TABLE IF EXISTS `date_to`;
CREATE TABLE `date_to` (
  `date_to_id` INT NOT NULL AUTO_INCREMENT ,
  `start_date` DATE NULL,
  `finish_date` DATE NULL,
  PRIMARY KEY (`date_to_id`)
);
INSERT INTO `date_to` (`start_date`, `finish_date`)
VALUES ('2011-01-01', null),
('2008-04-01', '2011-01-01'),
('2005-09-01', '2008-04-01'),
('2020-09-01', null),
(null, '2020-09-01'),
(null, '2020-08-01'),
(null, '2006-01-01');

DROP TABLE IF EXISTS `contact_info`;
CREATE TABLE `contact_info` (
  `name` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  `contact_id` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`contact_id`)
);
INSERT INTO `contact_info` (`name`, `phone`, `email`)
VALUES ('Admin', null, 'address@email.com'),
('Maksim Svetlakov', '647-281-8792', 'maksuttt@yahoo.ca'),
('Safran Landing Systems', null, null),
('Global Aerospace Inc', null, null),
('York University', null, null),
('University of London', null, null),
('Harvard University', null, null),
('Education Direct', null, null);

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
VALUES ('f7ca3958-9cae-48da-b925-51de25e7211c', 1, '$2a$10$Jvf2b5yMt.NsWQNprP0vGuG/KHD2vlIZgs9PeXOn7uiPufEnP/9hi');

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `address_id` INT NOT NULL AUTO_INCREMENT ,
  `country` VARCHAR(255) NOT NULL,
  `province` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `street_address` VARCHAR(255) NULL,
  PRIMARY KEY (`address_id`)
);
INSERT INTO `address` (`country`, `province`, `city`, `street_address`)
VALUES ('Canada', 'ON', 'Stouffville', '15752 McCowan Rd.'),
('Canada', 'ON', 'Ajax', null),
('Canada', 'ON', 'Mississauga', null),
('Canada', 'ON', 'Toronto', null),
('UK', 'England', 'London', null),
('US', 'Massachusetts', 'Cambridge', null),
('Canada', 'QC', 'Westmount', null);

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
INSERT INTO `personal_info` (`address_id`, `contact_id`)
VALUES (1, 2);



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
INSERT INTO `education` VALUES (1,'Cerificate in Full-Stack Web Developement.',NULL,4,5,4),(2,'Diploma in Aircraft Mechanics.',NULL,7,8,7),(3,NULL,'Mathematics for Computer Science.',5,6,5),(4,NULL,'Contract Law: From Trust to Promise to Contract.',6,7,6);



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
VALUES ("xxx60e26-aeca-4a5f-9f20-f866995d5247", 2, 'test message'),
("XXXXe26-aeca-4a5f-9f20-f866995d5247", 1, 'second message');

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
INSERT INTO `work_experience` (`position`, `date_to_id`, `address_id`, `contact_id`, `task`)
VALUES ('Quality Inspector, Repair and Overhaul Department', 1, 2, 3, '- Performing inspections of aircraft landing gears and relating components. \n
- Assessment and approval of work performed by fitters during overhauls and repairs. \n
- Responsible for product compliance to the relevant specifications. \n
- Issuing Shop Certification Authority maintenance release TC Form One. \n
- Preparing Failure Analysis Reports for components returning to service.'),
('Fitter, Repair and Overhaul Department', 2, 2, 3, '- Servicing of landing gears and landing gears components. \n
- Working with in-process documentation and technical database. \n
- Collaborating with engineers in preparation of repair layouts'),
('Aircraft components technician', 3, 3, 4, '- Overhauling and repairing aircrafts components. \n
- High speed rotation components balancing. \n
- Special tools designing and fabricating. \n
- Cooperating in Scientific Research and Experimental Development program.');
