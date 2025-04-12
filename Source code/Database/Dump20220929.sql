CREATE DATABASE  IF NOT EXISTS `train_reservation_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `train_reservation_db`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: cdac-project-database.clujqmrc2v0y.ap-south-1.rds.amazonaws.com    Database: train_reservation_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` bigint NOT NULL,
  `arrival_date` date DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `booking_status` varchar(20) NOT NULL DEFAULT 'ACTIVE',
  `departure_date` date DEFAULT NULL,
  `departure_time` time DEFAULT NULL,
  `journey_distance` int DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `total_passengers` int DEFAULT NULL,
  `coach_coach_id` varchar(5) NOT NULL,
  `journey_from` varchar(5) DEFAULT NULL,
  `journey_to` varchar(5) DEFAULT NULL,
  `train_no` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FK7bm482gojae1n7miy1s9h0bll` (`coach_coach_id`),
  KEY `FKncwha25j4xk5891uiujrb3rkf` (`journey_from`),
  KEY `FKellla6i16jwy1bc2g07252rf7` (`journey_to`),
  KEY `FKenl2s2w5uvbs14s2aw3xbu15n` (`train_no`),
  KEY `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id`),
  CONSTRAINT `FK7bm482gojae1n7miy1s9h0bll` FOREIGN KEY (`coach_coach_id`) REFERENCES `coaches` (`coach_id`),
  CONSTRAINT `FKellla6i16jwy1bc2g07252rf7` FOREIGN KEY (`journey_to`) REFERENCES `stations` (`station_id`),
  CONSTRAINT `FKenl2s2w5uvbs14s2aw3xbu15n` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`),
  CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKncwha25j4xk5891uiujrb3rkf` FOREIGN KEY (`journey_from`) REFERENCES `stations` (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (123126,'2022-09-27','07:00:00','2022-09-23','CANCELLED','2022-09-26','11:00:00',1500,3020,2,'GEN','DEL','MUM',22057,10002),(123127,'2022-09-27','07:00:00','2022-09-24','ACTIVE','2022-09-26','11:00:00',1500,6020,2,'SL','DEL','MUM',22057,10002),(123128,'2022-09-27','07:00:00','2022-09-24','CANCELLED','2022-09-26','11:00:00',1500,1510,1,'GEN','DEL','MUM',22057,10002),(123129,'2022-09-27','07:00:00','2022-09-25','ACTIVE','2022-09-26','11:00:00',1500,3020,2,'GEN','DEL','MUM',22057,10002),(123130,'2022-10-05','07:00:00','2022-09-28','ACTIVE','2022-10-04','11:00:00',1500,3020,2,'GEN','DEL','MUM',22057,10002);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach_counts`
--

DROP TABLE IF EXISTS `coach_counts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach_counts` (
  `seat_count` int DEFAULT NULL,
  `train_type_id` varchar(5) NOT NULL,
  `coach_id` varchar(5) NOT NULL,
  `bus_type_id` varchar(5) NOT NULL,
  PRIMARY KEY (`coach_id`,`train_type_id`),
  KEY `FK20guvkwuf4pgyse82q555jo7a` (`train_type_id`),
  CONSTRAINT `FK20guvkwuf4pgyse82q555jo7a` FOREIGN KEY (`train_type_id`) REFERENCES `train_type` (`train_type_id`),
  CONSTRAINT `FK57nqry3lod1yny4rvkcoxm15o` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach_counts`
--

LOCK TABLES `coach_counts` WRITE;
/*!40000 ALTER TABLE `coach_counts` DISABLE KEYS */;
INSERT INTO `coach_counts` VALUES (10,'EXP','1AC',''),(10,'EXP','2AC',''),(10,'EXP','3AC',''),(10,'EXP','GEN',''),(10,'EXP','SL','');
/*!40000 ALTER TABLE `coach_counts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coaches` (
  `coach_id` varchar(5) NOT NULL,
  `fare_per_km` double DEFAULT NULL,
  PRIMARY KEY (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
/*!40000 ALTER TABLE `coaches` DISABLE KEYS */;
INSERT INTO `coaches` VALUES ('1AC',5),('2AC',4),('3AC',3),('GEN',1),('SL',2);
/*!40000 ALTER TABLE `coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id_gen`
--

DROP TABLE IF EXISTS `id_gen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id_gen` (
  `GEN_ID` varchar(255) NOT NULL,
  `GEN_VALUE` bigint DEFAULT NULL,
  PRIMARY KEY (`GEN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id_gen`
--

LOCK TABLES `id_gen` WRITE;
/*!40000 ALTER TABLE `id_gen` DISABLE KEYS */;
INSERT INTO `id_gen` VALUES ('BOOKING_ID',123130),('PASSENGER_ID',1014),('TRANSACTION_ID',2022008),('USER_ID',10003),('WALLET_ID',30003);
/*!40000 ALTER TABLE `id_gen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengers`
--

DROP TABLE IF EXISTS `passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengers` (
  `pass_id` bigint NOT NULL,
  `pass_age` int DEFAULT NULL,
  `pass_fare` int DEFAULT NULL,
  `pass_gender` varchar(10) DEFAULT NULL,
  `pass_idcard_no` varchar(10) DEFAULT NULL,
  `pass_idcard_type` varchar(10) DEFAULT NULL,
  `pass_name` varchar(20) DEFAULT NULL,
  `pass_seat` varchar(8) DEFAULT NULL,
  `pass_status` varchar(20) DEFAULT NULL,
  `booking_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pass_id`),
  UNIQUE KEY `UK7ydo3vunmb4ctgxlfd2537p94` (`pass_id`,`booking_id`),
  KEY `FKgc7vcfrut3vamougerwse2m2u` (`booking_id`),
  CONSTRAINT `FKgc7vcfrut3vamougerwse2m2u` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (1006,24,1510,'MALE','123123','PAN','Rahul ','GEN-1','CANCELLED',123126),(1007,26,1510,'FEMALE','345345','AADHAR','Peter','GEN-2','CANCELLED',123126),(1008,23,3010,'MALE','123123','PAN','Peter','SL-1','CONFIRMED',123127),(1009,24,3010,'MALE','345345','AADHAR','John','SL-2','CONFIRMED',123127),(1010,25,1510,'MALE','32643276','AADHAR','jon','GEN-1','CANCELLED',123128),(1011,24,1510,'FEMALE','213123','PAN','Sushmita','GEN-2','CONFIRMED',123129),(1012,16,1510,'MALE','1223','PAN','Vedant','GEN-3','CONFIRMED',123129),(1013,24,1510,'MALE','234234','PAN','Rahul','GEN-1','CONFIRMED',123130),(1014,23,1510,'MALE','567567','AADHAR','Pranjal','GEN-2','CONFIRMED',123130);
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `dist_from_src` int DEFAULT NULL,
  `time_duration` int DEFAULT NULL,
  `train_no` bigint NOT NULL,
  `station_id` varchar(5) NOT NULL,
  `busstand_id` varchar(5) NOT NULL,
  `bus_no` bigint NOT NULL,
  PRIMARY KEY (`station_id`,`train_no`),
  KEY `FKasmgo2s9x286ub9gphq8qhy1j` (`train_no`),
  CONSTRAINT `FKasmgo2s9x286ub9gphq8qhy1j` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`),
  CONSTRAINT `FKeog8s37cjfyubjbklhoto75ei` FOREIGN KEY (`station_id`) REFERENCES `stations` (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (200,2,22057,'AGR','',0),(0,0,22057,'DEL','',0),(500,8,22057,'KOT','',0),(1500,20,22057,'MUM','',0),(1200,14,22057,'PUN','',0);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations` (
  `station_id` varchar(5) NOT NULL,
  `distance` int NOT NULL,
  `station_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`station_id`),
  UNIQUE KEY `UK_g2b6qhq31rj7r1lk2mq5r2d48` (`station_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES ('AGR',200,'Agra'),('DEL',0,'Delhi'),('KOT',500,'Kota'),('MUM',1500,'Mumbai'),('PUN',1200,'Pune');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_schedule`
--

DROP TABLE IF EXISTS `train_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_schedule` (
  `weekday` varchar(10) NOT NULL,
  `schedule_date` date NOT NULL,
  `train_no` bigint NOT NULL,
  `train_type_id` varchar(5) NOT NULL,
  PRIMARY KEY (`train_no`,`train_type_id`,`weekday`),
  UNIQUE KEY `UKfd8269cedpypish9o7l9mpbrt` (`schedule_date`,`train_no`),
  KEY `FKihepi7avatrsjc3eocw8ijxfm` (`train_type_id`),
  CONSTRAINT `FKihepi7avatrsjc3eocw8ijxfm` FOREIGN KEY (`train_type_id`) REFERENCES `train_type` (`train_type_id`),
  CONSTRAINT `FKlosjgs26fq57674j0lf285stv` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_schedule`
--

LOCK TABLES `train_schedule` WRITE;
/*!40000 ALTER TABLE `train_schedule` DISABLE KEYS */;
INSERT INTO `train_schedule` VALUES ('TUESDAY','2022-10-04',22057,'EXP');
/*!40000 ALTER TABLE `train_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_status`
--

DROP TABLE IF EXISTS `train_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_status` (
  `train_status_id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `day` varchar(255) NOT NULL,
  `seats_available` int DEFAULT '10',
  `seats_booked` int DEFAULT '0',
  `seats_waiting` int DEFAULT '0',
  `total_seats` int DEFAULT '10',
  `version` int DEFAULT NULL,
  `coach_class` varchar(5) NOT NULL,
  `train_no` bigint NOT NULL,
  PRIMARY KEY (`train_status_id`),
  KEY `FK9u1wbs84sokyku4i230kcyylt` (`coach_class`),
  KEY `FKru5k6mum6ppdah1nnown8wvsw` (`train_no`),
  CONSTRAINT `FK9u1wbs84sokyku4i230kcyylt` FOREIGN KEY (`coach_class`) REFERENCES `coaches` (`coach_id`),
  CONSTRAINT `FKru5k6mum6ppdah1nnown8wvsw` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_status`
--

LOCK TABLES `train_status` WRITE;
/*!40000 ALTER TABLE `train_status` DISABLE KEYS */;
INSERT INTO `train_status` VALUES (196,'2022-10-04','TUESDAY',10,0,0,10,0,'1AC',22057),(197,'2022-10-04','TUESDAY',10,0,0,10,0,'2AC',22057),(198,'2022-10-04','TUESDAY',10,0,0,10,0,'3AC',22057),(199,'2022-10-04','TUESDAY',10,0,0,10,0,'GEN',22057),(200,'2022-10-04','TUESDAY',10,0,0,10,0,'SL',22057);
/*!40000 ALTER TABLE `train_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_type`
--

DROP TABLE IF EXISTS `train_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_type` (
  `train_type_id` varchar(5) NOT NULL,
  `special_charges` double NOT NULL,
  `train_type_name` varchar(20) NOT NULL,
  PRIMARY KEY (`train_type_id`),
  UNIQUE KEY `UK_aaiq19ni8s2h6cs9m9v9g2a6u` (`train_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_type`
--

LOCK TABLES `train_type` WRITE;
/*!40000 ALTER TABLE `train_type` DISABLE KEYS */;
INSERT INTO `train_type` VALUES ('EXP',10,'Express'),('RDJ',20,'Rajdhani');
/*!40000 ALTER TABLE `train_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trains`
--

DROP TABLE IF EXISTS `trains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trains` (
  `train_no` bigint NOT NULL,
  `dest_arr_time` time NOT NULL,
  `src_dept_time` time NOT NULL,
  `train_name` varchar(50) NOT NULL,
  `destination_station_id` varchar(5) NOT NULL,
  `source_station_id` varchar(5) NOT NULL,
  `train_type` varchar(5) NOT NULL,
  PRIMARY KEY (`train_no`),
  UNIQUE KEY `UK_g9p5mod2ammxx9iumlvbi2jvh` (`train_name`),
  KEY `FKblibbuoiigmcn7itc7b9pvq89` (`destination_station_id`),
  KEY `FKqkipp9776vgttfkic1c9f94rs` (`source_station_id`),
  KEY `FK58kvycexd299ijt4bvkrrgysp` (`train_type`),
  CONSTRAINT `FK58kvycexd299ijt4bvkrrgysp` FOREIGN KEY (`train_type`) REFERENCES `train_type` (`train_type_id`),
  CONSTRAINT `FKblibbuoiigmcn7itc7b9pvq89` FOREIGN KEY (`destination_station_id`) REFERENCES `stations` (`station_id`),
  CONSTRAINT `FKqkipp9776vgttfkic1c9f94rs` FOREIGN KEY (`source_station_id`) REFERENCES `stations` (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trains`
--

LOCK TABLES `trains` WRITE;
/*!40000 ALTER TABLE `trains` DISABLE KEYS */;
INSERT INTO `trains` VALUES (2158,'20:00:00','10:00:00','AGRA-PUNE EXP','PUN','AGR','EXP'),(22057,'05:00:00','11:00:00','DELHI-MUMBAI EXP','MUM','DEL','EXP'),(22235,'17:00:00','12:00:00','KOTA-MUMBAI EXP','MUM','KOT','RDJ');
/*!40000 ALTER TABLE `trains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` bigint NOT NULL,
  `total_amount` double DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  `transaction_status` varchar(20) DEFAULT NULL,
  `booking_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FK1vvb3q75hdycdrixaiqq80t59` (`booking_id`),
  KEY `FKqwv7rmvc8va8rep7piikrojds` (`user_id`),
  CONSTRAINT `FK1vvb3q75hdycdrixaiqq80t59` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  CONSTRAINT `FKqwv7rmvc8va8rep7piikrojds` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2022004,3020,'2022-09-26','SUCCESS',123126,10002),(2022005,6020,'2022-09-26','SUCCESS',123127,10002),(2022006,1510,'2022-09-26','SUCCESS',123128,10002),(2022007,3020,'2022-09-26','SUCCESS',123129,10002),(2022008,3020,'2022-10-04','SUCCESS',123130,10002);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL,
  `role` varchar(10) DEFAULT 'USER',
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `otp` int DEFAULT NULL,
  `security_ans` varchar(30) DEFAULT NULL,
  `security_ques` varchar(255) DEFAULT NULL,
  `user_addr` varchar(50) DEFAULT NULL,
  `user_dob` date NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_mobile` varchar(10) DEFAULT NULL,
  `user_password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_33uo7vet9c79ydfuwg1w848f` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10002,'USER','Shade','Rapo',NULL,'blue','What is your favourite color?','Mumbai','1996-01-09','shaderapo@gmail.com','2342342347','$2a$10$XEXdq4J10FRpHE10/0C8duKwES1ZQcEMK8ggHgaJSVEbcVSAJig5.'),(10003,'ADMIN','Rahul','Vishwakarma',NULL,'blue','What is your favourite color?','Noida','1999-12-12','rahulmkv1997@gmail.com','8234567177','$2a$10$YBfn.CrYqpQ14rrTDJZQ8ef4PTPpyeLRFR/15.VdsU6wNIkvXyUhe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `wallet_id` bigint NOT NULL,
  `cvv` varchar(200) NOT NULL,
  `debit_card_no` varchar(14) NOT NULL,
  `valid_thru` date NOT NULL,
  `wallet_amt` double NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`wallet_id`),
  UNIQUE KEY `UK_gr00co3xeo7081m1pdqldbjak` (`debit_card_no`),
  UNIQUE KEY `UK_sswfdl9fq40xlkove1y5kc7kv` (`user_id`),
  CONSTRAINT `FKc1foyisidw7wqqrkamafuwn4e` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (30003,'$2a$10$ayPmUYkkUKjUMg04tgigMuL3M.ITO.X7dyEUoy7Uwse4KvLkARuoK','1234-1234-1234','2023-11-01',5337,10002);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-29 16:43:47
