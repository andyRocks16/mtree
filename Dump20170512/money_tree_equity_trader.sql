-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: money_tree
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `equity_trader`
--

DROP TABLE IF EXISTS `equity_trader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equity_trader` (
  `id` varchar(10) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `contact_number` decimal(10,0) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `balance` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `equity_trader_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equity_trader`
--

LOCK TABLES `equity_trader` WRITE;
/*!40000 ALTER TABLE `equity_trader` DISABLE KEYS */;
INSERT INTO `equity_trader` VALUES ('MT_ET001','Ashish','Agarwal',1000065507,'India',300000),('MT_ET0010','Arush','Dua',1000065822,'India',300000),('MT_ET002','Neelansha','Trivedi',1000086984,'India',300000),('MT_ET003','Manasvini','Munjal',1000058398,'India',300000),('MT_ET004','Nehal','Batla',1000031039,'India',300000),('MT_ET005','Yash','Dubey',1000070000,'India',300000),('MT_ET006','Harshit','Tambi',1000076884,'India',300000),('MT_ET007','Komal','Kumar',1000084423,'India',300000),('MT_ET008','Rohit','Tiwari',1000011462,'India',300000),('MT_ET009','Chirag','Jain',1000074041,'India',300000);
/*!40000 ALTER TABLE `equity_trader` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12 10:02:20
