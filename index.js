var postcss = require('postcss')
const defaultConfig = {
    'embedded-opentype': true,
    'woff2': true,
    'woff': true,
    'truetype': true,
    'svg': true,
    'ie9': true
}

module.exports = postcss.plugin('postcss-font-filter', function(option) {
    const opt = option || defaultConfig
    return function (root) {
        root.walkAtRules('font-face', rule => {
            rule.each(node => {
                if (node.prop === 'src'){
                    if (node.value.indexOf('format(') > -1){
                        font_arr = node.value.split(/ *, */)
                        font_arr = font_arr.filter(i => {
                            const formatType = i.substring(i.indexOf('format(') + 8, i.lastIndexOf(')') - 1)
                            if (opt.filter && typeof opt.filter === 'function'){
                                return opt.filter(formatType)
                            } else {
                                return opt[formatType]
                            }
                        })
                        if (font_arr.length > 0) {
                            node.value = font_arr.join(', ')
                        } else {
                            node.remove()
                        }
                    } else if(!opt.ie9) {
                        node.remove()
                    }
                }
            })
        })
    }
})