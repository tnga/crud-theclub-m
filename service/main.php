#!/usr/bin/env php
<?php

require_once('./websockets.php');
require_once('./db_connection.php');

class ws_crud_test_server extends WebSocketServer {
  //protected $maxBufferSize = 1048576; //1MB... overkill for an echo server, but potentially plausible for other applications.
  
  protected function process ($user, $message) { //Called immediately when the data is recieved. 
	  
	  $the_msg = json_decode( $message, true ) ;
	  
	  if ($the_msg["op"] === "create") {
		  
		  $answer = array( "op" => "create", "status" => create_member( $the_msg["data"] ) );
		  $this->send($user, json_encode( $answer ));
	  }
	  else if ($the_msg["op"] === "update") {
		  
		  $answer = array( "op" => "update", "status" => update_member( $the_msg["data"] ) );
		  $this->send($user, json_encode( $answer ));
	  }
	  else if ($the_msg["op"] === "delete") {
		  
		  $answer = array( "op" => "delete", "status" => delete_member( $the_msg["data"] ) );
		  $this->send($user, json_encode( $answer ));
	  }
	  else {
		  $this->send($user, json_encode( get_members() ));
	  }
  }
  
  protected function connected ($user) { // Called after the handshake response is sent to the client.
    
    $this->send($user, json_encode( get_members() ));
  }
  
  protected function closed ($user) { // Called after the connection is closed.
    // Do nothing: This is where cleanup would go, in case the user had any sort of
    // open files or other objects associated with them.  This runs after the socket 
    // has been closed, so there is no need to clean up the socket itself here.
  }
}

$ws_crud = new ws_crud_test_server("127.0.0.1","9000");

try {
  $ws_crud->run();
}
catch (Exception $e) {
  $ws_crud->stdout($e->getMessage());
}
