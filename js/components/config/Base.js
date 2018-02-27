const React = require('react-native');
const Host ="http://ditpitalebar.com/";
//const Host ="http://192.168.11.104/ditpp/";

var Base = {
	apiLogin: function() {
		var api = Host+"api/v1/employee/login/";
		return api;
	},
	apiHome: function() {
		var api = Host+"api/v1/employee/count/";
		//var response = execute(api,id);
		return api;
	},
	apiDash: function() {
		var api = Host+"api/v1/employee/count/all/";
		return api;
	},
	apiListSar: function() {
		var api = Host+"api/v1/employee/sar/";
		return api;
	},
	apiListReq: function() {
		var api = Host+"api/v1/employee/sar/get/";
		return api;
	},
	apiInReq: function() {
		var api = Host+"api/v1/employee/sar/";
		return api;
	},
	apiCutiHistory: function() {
		var api = Host+"api/v1/employee/cuti/history";
		return api;
	},
	apiCutiCount: function() {
		var api = Host+"api/v1/employee/count";
		return api;
	},
	apiCutiList: function() {
		var api = Host+"api/v1/employee/cuti/list";
		return api;
	},
	apiCutiSisa: function() {
		var api = Host+"api/v1/employee/cuti/sisa";
		return api;
	},
	apiCutiSubmit: function() {
		var api = Host+"api/v1/employee/cuti";
		return api;
	}
};
	/*function execute(url,id) {
		console.log("ID USER",id);
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"uid":id})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("API",responseJson);
			return responseJson;
		})
		.catch((error) => {
			console.error("ERROTmak==>",error);
		});
	
	}*/
export default Base;

