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
-- Table structure for table `shares`
--

DROP TABLE IF EXISTS `shares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shares` (
  `ID` varchar(10) NOT NULL,
  `share_name` varchar(45) DEFAULT NULL,
  `share_price` decimal(10,0) DEFAULT NULL,
  `symbol` varchar(45) DEFAULT NULL,
  `image` varchar(10000) DEFAULT 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shares`
--

LOCK TABLES `shares` WRITE;
/*!40000 ALTER TABLE `shares` DISABLE KEYS */;
INSERT INTO `shares` VALUES ('1007672','AMBUJACEM',224,'NSE','https://upload.wikimedia.org/wikipedia/en/4/47/Ambuja_logo.png'),('1009727','SUN PHARMA',680,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Sun_Pharma_Logo.svg/761px-Sun_Pharma_Logo.svg.png'),('1011036','KOTAKBANK',826,'NSE','http://customercarephonenumbers.in/wp-content/uploads/2016/06/kotak-mahindra-bank-logo-1.jpg'),('1012262','GRASIM',1001,'NSE','http://brandsdisplay.com/wp-content/uploads/2014/09/GRASIM-LOGO.jpg'),('1016773','AXISBANK',510,'NSE','https://www.axisbank.com/images/default-source/gallery/gallery_img5.jpg?sfvrsn=8'),('1020135','ACC',1387,'NSE','http://cbssports.com/images/collegefootball/newaccbrand.jpg'),('1022091','HEROMOTOCO',3297,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1027302','HDFC',1368,'NSE','https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2000px-HDFC_Bank_Logo.svg.png'),('1034558','MARUTI',5884,'NSE','http://www.car-logos.org/wp-content/uploads/2011/12/Maruti_Suzuki.png'),('1041280','INDUSINDBK',1330,'NSE','http://www.indusind.com/content/dam/indusind/desktop/IndusIndBankJPEGlogo.jpg'),('1055784','ITC',266,'NSE','https://thequizzers.files.wordpress.com/2011/06/itcgrouplogo.png'),('1056727','ULTRACEMCO',3790,'NSE','http://www.ultratechcement.com/common/images/UltraTech_Logo-with_tag.jpg'),('1057564','BOSCHLTD',21670,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1060089','SBIN',269,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1064670','INFY',1007,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1064795','M&M',1302,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1066318','LUPIN',1450,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1067092','TCS',2514,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1071335','NTPC',157,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1074454','ZEEL',515,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1077203','BHARTIARTL',359,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1083598','TATAMOTORS',462,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1084805','ASIANPAINT',1029,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1084911','HDFCBANK',1381,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1086288','LT',1472,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png'),('1089189','TATAPOWER',82,'NSE','https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png');
/*!40000 ALTER TABLE `shares` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12 10:02:19
