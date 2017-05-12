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
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block` (
  `id` varchar(10) NOT NULL,
  `et_id` varchar(10) DEFAULT NULL,
  `broker_id` varchar(10) DEFAULT NULL,
  `block_quantity` varchar(45) DEFAULT NULL,
  `side` varchar(45) DEFAULT NULL,
  `symbol` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `executed_quantity` int(100) DEFAULT NULL,
  `open_quantity` int(100) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `share_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `et_id` (`et_id`),
  KEY `broker_id` (`broker_id`),
  CONSTRAINT `block_ibfk_1` FOREIGN KEY (`et_id`) REFERENCES `equity_trader` (`id`),
  CONSTRAINT `block_ibfk_2` FOREIGN KEY (`broker_id`) REFERENCES `broker` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` VALUES ('4MCsRFKIVl','MT_ET001','MT_BR001','100','buy','NSE','open',0,100,'2017-03-10','51500',NULL),('5Z6FEed4T0','MT_ET001','MT_BR001','100','buy','NSE','open',0,100,'2017-03-21','379000',NULL),('A2oPghUuxX','MT_ET002','MT_BR001','30','buy','NSE','open',0,30,'2017-03-10','41430',NULL),('BpDi4gtVoT','MT_ET001','MT_BR001','10','buy','NSE','open',0,10,'2017-03-10','8260',NULL),('ECSDdHVBWq','MT_ET004','MT_BR001','100','buy','NSE','open',0,100,'2017-03-10','51000',NULL),('J1BNkyFWcD','MT_ET001','MT_BR001','100','buy','NSE','open',0,100,'2017-03-10','26600',NULL),('M56JZ61Qyt','MT_ET001','MT_BR001','100','buy','NSE','open',0,100,'2017-03-10','26600',NULL),('OXfqD1sayQ','MT_ET001','MT_BR001','12','buy','NSE','open',0,12,'2017-03-10','30168',NULL),('Tm8yzpOsbT','MT_ET001','MT_BR001','100','buy','NSE','open',0,100,'2017-03-24','22400',NULL),('uAiPCzYVr3','MT_ET001','MT_BR001','10','buy','NSE','open',0,10,'2017-03-10','8260',NULL),('Yql2qzTikG','MT_ET002','MT_BR001','100','buy','NSE','open',0,100,'2017-03-10','22400',NULL);
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12 10:02:21
