const BASE_URL = "https://vpn.liuls.us/v2/";

function setCookie(key, value, remember = true){
	if(remember){
		const d = new Date();
		d.setTime(d.getTime() + (30*24*60*60*1000));
		let expires = 'expires=' + d.toUTCString();
		document.cookie = key + '=' + value + ';' + expires + ';path=/';
	}else{
		document.cookie = key + '=' + value + ';path=/';
	}
}

function getCookie(key) {
	let name = key + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

function deleteCookie(key){
	document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function logout(){
	deleteCookie('username')
	console.log('logout')
	refresh()
}

function refresh() {
    window.location.reload()
}


function homePage() {
    window.location.href = '/'
}

function currentPage(){
	return window.location.href
}

function selectMode() {
    window.location.href = '/mode'
}

function quizPage() {
    window.location.href = '/quiz'
}

function learnPage() {
	window.location.href = '/selectChapter'
}


function redirect(url) {
    window.location.href = url
}

function getQueryParam(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}