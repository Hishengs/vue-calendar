import Vue from 'Vue'
import App from './components/App.vue'

new Vue({
	el: '#app',
	render: h => h(App),
	template : '<App/>',
	components: {
		App: App
	}
})