-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 28 Avril 2016 à 12:04
-- Version du serveur :  5.6.16
-- Version de PHP :  5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `ws_crud_test`
--

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(128) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `id_card` int(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`mail`),
  UNIQUE KEY `cni` (`id_card`,`phone`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Contenu de la table `members`
--

INSERT INTO `members` (`id`, `pseudo`, `mail`, `status`, `first_name`, `last_name`, `birthday`, `id_card`, `phone`, `avatar`) VALUES
(24, 'ayefson', 'ayefou@gmail.com', 'admin', 'AYEF NGOUANFO', 'AYEF NGOUANFO', '1994-04-05', 33355, 690999888, 'avatar0'),
(25, 'tnga', 'tnga@gmail.com', 'admin', 'TINDO NGOUFO', 'TINDO NGOUFO', '0000-00-00', 1189000, 679454022, 'avatar1'),
(26, 'naruto', 'narutouzi@gmail.com', 'gold member', 'TABUEU FOTSO', 'TABUEU FOTSO', '1999-04-05', 11223344, 679834343, 'avatar2'),
(27, 'tatony', 'taton@free.fr', 'member', 'TATON', 'TATON', '0000-00-00', 45555, 655666677, 'avatar4'),
(28, 'testyeah', 'testman@tnga.cm', 'member', 'TEST PROJECT', 'TEST PROJECT', '2015-09-11', 0, 679080800, 'avatar4'),
(40, 'tata', 'tata@yahoo.fr', 'silver member', 'TTT', 'TTT', '1998-04-12', 224455667, 224455667, 'avatar3'),
(41, 'borel', 'borel@free.fr', 'member', 'BOREL', 'BOREL', '1990-05-12', 23, 232444444, 'avatar8'),
(44, 'oldman', 'oldman@regitry.old', 'gold member', 'man', 'man', '1985-04-01', 1234567, 123456789, 'avatar14'),
(45, 'thetest', 'test@test.yes', 'member', 'test', 'test', '2016-04-28', 0, 0, 'avatar15');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
