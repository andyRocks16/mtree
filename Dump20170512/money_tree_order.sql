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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` varchar(10) NOT NULL,
  `pm_id` varchar(10) DEFAULT NULL,
  `et_id` varchar(10) DEFAULT NULL,
  `share_id` varchar(10) DEFAULT NULL,
  `side` varchar(10) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `open_quantity` varchar(45) DEFAULT NULL,
  `allocated_quantity` int(100) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `limit_price` varchar(45) DEFAULT NULL,
  `current_price` varchar(45) DEFAULT NULL,
  `stop_price` varchar(45) DEFAULT NULL,
  `total_quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pm_id` (`pm_id`),
  KEY `et_id` (`et_id`),
  KEY `share_id` (`share_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`pm_id`) REFERENCES `portfolio_manager` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`et_id`) REFERENCES `equity_trader` (`id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`share_id`) REFERENCES `shares` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('1Iur22fXpI','MT_PM005','MT_ET002','1041280','sell','open','1000',0,'2017-03-10','1330','1330','1400','600'),('43dNseKUqX','MT_PM002','MT_ET002','1084911','buy','open','1000',0,'2017-03-10','1381','1381','1388','30'),('58mNHGDQDv','MT_PM001','MT_ET001','1007672','buy','open','1000',0,'2017-03-20','224','224','220','100'),('5W7IDYTj83','MT_PM001','MT_ET002','1009727','buy','open','1000',0,'2017-03-10','680','680','681','0123123'),('7wDwKFl1dX','MT_PM002','MT_ET001','1055784','buy','open','1000',0,'2017-03-10','266','266','270','100'),('9qPOSmzKsB','MT_PM001','MT_ET0010','1007672','buy','open','1000',0,'2017-03-09','224','224','230','100'),('AZ50NRvsLl','MT_PM006','MT_ET0010','1027302','sell','open','1000',0,'2017-03-10','1368','1368','1400','90'),('c5GLAhw1im','MT_PM005','MT_ET001','1074454','buy','open','1000',0,'2017-03-10','515','515','530','200'),('ce8R7hvpF1','MT_PM001','MT_ET002','1009727','buy','open','1000',0,'2017-03-10','680','680','681','0123123'),('cer2jeXE6p','MT_PM001','MT_ET001','1011036','buy','open','1000',0,'2017-03-09','826','826','835','10'),('cuOM28MyG0','MT_PM001','MT_ET003','1016773','buy','open','1000',0,'2017-03-10','510','510','508','100'),('CVWXUT3SWt','MT_PM003','MT_ET001','1086288','buy','open','1000',0,'2017-03-10','1472','1472','1480','40'),('d7UUDsFaiA','MT_PM001','MT_ET001','1007672','buy','open','1000',0,'2017-03-10','224','224','2312','12312'),('fqCGgEoRBz','MT_PM001','MT_ET002','1007672','buy','open','1000',0,'2017-03-10','224','224','240','100'),('gC7oQkUa2R','MT_PM004','MT_ET003','1027302','sell','open','1000',0,'2017-03-10','1368','1368','1400`','100'),('IWuhwxs89g','MT_PM001','MT_ET004','1007672','buy','open','1000',0,'2017-03-10','224','224','223','234'),('jwKOYlyA66','MT_PM004','MT_ET002','1027302','buy','open','1000',0,'2017-03-10','1368','1368','1400`','100'),('KpOHQJ1ofp','MT_PM001','MT_ET001','1067092','buy','open','1000',0,'2017-03-10','2514','2514','2500','12'),('KVj0WtFtXU','MT_PM001','MT_ET004','1016773','buy','open','1000',0,'2017-03-09','510','510','515','100'),('MJUvYumyiL','MT_PM001','MT_ET0010','1007672','buy','open','1000',0,'2017-03-09','224','224','230','100'),('N0RiXneHJp','MT_PM002','MT_ET001','1055784','buy','open','1000',0,'2017-03-10','266','266','270','100'),('pDTiQzwVNl','MT_PM003','MT_ET001','1086288','buy','open','1000',0,'2017-03-10','1472','1472','1480','40'),('Rahmt0gbOB','MT_PM006','MT_ET0010','1027302','sell','open','1000',0,'2017-03-10','1368','1368','1400','90'),('tqkok52c1O','MT_PM001','MT_ET0010','1064670','buy','open','1000',0,'2017-03-10','1007','1007','1000','50'),('UtPEvhpQMj','MT_PM002','MT_ET002','1084911','buy','open','1000',0,'2017-03-10','1381','1381','1388','30'),('veU9DHO6Er','MT_PM001','MT_ET001','1007672','sell','open','1000',0,'2017-03-10','224','224','223','0312312'),('vHptJFk74D','MT_PM002','MT_ET0010','1067092','buy','open','1000',0,'2017-03-10','2514','2514','2550','50'),('wMOgXDCp9U','MT_PM006','MT_ET001','1011036','buy','open','1000',0,'2017-03-10','826','826','900','100'),('wUR7NqHFaA','MT_PM003','MT_ET0010','1084911','buy','open','1000',0,'2017-03-10','1381','1381','1400`','40'),('YL36Fznge2','MT_PM001','MT_ET0010','1009727','sell','open','1000',0,'2017-03-21','680','680','undefined','10'),('yZ30Mzbq3T','MT_PM003','MT_ET001','1086288','buy','open','1000',0,'2017-03-10','1472','1472','1480','40'),('ZIxqvOfO1J','MT_PM001','MT_ET001','1056727','buy','open','1000',0,'2017-03-21','3790','3790','3780','100'),('zzICHqWuME','MT_PM005','MT_ET002','1041280','sell','open','1000',0,'2017-03-10','1330','1330','1400','600');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
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
