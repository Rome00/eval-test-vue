module.exports = {
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		'prettier/prettier': ['error'],
		'vue/singleline-html-element-content-newline': 0,
	},
}
