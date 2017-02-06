import axios from "axios";

const API_URL = "/api/v1/";

class Store {
	constructor(render) {
		this.render = render;

		this.stateListeners = [
			/*{
				setStateFunction: {},
				stateToListen: "myState"
			}*/
		];

		/* store contain states */
		this.store = {
			/* "myState": "myValue" */
			isLogged: false
		};

		this.push = this.push.bind(this);
		this.pushObj = this.pushObj.bind(this);
		this.pull = this.pull.bind(this);
		this.connectClient = this.connectClient.bind(this);
		this.deconnectClient = this.deconnectClient.bind(this);
		this.callRender = this.callRender.bind(this);
		this.addStateListener = this.addStateListener.bind(this);
		this.callApi = this.callApi.bind(this);
	}

	callRender() {
		this.render();
	}

	/*
	 * state must be a string
	 */
	push(state, value) {
		console.log(`PUSH -> state: ${state}, value: ${value}`);
		this.store[state] = value;

		/* notify listeners */
		this.stateListeners.forEach(function(listener){
			if(state === listener.stateToListen) {
				let stateObj = {}; // obj to pass to setState function
				stateObj[state] = value;
				// call set good context
				listener.setStateFunction.call(listener.thatContext, stateObj);
			}
		});
	}

	// push multiple state
	pushObj(stateObj) {
		/*
			stateObj = {
				myState: myVal,
				myState2: myVal2
			}
		*/
		// for(let key in stateObj){
		// 	this.push(key, stateObj[key]);
		// }

		console.log(`PUSHOBJ -> stateObj: `);
		console.log(stateObj);

		/*
			do only one setState per Component (that)
			[
				{
					thatContext: ReactComponent,
					setStateFunction: function,
					newState: {myStateToUpadte: myValue, ...}
				}
			]
		*/
		let haveToNotify = []

		let that = this;
		for(let key in stateObj){
			let state = key;
			let value = stateObj[key];

			//this.push(key, stateObj[key]);
			that.store[state] = value;

			// push Componets to notify
			this.stateListeners.forEach(function(listener){
				let haveToCreateNew = true;
				haveToNotify.forEach(function(obj){
					if(obj.thatContext == listener.thatContext){
						haveToCreateNew = false;
						obj.newState[state] = value;
					}
				});

				if(haveToCreateNew) {
					let newState = {};
					newState[state] = value;
					haveToNotify.push({
						thatContext: listener.thatContext,
						setStateFunction: listener.setStateFunction,
						newState: newState
					});
				}
			});
		}


		/* Notify listerner once per Component */
		haveToNotify.forEach(function(obj){
			// call set good context
			obj.setStateFunction.call(obj.thatContext, obj.newState);
		});
	}

	pull(state) {
		let value = this.store[state]
		console.log(`PULL -> state: ${state}, value: ${this.store[state]}`);
		return value;
	}

	connectClient(username, password) {
		// console.log(username + password);
		/*let that = this;
        axios({
			method : 'get',
			url : '/api/v1/user',
			auth : {
				username: username,
				password: password
			},
			params : {
				username: username
			}
        }).then(function(response) {
			// good
        	console.log(response);
			//that.push("isLogged", true);
			that.pushObj({
				isLogged: true,
				username: response.data.username,
				email: "toto@blabla.com", // TODO
				photo: "http://www.material-ui.com/images/ok-128.jpg"
			});
        }).catch(function(error) {
			// wrong
        	console.log(error);
        });*/
		let that = this;
		this.callApi({
			method: "get",
			url: "user",
			data: {
				username: username
			},
			auth: {
				username: username,
				password: password
			},
			callbackSuccess: function(response){
				that.pushObj({
					isLogged: true,
					username: response.data.username,
					email: response.data.email,
					photo: response.data.photo
				});
			},
			callbackError: function(error){
				console.log("fail connect")
			}
		});
	}

	deconnectClient(){
		this.pushObj({
			isLogged: false,
			username: undefined,
			email: undefined,
			photo: undefined
		});
	}

	addStateListener(thatContext, setStateFunction, stateToListen) {
		this.stateListeners.push({
			setStateFunction: setStateFunction,
			stateToListen: stateToListen,
			thatContext: thatContext
		});
	}

	// call api with axios ajax lib
	callApi(obj) {
		/*
			obj = {
				method: "get|post|...",
				url: "exemple",
				data: {some data},
				auth: {username, password} (optional),
				callbackSuccess: function(reponse) (optional),
				callbackError: function(error) (optional)
			}
		*/
		let that = this;

		let requestObj = {
			method : obj.method,
			url : `${API_URL}${obj.url}`,
		};

		// if username and password defined
		if((that.store.username || obj.auth.username) && (that.store.password || obj.auth.password)){
			requestObj["auth"] = {
				username: that.store.username || obj.auth.username,
				password: that.store.password || obj.auth.password
			};
		}

		if(obj.method === "get"){
			requestObj["params"] = obj.data;
		}else{
			requestObj["data"] = obj.data;
		}

        axios(requestObj).then(function(response){
			// good
			console.log("api call: success");
        	console.log(response);

			// if callbackSuccess defined
			if(obj.callbackSuccess) {
				obj.callbackSuccess(response);
			}
        }).catch(function(error) {
			// wrong
			console.log("api call: error");
        	console.log(error);

			// if callbackError defined
			if(obj.callbackError) {
				obj.callbackError(error);
			}
        });
	}
}

export default Store;
