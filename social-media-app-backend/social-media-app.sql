-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2025 at 11:49 AM
-- Server version: 5.7.40
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social-media-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `failed_job_id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `job_id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `job_batch_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`job_batch_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_08_173048_create_posts_table', 1),
(5, '2025_04_08_173544_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'token', '4860b913f8afd331f88dbf16b7e364cfb8bdd0dbb52a6e946a2087e42f878ecd', '[\"*\"]', '2025-04-13 03:12:10', NULL, '2025-04-13 03:12:00', '2025-04-13 03:12:10'),
(2, 'App\\Models\\User', 2, 'user_token', 'f9872f552fc2ad38aa09e64c11a0bfc58283057de7aa624ccf44d0bc901748ee', '[\"*\"]', NULL, NULL, '2025-04-13 03:22:20', '2025-04-13 03:22:20'),
(3, 'App\\Models\\User', 3, 'token', '90971e128ef7108e9077d20c66b56bad531fc945009d75a89130cac5d1ed6d59', '[\"*\"]', NULL, NULL, '2025-04-13 03:36:10', '2025-04-13 03:36:10'),
(4, 'App\\Models\\User', 3, 'token', '8001c70347b15c82b5c0ca914808ffbea4be5d4c15ac32361f447772621738f6', '[\"*\"]', '2025-04-13 03:40:27', NULL, '2025-04-13 03:40:25', '2025-04-13 03:40:27'),
(5, 'App\\Models\\User', 3, 'token', '44a073712309f1ad0fff1b0b458ff5cdc8d2576f132f141baa4c2e4e42da9d69', '[\"*\"]', '2025-04-13 03:47:22', NULL, '2025-04-13 03:47:20', '2025-04-13 03:47:22'),
(6, 'App\\Models\\User', 1, 'token', 'a00f2b01c64bf0e18d3bcc958a675b94d848c9a79b258efc396ac4fd56e2d299', '[\"*\"]', '2025-04-13 04:28:05', NULL, '2025-04-13 03:50:25', '2025-04-13 04:28:05'),
(7, 'App\\Models\\User', 1, 'token', 'c211ccfa1fbe486fda3a05ae4688a3f0b8c98cbc2f0aefa9f983390235a5d0fd', '[\"*\"]', '2025-04-17 09:20:47', NULL, '2025-04-16 10:37:36', '2025-04-17 09:20:47'),
(8, 'App\\Models\\User', 3, 'token', 'eb257660dee21ff58d0549b6b74dfccd22ddf58a17ec5c0d890749af010c4a51', '[\"*\"]', '2025-04-17 12:09:38', NULL, '2025-04-17 10:16:43', '2025-04-17 12:09:38'),
(9, 'App\\Models\\User', 3, 'token', '793b7935258dac3d28397aefea15a3521b9ad3348662a10ed7af4ebc17d751d2', '[\"*\"]', '2025-04-17 12:29:04', NULL, '2025-04-17 12:10:01', '2025-04-17 12:29:04'),
(10, 'App\\Models\\User', 1, 'token', 'a12fa59bd753d951ae636aaecb34bd2b034507ff77c75772c5fb71150b6e48ac', '[\"*\"]', '2025-04-17 12:34:21', NULL, '2025-04-17 12:34:03', '2025-04-17 12:34:21'),
(11, 'App\\Models\\User', 1, 'token', '6a5312cbb4bc196c791a38f7032da3d0a158d4e71706ded2ff0e31ff42e304bc', '[\"*\"]', '2025-04-18 11:56:21', NULL, '2025-04-18 11:29:33', '2025-04-18 11:56:21'),
(12, 'App\\Models\\User', 1, 'token', 'fe5813cbd833837d549e9c6ccc416a0cc07383d5e60be6a2162515752bb63836', '[\"*\"]', '2025-04-20 02:27:38', NULL, '2025-04-18 11:56:32', '2025-04-20 02:27:38'),
(13, 'App\\Models\\User', 1, 'token', '9be1ed7f9975a4adbb9148124c6ad97c602bfffdb93dd31af1622f5473e195f4', '[\"*\"]', NULL, NULL, '2025-05-08 11:20:57', '2025-05-08 11:20:57'),
(14, 'App\\Models\\User', 1, 'token', '19edd0bbebd08e01ec5826ebd7c1581b4bc01b52adfe893a08dec2d8248dd87b', '[\"*\"]', '2025-05-08 11:54:38', NULL, '2025-05-08 11:20:58', '2025-05-08 11:54:38'),
(15, 'App\\Models\\User', 1, 'token', '5a26dfa1d3bfef69488ce118c495d396adcdd01214c79eabfb9235c30787d7fb', '[\"*\"]', '2025-05-09 11:58:56', NULL, '2025-05-09 09:47:35', '2025-05-09 11:58:56'),
(16, 'App\\Models\\User', 3, 'token', '76abbf099e1523260f43c960fddc7d98ef10386bac63b552b9880af2e2109d2e', '[\"*\"]', '2025-05-11 02:27:37', NULL, '2025-05-09 11:59:38', '2025-05-11 02:27:37'),
(17, 'App\\Models\\User', 1, 'token', '3238f88b5f8b4349daf0789626090ceb7c8adf4cb6cbd53f21156c441b5e67c7', '[\"*\"]', '2025-05-11 05:13:45', NULL, '2025-05-11 02:27:50', '2025-05-11 05:13:45'),
(18, 'App\\Models\\User', 1, 'token', 'a5cab5baea6f0a4ac02449d01b5fc5afdfdd89c072d97243a10c2f7e6afb9952', '[\"*\"]', '2025-05-11 05:19:11', NULL, '2025-05-11 05:17:10', '2025-05-11 05:19:11'),
(19, 'App\\Models\\User', 2, 'token', '79ecd57864004bde213579b24f441252436a4482c2ff3d00e1d72052d694573f', '[\"*\"]', '2025-05-11 05:52:31', NULL, '2025-05-11 05:24:47', '2025-05-11 05:52:31'),
(20, 'App\\Models\\User', 1, 'token', 'dd42fed2c8e774a8aa5d7d7625d69677c6adc55bd31dbc6466aff36975768be5', '[\"*\"]', '2025-05-11 06:16:05', NULL, '2025-05-11 05:53:51', '2025-05-11 06:16:05');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `post_title` varchar(255) DEFAULT NULL,
  `post_content` text,
  `post_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `post_title`, `post_content`, `post_image`, `created_at`, `updated_at`) VALUES
(1, 3, 'raja 1', 'hfdhfdshdf', NULL, '2025-04-17 12:11:38', '2025-05-09 11:58:44'),
(2, 1, 'testing17', 'content6565', NULL, '2025-04-17 12:34:18', '2025-05-11 06:00:19'),
(3, 1, 'Test77', 'Testing', NULL, '2025-05-08 11:54:31', '2025-05-11 06:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `post_reactions`
--

DROP TABLE IF EXISTS `post_reactions`;
CREATE TABLE IF NOT EXISTS `post_reactions` (
  `pr_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pr_post_id` bigint(20) UNSIGNED NOT NULL,
  `pr_user_id` bigint(20) UNSIGNED NOT NULL,
  `pr_type` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`pr_id`),
  UNIQUE KEY `unique_reaction` (`pr_post_id`,`pr_user_id`),
  KEY `fk_pr_user` (`pr_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_reactions`
--

INSERT INTO `post_reactions` (`pr_id`, `pr_post_id`, `pr_user_id`, `pr_type`, `created_at`, `updated_at`) VALUES
(1, 5, 3, 'like', '2025-05-11 02:12:07', '2025-05-11 02:27:18'),
(2, 2, 3, 'love', '2025-05-11 02:12:29', '2025-05-11 02:26:16'),
(3, 3, 3, 'haha', '2025-05-11 02:19:44', '2025-05-11 02:27:37'),
(4, 1, 1, 'haha', '2025-05-11 02:28:06', '2025-05-11 05:54:28'),
(5, 2, 1, 'love', '2025-05-11 02:40:33', '2025-05-11 05:09:24'),
(6, 3, 1, 'love', '2025-05-11 02:40:36', '2025-05-11 05:09:07'),
(7, 5, 1, 'haha', '2025-05-11 02:40:38', '2025-05-11 05:17:40'),
(8, 5, 2, 'love', '2025-05-11 05:52:00', '2025-05-11 05:52:00'),
(9, 2, 2, 'love', '2025-05-11 05:52:04', '2025-05-11 05:52:04'),
(10, 1, 2, 'love', '2025-05-11 05:52:26', '2025-05-11 05:52:26'),
(11, 3, 2, 'love', '2025-05-11 05:52:31', '2025-05-11 05:52:31');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(191) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `followed` json DEFAULT NULL,
  `user_profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_token` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `followed`, `user_profile_image`, `created_at`, `updated_at`, `user_token`, `email_verified_at`, `remember_token`) VALUES
(1, 'Poonam', 'poonam@gmail.com', '$2y$12$yQqU.K9e6x8Jru9iQAKDUe7p0bwz6xncJTDsc6SBsvDxkHEw7Utna', '[3]', NULL, '2025-04-13 03:11:58', '2025-05-11 05:19:11', NULL, NULL, NULL),
(2, 'Ankit', 'ankit@gmail.com', '$2y$12$KsPML/wHIV1iPMzYSa82w.j2abyokq6QmT2ArYik/2VaLhJMsAHQW', '[3, 1]', NULL, '2025-04-13 03:22:20', '2025-05-11 05:39:54', NULL, NULL, NULL),
(3, 'Raja', 'raja@gmail.com', '$2y$12$LE8LbdCayEnhYFf.WBMuquujMzmMti3vEslz8K5ZMov48lOXCNFZy', '[1]', NULL, '2025-04-13 03:36:10', '2025-05-10 22:29:41', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
