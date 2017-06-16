# postcss-font-filter

filter font by css

# Example
- postcss.config.js
``` javascript
module.exports = {
  plugins: [
    require('postcss-font-filter')({
        filter: type => type === 'woff2'
        // woff2: true
    })
  ]
}
```
- before css
```

```

