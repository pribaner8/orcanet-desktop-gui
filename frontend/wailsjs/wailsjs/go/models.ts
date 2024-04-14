export namespace backend {
	
	export class Activity {
	    id: number;
	    name: string;
	    size: string;
	    hash: string;
	    status: string;
	    showDropdown: boolean;
	    peers: number;
	
	    static createFrom(source: any = {}) {
	        return new Activity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.size = source["size"];
	        this.hash = source["hash"];
	        this.status = source["status"];
	        this.showDropdown = source["showDropdown"];
	        this.peers = source["peers"];
	    }
	}

}

