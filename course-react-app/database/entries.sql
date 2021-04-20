-- DROP TABLE cats;

CREATE TABLE `skill` (
  `skillId` INT NOT NULL AUTO_INCREMENT ,
  `skill` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`skillId`)
);

CREATE TABLE `highlightsQualifications` (
  `qualificationId` INT NOT NULL AUTO_INCREMENT ,
  `qualification` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`qualificationId`)
);

CREATE TABLE `task` (
  `taskId` INT NOT NULL AUTO_INCREMENT ,
  `task` LONGTEXT,
  PRIMARY KEY (`taskId`)
);

CREATE TABLE `dateTo` (
  `dateToId` INT NOT NULL AUTO_INCREMENT ,
  `startDate` DATE NULL,
  `finishDate` DATE NULL,
  PRIMARY KEY (`dateToId`)
);

CREATE TABLE `contactInfo` (
  `name` VARCHAR(255),
  `phone` VARCHAR(20),
  `email` VARCHAR(255),
  `contactId` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`contactId`)
);

CREATE TABLE `address` (
  `addressId` INT NOT NULL AUTO_INCREMENT ,
  `country` VARCHAR(255) NOT NULL,
  `province` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`addressId`)
);

CREATE TABLE `personalInfo` (
  `addressId` INT NOT NULL,
  `contactId` INT NOT NULL,
  `personalInfoId` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`personalInfoId`),
  FOREIGN KEY (`addressId`) REFERENCES address(`addressId`),
  FOREIGN KEY (`contactId`) REFERENCES contactInfo(`contactId`)
);

CREATE TABLE `education` (
  `educationId` INT NOT NULL AUTO_INCREMENT ,
  `educationTitle` VARCHAR(255) NOT NULL,
  `dateToId` INT NOT NULL,
  `institutionId` INT NOT NULL,
  PRIMARY KEY (`educationId`),
  FOREIGN KEY (`dateToId`) REFERENCES dateTo(`dateToId`)
);

CREATE TABLE `contactFormInput` (
  `contactId` INT NOT NULL,
  `message` LONGTEXT,
  `inputId` INT NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`inputId`),
  FOREIGN KEY (`contactId`) REFERENCES contactInfo(`contactId`)
);

CREATE TABLE `workExperience` (
  `experienceId` INT NOT NULL AUTO_INCREMENT ,
  `position` VARCHAR(255) NOT NULL,
  `dateToId` INT NOT NULL,
  `addressId` INT NOT NULL,
  `companyName` VARCHAR(255) NOT NULL,
  `taskId` INT NOT NULL,
  PRIMARY KEY (`experienceId`),
  FOREIGN KEY (`dateToId`) REFERENCES dateTo(`dateToId`),
  FOREIGN KEY (`addressId`) REFERENCES address(`addressId`),
  FOREIGN KEY (`taskId`) REFERENCES task(`taskId`)
);

CREATE TABLE `institution` (
  `institutionId` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL,
  `addressId` INT NOT NULL,
  PRIMARY KEY (`institutionId`),
  FOREIGN KEY (`addressId`) REFERENCES address(`addressId`)
);

CREATE TABLE `traningCourse` (
  `traningCourseId` INT NOT NULL AUTO_INCREMENT ,
  `dateToId` INT NOT NULL,
  `institutionId` INT NOT NULL,
  `traningTitle` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`traningCourseId`),
  FOREIGN KEY (`dateToId`) REFERENCES dateTo(`dateToId`),
  FOREIGN KEY (`institutionId`) REFERENCES institution(`institutionId`)
);

INSERT INTO cats (name, image)
VALUES 
("Tuna", 'https://images.unsplash.com/photo-1532971731140-1d7cccc06c3f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2lhbWVzZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'),
("Marla", 'https://images.unsplash.com/photo-1509567406695-7d7fbc6d2ecb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8dGFiYnl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'),
("Sam", 'https://images.unsplash.com/photo-1595787664454-cb73fa2b5aea?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fG1haW5lJTIwY29vbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'),
("Cheeto", 'https://images.unsplash.com/photo-1463008420065-8274332e2be8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bmFrZWQlMjBjYXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'),
("Toby", 'https://images.unsplash.com/photo-1523863745117-a610a34eb231?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2lhbWVzZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60');

SELECT * FROM cats;
