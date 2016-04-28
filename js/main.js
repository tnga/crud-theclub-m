/*fix for vue-binding materialize-select value issues*/
Vue.directive("select", {
    "twoWay": true,

    "bind": function () {
        $(this.el).material_select();

        var self = this;

        $(this.el).on('change', function() {
            self.set($(self.el).val());
        });
    },

    update: function (newValue, oldValue) {
        $(this.el).val(newValue);
    },

    "unbind": function () {
        $(this.el).material_select('destroy');
    }
});

/*vue instance for listing users overview and settings*/
var clubMZone = new Vue({
	
	el: '#member-zone',
	data: {
		
		users: null  //all members infos
	},
	methods: {
		
		editProfile: function (userID) {
			
			if (userID && userID != -1) { //prevent unset member id
				
				var i = 0 ;
				while (this.users[i]["id"] !== userID) i++;
				profileMZone.profile = this.users[i] ; //init user infos to be edit
				profileMZone.operation = "update" ;
				
				$('#modal-edit-profile').openModal();
			}
			else {
				Materialize.toast('can\'t process, need page to be refresh', 5000, 'red') ;
			}
			
		} ,
		stepDeleteProfile: function (userID) {
			
			if (userID && userID != -1) { //prevent unset member id
				
				comfirmMZone.ref = userID ; //refer futur removed user with it id
				comfirmMZone.message = "do you really want delete this member ? This can't be undo !" ;
				
				$('#modal-confirm-op').openModal();
			}
			else {
				Materialize.toast('can\'t process, need page to be refresh', 5000, 'red') ;
			}
		} ,
		searchProfile: function () {}
	}
}) ;

/*vue instance for editing users profile*/
var profileMZone = new Vue({
	
	el: '#modal-edit-profile',
	data: {
		
		profile: {} , //for operations on the profile of a target member
		operation: "" , //type of the operation
		props: ["first_name", "last_name", "pseudo", "avatar", "status", "birthday", "id_card", "mail", "phone"] //main profile properties
	},
	methods: {
		
		updateProfile: function () {
			
			var isProfileOk = true ;
			//check if everything in profile is set before process target task
			for (i in this.props) {
				
				if (this.profile[ this.props[i] ]) continue ;
				else {
					console.log(this.props[i]) ;
					Materialize.toast('uncomplete profile', 7000, "red") ;
					isProfileOk = false ;
					break ;
				}
			}
			
			if (isProfileOk) {
				
				crudQuery.op = this.operation;
				crudQuery.data = this.profile ;
				try { 
					socket.send( JSON.stringify( crudQuery ) ); 
					console.log('Sent for '+ this.operation +': '+ JSON.stringify( crudQuery )); 
					
					$('#modal-edit-profile').closeModal();
				} 
				catch(ex) { 
					console.log(ex); 
				}
			}
		}
	}
}) ;

/*vue instance for confirmation of some operations*/
var comfirmMZone = new Vue({
	
	el: '#modal-confirm-op',
	data: {
		
		ref: "" , //reference with which operation will be process (egg: user-id to delete)
		message: "" , 
		alertStyle: "red-text" //set with materialize class
	},
	methods: {
		
		deleteProfile: function () {
			
			crudQuery.op = "delete";
			crudQuery.data = this.ref ; //futur removed member is target by it `id` provide here by `ref`
			try { 
				socket.send( JSON.stringify( crudQuery ) ); 
				console.log('Sent for delete:'+ JSON.stringify( crudQuery )); 
				
				$('#modal-confirm-op').closeModal();
			} 
			catch(ex) { 
				console.log(ex); 
			}
		} ,
	}
}) ;

/*vue instance for manage of some operations on main menu*/
var navMZone = new Vue({
	
	el: '#main-menu',
	data: {
		
	},
	methods: {
		
		addProfile: function () {
			
			profileMZone.profile = {} ; //init new member profile
			profileMZone.operation = "create" ;
			
			$('#modal-edit-profile').openModal();
		}
	}
}) ;


var crudQuery = {
		op: "" , //operation type
		data: [] //json data to send, or string (`id` of a member in case of delete operation)
	};
var crudAnswer = null;
var socket = null;

function initWebSocket() {
	
	var host = "ws://127.0.0.1:9000/"; // SET THIS TO YOUR SERVER
	
	try {
		socket = new WebSocket(host);
		console.log('web-socket status: ' + socket.readyState);
		
		socket.onopen = function(msg) { 
			
			console.log("Connected - status "+this.readyState); 
			Materialize.toast('ws-connexion established', 5000) ;
		};
		socket.onmessage = function(msg) { 
			
			crudAnswer = JSON.parse( msg.data ) ;
			
			if (crudAnswer["op"] === "create") {
				
				if (crudAnswer["status"] === "success") {
					/*@NOTE Because this is just a test project,
					 * instructions below haven't be optimized.
					 * Indeed, new adding profile haven't it `id` set to
					 * one defined from the server; then `delete` operation  
					 * can't be available considering it depend of profile `id`.
					 *@TODO get the new created member or it `id` from the server's answer
					 * to resolve this issue. 
					*/
					profileMZone.profile["id"] = -1 ; //mark unknow member id
					clubMZone.users.unshift( profileMZone.profile ) ;
					
					Materialize.toast('profile created', 5000) ;
				}
				else Materialize.toast('creating profile error', 5000, "red") ;
			}
			else if (crudAnswer["op"] === "update") {
				
				if (crudAnswer["status"] === "success")  Materialize.toast('profile updated', 5000) ;
				else Materialize.toast('updating profile error', 5000, "red") ;
			}
			else if (crudAnswer["op"] === "delete") {
				
				if (crudAnswer["status"] === "success") {
					/*@NOTE Because this is just a test project,
					 * instructions below haven't be optimized.
					 * Indeed, `comfirmMZone.ref` can change before receive an answer
					 * from the server if connexion is slow; 
					 * Then wrong profile will be remove here from the table.
					 @TODO try to better perform this. 
					 * it can be fix by using an intermediate variable to stock `id` of
					 * removed member instead of directly use `comfirmMZone.ref`.
					*/
					var i = 0 ;
					while (clubMZone.users[i]["id"] !== comfirmMZone.ref) i++;
					clubMZone.users.splice( i, 1 ) ;
					Materialize.toast('profile deleted', 5000) ;
				}
				else Materialize.toast('deleting profile error', 5000, "red") ;
			}
			else { 
				//generally for getting members data.
				clubMZone.users = crudAnswer ;  
				console.log(clubMZone.users); 
			}
			
			//print performed operation in conosole
			if (crudAnswer["op"] && crudAnswer["status"]) console.log("profile "+ crudAnswer["op"] +": "+ crudAnswer["status"]) ;
		};
		socket.onclose   = function(msg) { 
			
			console.log("Disconnected - status "+this.readyState); 
			Materialize.toast('Disconnected to websocket server', 10000, "red") ;
		};
	}
	catch(ex){ 
		console.log(ex);
		Materialize.toast('can\'t init connexion to websocket server', 10000, "red") ; 
	}
}


function quitWebSocket(){
	if (socket != null) {
		console.log("Goodbye!");
		socket.close();
		socket=null;
	}
}

function reconnectWebSocket() {
	quitWebSocket();
	initWebSocket();
}

$(document).ready(function() {
	
	initWebSocket() ;
	
    $('select').material_select();
    $('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
	    selectYears: 70, // Creates a dropdown of 15 years to control year
	    format: 'yyyy/mm/dd' 
	});
});
