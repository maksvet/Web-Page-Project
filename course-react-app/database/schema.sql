CREATE DATABASE  IF NOT EXISTS `FS1030IndividualProject`;
USE `FS1030IndividualProject`;

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
  `qualification` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`qualification_id`)
);
INSERT INTO `highlights_qualifications` (`qualification`)
VALUES ('Qualified for Shop Certification Authority maintenance release TC Form One, CCAR-145, military components certification.'),
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
VALUES ('Maksim Svetlakov', '647-281-8792', 'maksuttt@yahoo.ca'),
('Safran Landing Systems', null, null),
('Global Aerospace Inc', null, null),
('York University', null, null),
('University of London', null, null),
('Education Direct', null, null);

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

-- DROP TABLE IF EXISTS `personal_info`;
-- CREATE TABLE `personal_info` (
--   `address_id` INT NOT NULL,
--   `contact_id` INT NOT NULL,
--   `personal_info_id` INT NOT NULL AUTO_INCREMENT ,
--   PRIMARY KEY (`personal_info_id`),
--   KEY `address_id` (`address_id`),
--   KEY `contact_id` (`contact_id`),
--   CONSTRAINT `address_id_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
--   CONSTRAINT `contact_id_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
-- );
-- INSERT INTO `personal_info` (`address_id`, `contact_id`)
-- VALUES (1, 1);

DROP TABLE IF EXISTS `institution`;
CREATE TABLE `institution` (
  `institution_id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`institution_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `address_id_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
);
INSERT INTO `institution` (`name`, `address_id`)
VALUES ('York University', 4),
('University of London', 5),
('Harvard University', 6),
('Education Direct', 7);

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `education_id` INT NOT NULL AUTO_INCREMENT ,
  `education_title` VARCHAR(255) NOT NULL,
  `date_to_id` INT NOT NULL,
  `institution_id` INT NOT NULL,
  PRIMARY KEY (`education_id`),
  KEY `date_to_id` (`date_to_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `date_to_id_ibfk_2` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`),
  CONSTRAINT `institution_id_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`institution_id`)
);
INSERT INTO `education` (`education_title`, `date_to_id`, `institution_id`)
VALUES ('Cerificate in Full-Stack Web Developement.', 4, 1),
('Diploma in Aircraft Mechanics.', 7, 4);

DROP TABLE IF EXISTS `contact_form_input`;
CREATE TABLE `contact_form_input` (
  `input_id` INT NOT NULL AUTO_INCREMENT ,
  `date_to_id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  `message` LONGTEXT,
  PRIMARY KEY (`input_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `date_to_id_ibfk_5` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`),
  CONSTRAINT `contact_id_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);

DROP TABLE IF EXISTS `work_experience`;
CREATE TABLE `work_experience` (
  `experience_id` INT NOT NULL AUTO_INCREMENT ,
  `position` VARCHAR(255) NOT NULL,
  `date_to_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  PRIMARY KEY (`experience_id`),
  KEY `date_to_id` (`date_to_id`),
  KEY `address_id` (`address_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `date_to_id_ibfk_3` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`),
  CONSTRAINT `address_id_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `contact_id_ibfk_3` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`contact_id`)
);
INSERT INTO `work_experience` (`position`, `date_to_id`, `address_id`, `contact_id`)
VALUES ('Quality Inspector, Repair and Overhaul Department', 1, 2, 2),
('Fitter, Repair and Overhaul Department', 2, 2, 2),
('Aircraft components technician', 3, 3, 3);

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `task_id` INT NOT NULL AUTO_INCREMENT ,
  `task` LONGTEXT NOT NULL,
  `experience_id` INT NOT NULL,
  PRIMARY KEY (`task_id`),
	KEY `experience_id` (`experience_id`),
	CONSTRAINT `experience_id_ibfk_1` FOREIGN KEY (`experience_id`) REFERENCES `work_experience` (`experience_id`)
);

INSERT INTO `task` (`task`, `experience_id`)
VALUES ('Performing inspections of aircraft landing gears and relating components.', 1),
('Assessment and approval of work performed by fitters during overhauls and repairs.', 1),
('Responsible for product compliance to the relevant specifications', 1),
('Issuing Shop Certification Authority maintenance release TC Form One', 1),
('Preparing Failure Analysis Reports for components returning to service.', 1),
('Servicing of landing gears and landing gears components', 2),
('Working with in-process documentation and technical database', 2),
('Collaborating with engineers in preparation of repair layouts', 2),
('Overhauling and repairing aircrafts components', 3),
('High speed rotation balancing', 3),
('Special tools designing and fabricating.', 3),
('Cooperating in Scientific Research and Experimental Development program.', 3);

DROP TABLE IF EXISTS `traning_course`;
CREATE TABLE `traning_course` (
  `traning_course_id` INT NOT NULL AUTO_INCREMENT ,
  `date_to_id` INT NOT NULL,
  `institution_id` INT NOT NULL,
  `traning_title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`traning_course_id`),
  KEY `date_to_id` (`date_to_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `date_to_id_ibfk_4` FOREIGN KEY (`date_to_id`) REFERENCES `date_to` (`date_to_id`),
  CONSTRAINT `institution_id_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`institution_id`)
);

INSERT INTO `traning_course` (`date_to_id`, `institution_id`, `traning_title`)
VALUES (5, 2, 'Mathematics for Computer Science.'),
(6, 3, 'Contract Law: From Trust to Promise to Contract.');



