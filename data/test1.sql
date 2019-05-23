-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allergies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (1,'Dust',NULL,NULL,'2018-09-10 10:36:46','2018-09-10 10:36:46'),(2,'Peanuts',NULL,NULL,'2018-09-10 10:37:00','2018-09-10 10:37:00'),(3,'Smoke',NULL,NULL,'2018-09-10 10:37:07','2018-09-10 10:37:07'),(4,'Butter',NULL,NULL,'2018-09-10 10:37:14','2018-09-10 10:37:14'),(5,'Eggs',NULL,NULL,'2018-09-10 10:37:41','2018-09-10 10:37:41'),(6,'Fish',NULL,NULL,'2018-09-10 10:37:51','2018-09-10 10:37:51'),(7,'Shellfish',NULL,NULL,'2018-09-10 10:38:01','2018-09-10 10:38:01'),(8,'Meat',NULL,NULL,'2018-09-10 10:38:20','2018-09-10 10:38:20'),(9,'Pets',NULL,NULL,'2018-09-10 10:39:54','2018-09-10 10:39:54');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `visitorId` int(11) DEFAULT NULL,
  `consultationId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `referenceNumber` varchar(255) DEFAULT NULL,
  `modeOfPayment` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `trackingId` bigint(20) DEFAULT NULL,
  `failureMessage` varchar(255) DEFAULT NULL,
  `cardName` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation_group`
--

DROP TABLE IF EXISTS `consultation_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultation_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `details` text,
  `picture` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `phase` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `prescription_generated` tinyint(1) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_group`
--

LOCK TABLES `consultation_group` WRITE;
/*!40000 ALTER TABLE `consultation_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultation_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation_group_user_map`
--

DROP TABLE IF EXISTS `consultation_group_user_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultation_group_user_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `unreadCount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_group_user_map`
--

LOCK TABLES `consultation_group_user_map` WRITE;
/*!40000 ALTER TABLE `consultation_group_user_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultation_group_user_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation_modes`
--

DROP TABLE IF EXISTS `consultation_modes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultation_modes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_modes`
--

LOCK TABLES `consultation_modes` WRITE;
/*!40000 ALTER TABLE `consultation_modes` DISABLE KEYS */;
INSERT INTO `consultation_modes` VALUES (1,'Chat',NULL,NULL,'2018-09-10 11:38:24','2018-09-10 11:38:24'),(3,'Video',NULL,NULL,'2018-09-10 11:39:04','2018-09-10 11:39:04');
/*!40000 ALTER TABLE `consultation_modes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation_price`
--

DROP TABLE IF EXISTS `consultation_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultation_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_price`
--

LOCK TABLES `consultation_price` WRITE;
/*!40000 ALTER TABLE `consultation_price` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultation_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `picUrl` varchar(255) DEFAULT NULL,
  `regNo` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `experience` decimal(10,0) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `waitingTime` decimal(10,0) DEFAULT NULL,
  `rating` decimal(10,0) DEFAULT NULL,
  `videoUrl` varchar(255) DEFAULT NULL,
  `appearUrl` varchar(255) DEFAULT NULL,
  `thumbnailUrl` varchar(255) DEFAULT NULL,
  `termsAccepted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `regNo` varchar(255) DEFAULT NULL,
  `validity` datetime DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `speciality` text,
  `experience` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `videoUrl` varchar(255) DEFAULT NULL,
  `appearUrl` varchar(255) DEFAULT NULL,
  `waitingTime` decimal(10,0) DEFAULT NULL,
  `ratingValue` decimal(10,0) DEFAULT NULL,
  `ratingCount` decimal(10,0) DEFAULT NULL,
  `shortBio` varchar(255) DEFAULT NULL,
  `longBio` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `educationYear` int(11) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `institutionYear` int(11) DEFAULT NULL,
  `workHistory` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `termsAccepted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_activities`
--

DROP TABLE IF EXISTS `doctor_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `dislike` int(11) DEFAULT NULL,
  `mediaType` varchar(255) DEFAULT NULL,
  `mediaUrl` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_activities`
--

LOCK TABLES `doctor_activities` WRITE;
/*!40000 ALTER TABLE `doctor_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_media`
--

DROP TABLE IF EXISTS `doctor_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbUrl` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_media`
--

LOCK TABLES `doctor_media` WRITE;
/*!40000 ALTER TABLE `doctor_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_reviews`
--

DROP TABLE IF EXISTS `doctor_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ratingValue` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `dislike` int(11) DEFAULT NULL,
  `mediaType` varchar(255) DEFAULT NULL,
  `mediaUrl` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_reviews`
--

LOCK TABLES `doctor_reviews` WRITE;
/*!40000 ALTER TABLE `doctor_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_schedule`
--

DROP TABLE IF EXISTS `doctor_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `waitTime` int(11) DEFAULT NULL,
  `slotId` int(11) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_schedule`
--

LOCK TABLES `doctor_schedule` WRITE;
/*!40000 ALTER TABLE `doctor_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_store`
--

DROP TABLE IF EXISTS `doctor_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_store`
--

LOCK TABLES `doctor_store` WRITE;
/*!40000 ALTER TABLE `doctor_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'English',NULL,NULL,'2018-09-10 10:11:09','2018-09-10 10:11:09'),(2,'Hindi',NULL,NULL,'2018-09-10 10:11:41','2018-09-10 10:11:41'),(3,'Bengali',NULL,NULL,'2018-09-10 10:13:56','2018-09-10 10:13:56'),(4,'Marathi',NULL,NULL,'2018-09-10 10:14:11','2018-09-10 10:14:11'),(5,'Telugu',NULL,NULL,'2018-09-10 10:15:04','2018-09-10 10:15:04'),(6,'Tamil',NULL,NULL,'2018-09-10 10:15:15','2018-09-10 10:15:15'),(7,'Urdu',NULL,NULL,'2018-09-10 10:15:24','2018-09-10 10:15:24'),(8,'Gujarati',NULL,NULL,'2018-09-10 10:15:39','2018-09-10 10:15:39'),(9,'Kannada',NULL,NULL,'2018-09-10 10:15:54','2018-09-10 10:15:54'),(10,'Malayalam',NULL,NULL,'2018-09-10 10:16:17','2018-09-10 10:16:17'),(11,'Odia',NULL,NULL,'2018-09-10 10:16:26','2018-09-10 10:16:26'),(12,'Punjabi',NULL,NULL,'2018-09-10 10:16:34','2018-09-10 10:16:34'),(13,'Assamese',NULL,NULL,'2018-09-10 10:16:50','2018-09-10 10:16:50'),(14,'Maithili',NULL,NULL,'2018-09-10 10:17:06','2018-09-10 10:17:06'),(18,'Sanskrit',NULL,NULL,'2018-09-10 10:31:05','2018-09-10 10:31:05');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `latMin` double DEFAULT NULL,
  `lngMin` double DEFAULT NULL,
  `latMax` double DEFAULT NULL,
  `lngMax` double DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Bengaluru',NULL,NULL,NULL,NULL,NULL,NULL,'2018-05-22 03:38:34','2018-05-22 03:38:34'),(2,'Chennai',NULL,NULL,NULL,NULL,NULL,NULL,'2018-05-22 03:39:09','2018-05-22 03:39:09'),(3,'Delhi',NULL,NULL,NULL,NULL,NULL,NULL,'2018-05-22 03:39:15','2018-05-22 03:39:15'),(4,'Kolkata',NULL,NULL,NULL,NULL,NULL,NULL,'2018-05-22 03:39:21','2018-05-22 03:39:21'),(5,'Mumbai',NULL,NULL,NULL,NULL,NULL,NULL,'2018-05-22 03:39:26','2018-05-22 03:39:26');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `status` varchar(255) DEFAULT NULL,
  `channel` varchar(255) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `template` text,
  `triggerTime` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES (1,'create','2018-03-05 11:16:06','2018-03-05 11:16:06'),(2,'read','2018-03-05 11:16:17','2018-03-05 11:16:17'),(3,'update','2018-03-05 11:16:25','2018-03-05 11:16:25'),(4,'delete','2018-03-05 11:16:34','2018-03-05 11:16:34');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualifications`
--

DROP TABLE IF EXISTS `qualifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qualifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualifications`
--

LOCK TABLES `qualifications` WRITE;
/*!40000 ALTER TABLE `qualifications` DISABLE KEYS */;
INSERT INTO `qualifications` VALUES (1,'MBBS',NULL,NULL,'2018-09-10 11:31:57','2018-09-10 11:31:57'),(2,'MS',NULL,NULL,'2018-09-10 11:32:12','2018-09-10 11:32:12'),(3,'MD',NULL,NULL,'2018-09-10 11:32:17','2018-09-10 11:32:17'),(4,'BDS',NULL,NULL,'2018-09-10 11:33:14','2018-09-10 11:33:14'),(5,'BHMS',NULL,NULL,'2018-09-10 11:33:26','2018-09-10 11:33:26'),(6,'BAMS',NULL,NULL,'2018-09-10 11:33:37','2018-09-10 11:33:37'),(7,'DHMS',NULL,NULL,'2018-09-10 11:33:52','2018-09-10 11:33:52'),(8,'BUMS',NULL,NULL,'2018-09-10 11:34:02','2018-09-10 11:34:02'),(9,'B. Pharm.',NULL,NULL,'2018-09-10 11:34:27','2018-09-10 11:34:27'),(10,'D. Pharm.',NULL,NULL,'2018-09-10 11:34:36','2018-09-10 11:34:36'),(11,'BNYS',NULL,NULL,'2018-09-10 11:35:00','2018-09-10 11:35:00'),(12,'B.Sc. Nursing',NULL,NULL,'2018-09-10 11:35:20','2018-09-10 11:35:20'),(13,'BPT',NULL,NULL,'2018-09-10 11:35:31','2018-09-10 11:35:31'),(14,'BMLT',NULL,NULL,'2018-09-10 11:35:43','2018-09-10 11:35:43'),(15,'BOT',NULL,NULL,'2018-09-10 11:35:52','2018-09-10 11:35:52'),(16,'BVSc & AH',NULL,NULL,'2018-09-10 11:36:12','2018-09-10 11:36:12');
/*!40000 ALTER TABLE `qualifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','All privileges allowed','2018-03-05 11:11:39','2018-03-05 11:11:39'),(2,'bot','Only for help','2018-03-05 11:12:07','2018-03-05 11:12:07'),(3,'patient','Needs helps','2018-03-05 11:12:32','2018-03-05 11:12:32'),(4,'doctor','Helping patients','2018-03-05 11:12:51','2018-03-05 11:12:51');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_privilege`
--

DROP TABLE IF EXISTS `role_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `privilegeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_privilege`
--

LOCK TABLES `role_privilege` WRITE;
/*!40000 ALTER TABLE `role_privilege` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialities`
--

DROP TABLE IF EXISTS `specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialities`
--

LOCK TABLES `specialities` WRITE;
/*!40000 ALTER TABLE `specialities` DISABLE KEYS */;
INSERT INTO `specialities` VALUES (1,'Physician',NULL,NULL,'2018-05-22 03:42:28','2018-05-22 03:42:28'),(2,'Psychiatrist',NULL,NULL,'2018-05-22 03:42:42','2018-05-22 03:42:42'),(3,'Pediatrician',NULL,NULL,'2018-05-22 03:42:51','2018-05-22 03:42:51'),(4,'Dermatologist',NULL,NULL,'2018-05-22 03:42:59','2018-05-22 03:42:59'),(5,'Gynaecologist',NULL,NULL,'2018-05-22 03:43:09','2018-05-22 03:43:09'),(6,'Orthopedician',NULL,NULL,'2018-05-22 03:43:19','2018-05-22 03:43:19');
/*!40000 ALTER TABLE `specialities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_info`
--

DROP TABLE IF EXISTS `staff_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `staffId` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_info`
--

LOCK TABLES `staff_info` WRITE;
/*!40000 ALTER TABLE `staff_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(255) DEFAULT NULL,
  `aadhaarNo` bigint(20) DEFAULT NULL,
  `picUrl` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'offline',
  `token` varchar(255) DEFAULT NULL,
  `activate` decimal(10,0) DEFAULT '0',
  `role` varchar(255) DEFAULT NULL,
  `socketId` text,
  `termsAccepted` tinyint(1) DEFAULT '0',
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `firstLogin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNo` (`phoneNo`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bot','Jack','jack@awnics.com','$2a$10$.Qm6OgzvukeK2CgZ0EDFmeq1Bxtk0YQvsJjhWaLUKeIHAA4//5Hd2','9916062587',NULL,NULL,'Chat assistant bot','online','81bd0da1900e52e8',1,'bot',NULL,1,1,1,'2018-10-17 06:25:34','2018-10-17 06:25:34',NULL),(2,'Bot','Pink','pink@awnics.com','$2a$10$gaq8nLpmn8W.F2/UvnT4yOHT3yRJb88pI6DK67Jyt.TNeemYwHB1u','9916012587',NULL,NULL,'Chat assistant bot','online','91f016b35f4ab3e7',1,'bot',NULL,1,2,2,'2018-10-17 06:26:01','2018-10-17 06:26:01',NULL),(3,'Bot','Sanju','sanju@awnics.com','$2a$10$oqracWvYIcKNua/vmwsKSeFRsc006.phBa1pkdyj3vxHbtWJ.D/Xy','9916018587',NULL,NULL,'Chat assistant bot','online','a13f3f9fa50fb0ce',1,'bot',NULL,1,3,3,'2018-10-17 06:26:44','2018-10-17 06:26:44',NULL),(4,'Bot','Mary','mary@awnics.com','$2a$10$1Rb27no3abcIW8lfmarKPu1x3UjfZP1cYbE3GaORW2R/ZnK98db5W','9816018587',NULL,NULL,'Chat assistant bot','online','91967151e99cd52c',1,'bot',NULL,1,4,4,'2018-10-17 06:27:14','2018-10-17 06:27:14',NULL),(5,'Bot','Sheena','sheena@awnics.com','$2a$10$QTU.pH6nSJfQvqbGz7UscOWJc4ITuLPHRGXo.6MSACgTD4Eje627y','9816018581',NULL,NULL,'Chat assistant bot','online','08876b1411b9765b',1,'bot',NULL,1,5,5,'2018-10-17 06:27:58','2018-10-17 06:27:58',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,2,'2018-10-17 06:25:34','2018-10-17 06:25:34'),(2,2,2,'2018-10-17 06:26:01','2018-10-17 06:26:01'),(3,3,2,'2018-10-17 06:26:44','2018-10-17 06:26:44'),(4,4,2,'2018-10-17 06:27:14','2018-10-17 06:27:14'),(5,5,2,'2018-10-17 06:27:58','2018-10-17 06:27:58'),(6,6,4,'2018-10-25 12:10:49','2018-10-25 12:10:49'),(7,7,3,'2018-10-25 12:11:59','2018-10-25 12:11:59'),(8,8,3,'2018-11-10 19:15:17','2018-11-10 19:15:17'),(9,9,3,'2018-11-13 08:05:32','2018-11-13 08:05:32'),(10,10,4,'2018-11-13 10:32:25','2018-11-13 10:32:25'),(11,11,3,'2018-11-13 12:09:50','2018-11-13 12:09:50'),(12,17,3,'2018-11-14 09:45:56','2018-11-14 09:45:56'),(13,18,3,'2018-11-14 09:49:38','2018-11-14 09:49:38'),(14,20,3,'2018-11-14 10:07:31','2018-11-14 10:07:31'),(15,21,3,'2018-11-14 10:12:21','2018-11-14 10:12:21'),(16,22,4,'2018-11-16 10:11:36','2018-11-16 10:11:36'),(17,24,3,'2018-11-29 11:32:17','2018-11-29 11:32:17'),(18,25,3,'2018-12-05 13:02:30','2018-12-05 13:02:30'),(19,26,4,'2018-12-07 11:44:42','2018-12-07 11:44:42'),(20,28,3,'2018-12-07 11:52:58','2018-12-07 11:52:58'),(21,29,4,'2018-12-11 06:37:06','2018-12-11 06:37:06'),(22,30,3,'2018-12-11 06:37:15','2018-12-11 06:37:15'),(23,31,3,'2018-12-11 10:34:42','2018-12-11 10:34:42'),(24,32,4,'2018-12-13 09:16:50','2018-12-13 09:16:50'),(25,33,3,'2018-12-19 10:37:31','2018-12-19 10:37:31'),(26,35,3,'2018-12-21 10:53:24','2018-12-21 10:53:24'),(27,37,3,'2018-12-21 10:54:19','2018-12-21 10:54:19'),(28,39,3,'2018-12-27 06:18:27','2018-12-27 06:18:27'),(29,42,3,'2018-12-27 06:30:48','2018-12-27 06:30:48'),(30,43,3,'2019-02-01 10:05:59','2019-02-01 10:05:59'),(31,45,3,'2019-02-04 07:49:39','2019-02-04 07:49:39'),(32,46,3,'2019-02-04 07:53:56','2019-02-04 07:53:56'),(33,47,3,'2019-02-04 11:53:53','2019-02-04 11:53:53'),(34,48,3,'2019-04-15 13:34:50','2019-04-15 13:34:50'),(35,50,3,'2019-04-15 13:51:06','2019-04-15 13:51:06'),(36,52,4,'2019-04-15 14:17:26','2019-04-15 14:17:26'),(37,59,4,'2019-04-15 14:23:49','2019-04-15 14:23:49'),(38,60,3,'2019-04-16 07:47:06','2019-04-16 07:47:06'),(39,61,3,'2019-04-16 07:51:18','2019-04-16 07:51:18'),(40,62,3,'2019-04-18 04:41:07','2019-04-18 04:41:07');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `bloodGroup` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_appointment`
--

DROP TABLE IF EXISTS `visitor_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `slotId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `waitTime` int(11) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `consultationId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `consultationMode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_appointment`
--

LOCK TABLES `visitor_appointment` WRITE;
/*!40000 ALTER TABLE `visitor_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_diagnostic`
--

DROP TABLE IF EXISTS `visitor_diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `reportId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `result_observation` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `testDate` datetime DEFAULT NULL,
  `reportDate` datetime DEFAULT NULL,
  `vendor` varchar(255) DEFAULT NULL,
  `report_observation` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_diagnostic`
--

LOCK TABLES `visitor_diagnostic` WRITE;
/*!40000 ALTER TABLE `visitor_diagnostic` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_diagnostic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_health`
--

DROP TABLE IF EXISTS `visitor_health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_health` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `allergies` text,
  `foodHabits` text,
  `vitals` text,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_health`
--

LOCK TABLES `visitor_health` WRITE;
/*!40000 ALTER TABLE `visitor_health` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_history`
--

DROP TABLE IF EXISTS `visitor_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `prescription` varchar(255) DEFAULT NULL,
  `prescription_artifacts` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_history`
--

LOCK TABLES `visitor_history` WRITE;
/*!40000 ALTER TABLE `visitor_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_media`
--

DROP TABLE IF EXISTS `visitor_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `consultationId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbUrl` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_media`
--

LOCK TABLES `visitor_media` WRITE;
/*!40000 ALTER TABLE `visitor_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_prescription`
--

DROP TABLE IF EXISTS `visitor_prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_prescription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `consultationId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `issue` varchar(255) DEFAULT NULL,
  `analysis` text,
  `medication` text,
  `diagnostic` text,
  `prescription` varchar(255) DEFAULT NULL,
  `expectation` varchar(255) DEFAULT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `consultationMode` varchar(255) DEFAULT 'video',
  `speciality` varchar(255) DEFAULT 'Physician',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_prescription`
--

LOCK TABLES `visitor_prescription` WRITE;
/*!40000 ALTER TABLE `visitor_prescription` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_report`
--

DROP TABLE IF EXISTS `visitor_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `consultationId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_report`
--

LOCK TABLES `visitor_report` WRITE;
/*!40000 ALTER TABLE `visitor_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_store`
--

DROP TABLE IF EXISTS `visitor_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_store`
--

LOCK TABLES `visitor_store` WRITE;
/*!40000 ALTER TABLE `visitor_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_timeline`
--

DROP TABLE IF EXISTS `visitor_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitorId` int(11) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `consultations` text,
  `reminders` text,
  `events` text,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_timeline`
--

LOCK TABLES `visitor_timeline` WRITE;
/*!40000 ALTER TABLE `visitor_timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_timeline` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-26 15:57:00
