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
-- Table structure for table `portfolio_manager`
--

DROP TABLE IF EXISTS `portfolio_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_manager` (
  `id` varchar(10) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `contact_number` decimal(10,0) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `balance` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `portfolio_manager_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_manager`
--

LOCK TABLES `portfolio_manager` WRITE;
/*!40000 ALTER TABLE `portfolio_manager` DISABLE KEYS */;
INSERT INTO `portfolio_manager` VALUES ('MT_PM001','Anand','Pahuja',1000000008,'India',100000),('MT_PM0010','Ayush','Yadav',1000050184,'India',100000),('MT_PM002','Rijul','Zalpuri',1000017911,'India',100000),('MT_PM003','Keshav','Chandak',1000089530,'India',100000),('MT_PM004','Ukarsh','Srivastava',1000033917,'India',100000),('MT_PM005','Anshul','Akotkar',1000080998,'India',100000),('MT_PM006','Vikash','Kumar',1000033239,'India',100000),('MT_PM007','Akshay','Chellawat',1000013199,'India',100000),('MT_PM008','Aashay','Kumar',1000056280,'India',100000),('MT_PM009','Jai','Thakur',1000061805,'India',100000);
/*!40000 ALTER TABLE `portfolio_manager` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12 10:02:18
