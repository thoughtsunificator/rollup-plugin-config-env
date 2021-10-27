const { createConfig } = require("@thoughtsunificator/config-env")

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
				const config = createConfig(envPath, configPath)
				return `export default ${JSON.stringify(config)}`
			}
			return null;
		}
	}
}
