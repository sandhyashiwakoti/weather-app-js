-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: prototype2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `weather`
--

DROP TABLE IF EXISTS `weather`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather` (
  `city` varchar(250) DEFAULT NULL,
  `weather_icon` varchar(250) DEFAULT NULL,
  `weather_condition` varchar(250) DEFAULT NULL,
  `weather_description` varchar(250) DEFAULT NULL,
  `humidity` float NOT NULL,
  `temperature` float NOT NULL,
  `pressure` float NOT NULL,
  `wind_speed` float NOT NULL,
  `wind_direction` float NOT NULL,
  `background_image` varchar(250) DEFAULT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather`
--

LOCK TABLES `weather` WRITE;
/*!40000 ALTER TABLE `weather` DISABLE KEYS */;
INSERT INTO `weather` VALUES ('Colchester','https://openweathermap.org/img/wn/04d@2x.png','Clouds','overcast clouds',75,10.39,1009,6.27,219,'https://i.gifer.com/srG.gif','2024-04-28 17:23:51'),('Kirtipur','https://openweathermap.org/img/wn/02n@2x.png','Clouds','few clouds',31,22.96,1015,1.03,0,'https://i.gifer.com/srG.gif','2024-04-28 17:24:31'),('Alberta','https://openweathermap.org/img/wn/10d@2x.png','Rain','light rain',96,5.84,1012,9.26,50,'https://i.gifer.com/73j6.gif','2024-04-28 17:24:42'),('','https://openweathermap.org/img/wn/@2x.png','','',0,0,0,0,0,'https://i.gifer.com/g1vA.gif','2024-04-28 17:24:51'),('York','https://openweathermap.org/img/wn/01d@2x.png','Clear','clear sky',71,20.97,1021,0,0,'https://i.gifer.com/Lx0q.gif','2024-04-28 17:25:07'),('Sydney','https://openweathermap.org/img/wn/01n@2x.png','Clear','clear sky',89,14.39,1022,1.54,360,'https://i.gifer.com/Lx0q.gif','2024-04-28 17:25:33'),('California','https://openweathermap.org/img/wn/01d@2x.png','Clear','clear sky',63,23.7,1021,4.12,120,'https://i.gifer.com/Lx0q.gif','2024-04-28 17:25:50'),('Berlin','https://openweathermap.org/img/wn/01d@2x.png','Clear','clear sky',44,23.03,1000,3.6,160,'https://i.gifer.com/Lx0q.gif','2024-04-28 17:26:06');
/*!40000 ALTER TABLE `weather` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 23:13:32
