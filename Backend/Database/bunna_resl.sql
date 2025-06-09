-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2025 at 04:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bunna_resl`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch_manager_approvals`
--

CREATE TABLE `branch_manager_approvals` (
  `id` int(11) NOT NULL,
  `loan_taker_id` varchar(10) NOT NULL,
  `guarantor_id` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `final` enum('waiting','approved','denied') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_manager_approvals`
--

INSERT INTO `branch_manager_approvals` (`id`, `loan_taker_id`, `guarantor_id`, `created_at`, `final`) VALUES
(1, 'EMP004', 'EMP006', '2025-06-08 16:34:35', 'approved'),
(2, 'EMP004', 'EMP005', '2025-06-08 16:36:09', NULL),
(3, 'EMP004', 'EMP005', '2025-06-08 16:37:40', NULL),
(4, 'EMP004', 'EMP005', '2025-06-08 16:38:48', NULL),
(5, 'EMP003', 'EMP005', '2025-06-08 16:39:13', NULL),
(6, 'EMP003', 'EMP006', '2025-06-08 16:41:05', 'approved'),
(7, 'EMP003', 'EMP006', '2025-06-08 16:42:53', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `id` int(11) NOT NULL,
  `loan_taker_id` varchar(10) DEFAULT NULL,
  `guarantor_id` varchar(10) DEFAULT NULL,
  `approved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `request` varchar(10) NOT NULL DEFAULT 'Done'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `finance`
--

INSERT INTO `finance` (`id`, `loan_taker_id`, `guarantor_id`, `approved_at`, `request`) VALUES
(1, 'EMP003', 'EMP006', '2025-06-08 18:30:26', 'Done'),
(2, 'EMP003', 'EMP006', '2025-06-08 18:31:31', 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `general_employee`
--

CREATE TABLE `general_employee` (
  `Employee_id` varchar(10) NOT NULL,
  `Employee_Fname` varchar(25) NOT NULL,
  `Employee_Lname` varchar(25) NOT NULL,
  `Employee_age` int(2) NOT NULL,
  `Employee_DOB` date NOT NULL,
  `isPermanent` tinyint(1) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `role` varchar(15) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `general_employee`
--

INSERT INTO `general_employee` (`Employee_id`, `Employee_Fname`, `Employee_Lname`, `Employee_age`, `Employee_DOB`, `isPermanent`, `phone_number`, `role`, `salary`, `password`) VALUES
('EMP001', 'John', 'Doe', 29, '1996-03-15', 1, '9876543210', 'Manager', 85000, 'john'),
('EMP002', 'Jane', 'Smith', 25, '1999-08-22', 1, '8765432109', 'Developer', 90000, 'jane'),
('EMP003', 'Robert', 'Brown', 32, '1993-05-10', 1, '7654321098', 'Developer', 72000, 'robert'),
('EMP004', 'Emily', 'Jones', 28, '1997-11-30', 0, '6543210987', 'Analyst', 60000, 'emily'),
('EMP005', 'Michael', 'Clark', 30, '1995-06-18', 1, '5432109876', 'Designer', 55000, 'michael'),
('EMP006', 'Sophia', 'Lewis', 26, '1999-02-05', 1, '4321098765', 'HR', 58000, 'sofi'),
('EMP007', 'Daniel', 'Lee', 31, '1994-09-12', 0, '3210987654', 'Developer', 73000, ''),
('EMP008', 'Isabella', 'Walker', 27, '1998-01-20', 1, '2109876543', 'Accountant', 61000, ''),
('EMP009', 'David', 'Hall', 29, '1996-12-25', 1, '1098765432', 'Manager', 82000, ''),
('EMP010', 'Emma', 'Allen', 24, '2001-07-07', 0, '9988776655', 'Intern', 35000, 'emma'),
('EMP011', 'James', 'Young', 35, '1990-04-14', 1, '8877665544', 'CTO', 120000, ''),
('EMP012', 'Olivia', 'King', 22, '2003-03-02', 0, '7766554433', 'Intern', 34000, ''),
('EMP013', 'William', 'Scott', 27, '1998-10-10', 1, '6655443322', 'QA Tester', 57000, ''),
('EMP014', 'Ava', 'Green', 28, '1997-09-09', 1, '5544332211', 'Developer', 72000, ''),
('EMP015', 'Joseph', 'Baker', 33, '1992-08-08', 0, '4433221100', 'Manager', 80000, ''),
('EMP016', 'Mia', 'Adams', 26, '1999-01-01', 1, '3322110099', 'HR', 60000, 'mia'),
('EMP017', 'Ethan', 'Nelson', 29, '1996-04-04', 0, '2211009988', 'Designer', 66000, ''),
('EMP018', 'Charlotte', 'Hill', 25, '2000-02-22', 1, '1100998877', 'Analyst', 62000, ''),
('EMP019', 'Logan', 'Ramirez', 30, '1995-12-12', 1, '9998887776', 'Accountant', 61000, ''),
('EMP020', 'Amelia', 'Campbell', 28, '1997-06-06', 0, '8887776665', 'Developer', 73000, '');

-- --------------------------------------------------------

--
-- Table structure for table `loan_guarantors`
--

CREATE TABLE `loan_guarantors` (
  `id` int(11) NOT NULL,
  `loan_taker_id` varchar(10) NOT NULL,
  `guarantor_id` varchar(10) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `request_message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_guarantors`
--

INSERT INTO `loan_guarantors` (`id`, `loan_taker_id`, `guarantor_id`, `status`, `request_message`, `created_at`) VALUES
(1, 'EMP003', 'EMP005', 'accepted', 'Dear Michael, can you be my guarantor to Robert Brown?', '2025-06-08 05:27:48'),
(2, 'EMP003', 'EMP006', 'accepted', 'Dear Sophia, can you be my guarantor to Robert Brown?', '2025-06-08 05:27:48'),
(3, 'EMP004', 'EMP005', 'accepted', 'Dear Michael, can you be my guarantor to Emily Jones?', '2025-06-08 05:31:10'),
(4, 'EMP004', 'EMP005', 'accepted', 'Dear Michael, can you be my guarantor to Emily Jones?', '2025-06-08 05:31:58'),
(5, 'EMP004', 'EMP006', 'accepted', 'Dear Sophia, can you be my guarantor to Emily Jones?', '2025-06-08 05:31:58'),
(6, 'EMP004', 'EMP005', 'accepted', 'Dear Michael, can you be my guarantor to Emily Jones?', '2025-06-08 15:31:11'),
(7, 'EMP004', 'EMP006', 'accepted', 'Dear Sophia, can you be my guarantor to Emily Jones?', '2025-06-08 15:31:11'),
(8, 'EMP004', 'EMP005', 'accepted', 'Dear Michael, can you be my guarantor to Emily Jones?', '2025-06-08 15:51:32'),
(9, 'EMP004', 'EMP006', 'accepted', 'Dear Sophia, can you be my guarantor to Emily Jones?', '2025-06-08 15:51:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch_manager_approvals`
--
ALTER TABLE `branch_manager_approvals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_employee`
--
ALTER TABLE `general_employee`
  ADD PRIMARY KEY (`Employee_id`);

--
-- Indexes for table `loan_guarantors`
--
ALTER TABLE `loan_guarantors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loan_taker_id` (`loan_taker_id`),
  ADD KEY `guarantor_id` (`guarantor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch_manager_approvals`
--
ALTER TABLE `branch_manager_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `finance`
--
ALTER TABLE `finance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `loan_guarantors`
--
ALTER TABLE `loan_guarantors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loan_guarantors`
--
ALTER TABLE `loan_guarantors`
  ADD CONSTRAINT `loan_guarantors_ibfk_1` FOREIGN KEY (`loan_taker_id`) REFERENCES `general_employee` (`Employee_id`),
  ADD CONSTRAINT `loan_guarantors_ibfk_2` FOREIGN KEY (`guarantor_id`) REFERENCES `general_employee` (`Employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
