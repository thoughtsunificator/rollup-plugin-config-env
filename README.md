# rollup-plugin-config-env

Provide a way to inject environment variables into your application

## Getting started

### Installing

- ``npm install @thoughtsunificator/rollup-plugin-config-env --save-dev``

### Usage

- Create a ``data/config.json`` file.
- Create a ``.env.json`` file at the root of your project.

```javascript
import configEnv from '@thoughtsunificator/rollup-plugin-config-env'

export default {
	plugins: [
		configEnv
	]
}
```


``data/config.json``
```json
{
	"SITE_NAME": "FOO"
}
```

``.env.json``
```json
{
	"SITE_NAME": "BAR"
}
```

Within the context of your application:

```javascript
import config from ":config"

console.log(config)
/* outputs:
{
	SITE_NAME: "BAR"
}
*/

```


