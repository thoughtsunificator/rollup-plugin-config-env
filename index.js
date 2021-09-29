const fs = require("fs")

module.exports = {
	name: 'config',
	resolveId ( source ) {
		if(source === ":config") {
			return source
		}
		return null;
	},
	buildStart(){
		if (fs.existsSync('.env.json')) {
			this.addWatchFile('.env.json')
		}
		if (fs.existsSync('data/config.json')) {
			this.addWatchFile('data/config.json')
		}
	},
	load ( id ) {
		if(id === ":config") {
			let envFile
			if (fs.existsSync('.env.json')) {
				try {
					let data = fs.readFileSync('.env.json');
					envFile = JSON.parse(data)
				} catch(ex) {
					console.error(ex)
				}
			} else {
				envFile = {}
			}
			let configFile
			if (fs.existsSync('data/config.json')) {
				try {
					let data = fs.readFileSync('data/config.json');
					configFile = JSON.parse(data)
				} catch(ex) {
					console.error(ex)
				}
			} else {
				configFile = {}
			}
			let config = {}
			for(const key in configFile) {
				config[key] = configFile[key]
			}
			for(const key in envFile) {
				if(key in process.env) {
					config[key] = process.env[key]
				} else {
					config[key] = envFile[key]
				}
			}
			return `export default ${JSON.stringify(config)}`
		}
		return null;
	}
}
