const fs = require("fs")

module.exports = config => {

	const { envPath = ".env.json", configPath = "data/config.json" } = config

	return {
		name: 'config',
		resolveId ( source ) {
			if(source === ":config") {
				return source
			}
			return null;
		},
		buildStart(){
			if (fs.existsSync(envPath)) {
				this.addWatchFile(envPath)
			}
			if (fs.existsSync(configPath)) {
				this.addWatchFile(configPath)
			}
		},
		load ( id ) {
			if(id === ":config") {
				let envFile
				if (fs.existsSync(envPath)) {
					try {
						let data = fs.readFileSync(envPath);
						envFile = JSON.parse(data)
					} catch(ex) {
						console.error(ex)
					}
				} else {
					envFile = {}
				}
				let configFile
				if (fs.existsSync(configPath)) {
					try {
						let data = fs.readFileSync(configPath);
						configFile = JSON.parse(data)
					} catch(ex) {
						console.error(ex)
					}
				} else {
					configFile = {}
				}
				const config = {}
				for(const key in configFile) {
					config[key] = configFile[key]
				}
				for(const key in envFile) {
					config[key] = envFile[key]
				}
				const processEnvKeys = Object.keys(config).filter(key => key in process.env)
				for(const key of processEnvKeys) {
					config[key] = process.env[key]
				}
				return `export default ${JSON.stringify(config)}`
			}
			return null;
		}
	}
}
