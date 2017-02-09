import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "/api/v1/";

class Store {
	constructor() {
		this.stateListeners = [
			/*{
				setStateFunction: {},
				stateToListen: "myState"
			}*/
		];

		/* store contain states */
		this.store = {
			/* "myState": "myValue" */
			isLogged: false,
			connectionFail: false,
			categories: [],
			threads: [],
			thread: [], // selected thread
			currentlyViewing: undefined

		};

		this.push = this.push.bind(this);
		this.pushObj = this.pushObj.bind(this);
		this.pull = this.pull.bind(this);
		this.connectClient = this.connectClient.bind(this);
		this.deconnectClient = this.deconnectClient.bind(this);
		this.addStateListener = this.addStateListener.bind(this);
		this.deleteStateListener = this.deleteStateListener.bind(this);
		this.callApi = this.callApi.bind(this);
		this.handleCookiesConnection = this.handleCookiesConnection.bind(this);
	}

	handleCookiesConnection(){
		let username = Cookies.get("username");
		let password = Cookies.get("_password");

		if(username && password){
			this.connectClient(username, password);
		}
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

	delete(state) {
		if(this.store[state]){
			delete this.store[state];
		}
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

		console.log("PUSHOBJ -> stateObj:");
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
		let haveToNotify = [];

		let that = this;
		for(let key in stateObj){
			let state = key;
			let value = stateObj[key];

			//this.push(key, stateObj[key]);
			that.store[state] = value;

			// push Components to notify
			this.stateListeners.forEach(function(listener){
				if(listener.stateToListen === state){
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
				}
			});
		}

		console.log("Haaaave to notify ----");
		console.log(haveToNotify);
		/* Notify listerner once per Component */
		haveToNotify.forEach(function(obj){
			// call set good context
			obj.setStateFunction.call(obj.thatContext, obj.newState);
		});
	}

	pull(state) {
		let value = this.store[state];
		console.log(`PULL -> state: ${state}, value: ${this.store[state]}`);
		return value;
	}

	connectClient(username, password) {
		console.log(`Connection client: ${username}:${password}`);
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
					connectionFail: false,
					username: response.data.username,
					email: response.data.email,
					photo: response.data.photo
				});

				// expire in 40 days
				Cookies.set("username", username, { expires: 40 });
				Cookies.set("_password", password, { expires: 40 }); // TODO: Use temporary key stored on server
			},
			callbackError: function(){
				console.log("fail connect");

				that.pushObj({
					isLogged: false,
					connectionFail: true,
					username: undefined,
					email: undefined,
					photo: undefined
				});

				Cookies.remove("username");
				Cookies.remove("_password");
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

		Cookies.remove("username");
		Cookies.remove("_password");
	}

	getCategories(){
		let that = this;
		this.callApi({
			method: "get",
			url: "categories",
			data: {
			},
			callbackSuccess: function(response){
				that.push("categories", response.data);
			},
			callbackError: function(){
				console.log("fail get categories");
			}
		});
	}

	// if categoryId undefined, get all threads
	getThreads(categoryId){
		let that = this;

		this.callApi({
			method: "get",
			url: `threads${categoryId ? `/${categoryId}` : ""}`,
			data: {
			},
			callbackSuccess: function(response){
				that.push("threads", response.data);
				that.push("currentlyViewing", "threads");
			},
			callbackError: function(){
				console.log("fail get threads");
			}
		});
	}

	// nedd threadId // get one thread
	getThread(threadId){
		if(threadId == "undefined"){
			console.log("[Error] STORE ~ getThread: you must give threadId parameter");
			return;
		}

		let that = this;

		this.callApi({
			method: "get",
			url: `thread/${threadId}`,
			data: {
			},
			callbackSuccess: function(response){
				that.push("thread", response.data);
				that.push("currentlyViewing", "thread");
			},
			callbackError: function(){
				console.log("fail get thread");
			}
		});
	}

	addStateListener(thatContext, setStateFunction, stateToListen) {
		this.stateListeners.push({
			setStateFunction: setStateFunction,
			stateToListen: stateToListen,
			thatContext: thatContext
		});
		if(this.store[stateToListen]){
			let stateObj = {}; // obj to pass to setState function
			stateObj[stateToListen] = this.store[stateToListen];
			// call set good context
			setStateFunction.call(thatContext, stateObj);
		}
	}

	deleteStateListener(thatContext, stateToListen) {
		let that = this;
		for(let i = this.stateListeners.length - 1; i >= 0; i--) {
			if(
				that.stateListeners[i].stateToListen === stateToListen &&
				that.stateListeners[i].thatContext === thatContext
			){
				that.stateListeners.splice(i,1);
			}
		}
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

		if(!obj.auth){
			obj.auth = {};
		}

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
