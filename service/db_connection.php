<?php
try {
	
	$dbo = new PDO('mysql:host=localhost;dbname=ws_crud_test', 'root', 'tnga') ;
}
catch (Exception $e) {
	
	die('Erreur : ' . $e->getMessage());
}

function get_members () {
	
	global $dbo ;
	$members = array() ;
	
	if (isset($dbo)) {
		
		try {
			$answer = $dbo->query('SELECT * FROM members') ;

			while ($result = $answer->fetch()) {

				array_push( $members, $result) ;
			}
		} catch(Exception $e) {
		  // En cas d'erreur, on affiche un message et on arrête tout
		  die('Erreur : '.$e->getMessage());
		}
	}
    
    return $members ;
}

function update_member ($user_data) {
	
	global $dbo ;
	
	if (isset($dbo)) {
		
		try {
			$query = $dbo->prepare('UPDATE members SET first_name = :fname, last_name = :fname, pseudo = :npseudo, avatar = :navatar, status = :nstatus, birthday = :birth, id_card = :nic, mail = :email, phone = :tel WHERE id = :uid') ;
			$query->execute(array(
				'fname' => $user_data["first_name"],
				'fname' => $user_data["last_name"],
				'npseudo' => $user_data["pseudo"],
				'navatar' => $user_data["avatar"],
				'nstatus' => $user_data["status"],
				'birth' => $user_data["birthday"],
				'nic' => $user_data["id_card"],
				'email' => $user_data["mail"],
				'tel' => $user_data["phone"],
				'uid' => $user_data["id"]
			));
		} catch(Exception $e) {
		  // En cas d'erreur, on affiche un message et on arrête tout
		  //die('Erreur : '.$e->getMessage());
		  return "error" ;
		}
		
		return "success" ;
	}
}

function create_member ($user_data) {
	
	global $dbo ;
	
	if (isset($dbo)) {
		
		try {
			$query = $dbo->prepare('INSERT INTO members(first_name, last_name, pseudo, avatar, status, birthday, id_card, mail, phone) VALUES(:fname, :fname, :npseudo, :navatar, :nstatus, :birth, :nic, :email, :tel)') ;
			$query->execute(array(
				'fname' => $user_data["first_name"],
				'fname' => $user_data["last_name"],
				'npseudo' => $user_data["pseudo"],
				'navatar' => $user_data["avatar"],
				'nstatus' => $user_data["status"],
				'birth' => $user_data["birthday"],
				'nic' => $user_data["id_card"],
				'email' => $user_data["mail"],
				'tel' => $user_data["phone"]
			));
		} catch(Exception $e) {
		  // En cas d'erreur, on affiche un message et on arrête tout
		  //die('Erreur : '.$e->getMessage());
		  return "error" ;
		}
		
		return "success" ;
	}
}

function delete_member ($user_id) {
	
	global $dbo ;
	
	if (isset($dbo)) {
		
		try {
			$query = $dbo->prepare('DELETE FROM members WHERE id = :uid') ;
			$query->execute(array(
				'uid' => $user_id
			));
		} catch(Exception $e) {
		  // En cas d'erreur, on affiche un message et on arrête tout
		  //die('Erreur : '.$e->getMessage());
		  return "error" ;
		}
		
		return "success" ;
	}
}
?>
