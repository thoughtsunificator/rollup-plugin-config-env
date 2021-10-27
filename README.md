# rollup-plugin-config-env

Provide a way to inject environment variables into your application.

## Getting started

### Installing

- ``npm install @thoughtsunificator/rollup-plugin-config-env --save-dev``

### How does it work?

rollup-plugin-config-env will create a new object from the config file, env file and ``process.env``.

Order of priority:

1. process.env
2. env file
3. config file

### Usage

```javascript
import configEnv from '@thoughtsunificator/rollup-plugin-config-env'

export default {
  plugins: [
    configEnv({ envPath: ".env.json", configPath: "data/config.json" })
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


