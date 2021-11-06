var jaxxx = '',
	jaxlist = '',
	veri = '',
	title = '',
	responseText = '',
	ust = '',
	jaxhtml = '',
	degisken = '',
	aramaiss = '',
	aramais = '',
	xhttp = new XMLHttpRequest(),
	projeid = window.location.hostname,
	req = new XMLHttpRequest();

if (projeid == 'localhost') {
	projeid = 'webyapar.com';
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
db.settings({ timestampsInSnapshots: false });

// modulisle
function modulisle(yeri, sayfa) {
	document.getElementById(yeri).innerHTML = '';
	db.collection('sayfa').where('proje', '==', projeid).where('url', '==', sayfa).get().then((snapshot) => {
		var yerim = '';
		snapshot.docs.forEach((doc) => {
			var modul = doc.data();
			for (devam in modul['modul'][yeri]) {
				if (modul['modul'][yeri][devam]) {
					db.doc('modul/' + modul['modul'][yeri][devam]).get().then(function(doc) {
						var moduls = doc.data();
						if (moduls) {
							yerim = yerim + modulcek(moduls['modul'], moduls);
							db.doc('domain/' + projeid).get().then(function(doc) {
								var projeDate = doc.data();
								for (devamm in projeDate) {
									yerim = yerim.replace(new RegExp('@' + devamm + '@', 'g'), projeDate[devamm]);
								}
								db.doc('domain/' + projeid).get().then(function(doc) {
									userDate = doc.data();
									for (devamm in userDate) {
										yerim = yerim.replace(new RegExp('@' + devamm + '@', 'g'), userDate[devamm]);
									}
									document.getElementById(yeri).innerHTML = yerim;
									if (yeri == 'alt') {
										setTimeout(function() {
											matrix();
										}, 100);
										document.getElementById('loader').style.display = 'none';
									}
								});
							});
						}
					});
				}
			}
		});
	});
}

//  htmlcek ---------------------------------------

function htmlcek(url) {
	aramais = '';
	var shttp = new XMLHttpRequest();
	shttp.open('GET', url, false);
	shttp.send();
	return shttp.responseText;
}

//  modulaktif ---------------------------------------

if (window.location.pathname.split('/')[2]) {
	var sayfa = window.location.pathname.split('/')[2];
}
else {
	var sayfa = 'anasayfa';
}

modulisle('ust', sayfa);

if (window.location.pathname.split('/')[3]) {
	modulisle('orta', window.location.pathname.split('/')[3]);
}
else {
	modulisle('orta', sayfa);
}

modulisle('alt', sayfa);

//  modulcek ---------------------------------------

function modulcek(params, arama) {
	aramais = '';
	var shttp = new XMLHttpRequest();
	shttp.open('GET', '/modul/' + params + '/index.html', false);
	shttp.send();
	responseText = shttp.responseText;

	var css = document.createElement('link');
	css.href = '/modul/' + params + '/css.css?id=' + Math.floor(Math.random() * 10000);
	css.rel = 'stylesheet';
	document.body.appendChild(css);

	jsgetir('/modul/' + params + '/js.js');

	if (arama['for']) {
		for (devam in arama['for']) {
			var is = matrixbul(responseText, 'is{', '}is');
			for (devams in arama['for'][devam]) {
				is = is.replace(new RegExp('{{' + devams + '}}', 'g'), arama['for'][devam][devams]);
			}
			aramais = aramais + is;
		}
		responseText = responseText.replace(new RegExp('#for#', 'g'), aramais);
	}

	var functionis = matrixbul(responseText, 'fuis{', '}fuis');
	if (functionis) {
		responseText = responseText.replace(new RegExp('fuis{' + functionis + '}fuis', 'g'), '');
	}

	var jsgo = matrixbul(responseText, 'js{', '}js');
	if (jsgo) {
		responseText = responseText.replace(new RegExp('js{' + jsgo + '}js', 'g'), '');
		setTimeout(function() {
			var jsgoo = document.createElement('script');
			jsgoo.src = '/modul/' + params + '/js.js';
			document.body.appendChild(jsgoo);
		}, 1000);
	}

	return responseText;
}

function jsgetir(params) {
	var script = document.createElement('script');
	script.src = params + '?id=' + Math.floor(Math.random() * 10000);
	document.body.appendChild(script);
}

// matrixbul ---------------------------------------

function matrixbul(str, a, b) {
	var sonuc = '';
	var n = str.search(a) + a.length;
	var m = str.search(b);
	if (n > 0 && m > 0) {
		str = str.slice(n, m);
		if (str == 'undefined') {
			sonuc = '';
		}
		else {
			sonuc = str;
		}
	}
	return sonuc;
}

// initMap ---------------------------------------

function initMap() {
	const cairo = { lat: 30.064742, lng: 31.249509 };
	const map = new google.maps.Map(document.getElementById('map'), {
		scaleControl : true,
		center       : cairo,
		zoom         : 10
	});
	const infowindow = new google.maps.InfoWindow();
	infowindow.setContent('<b>ssssssdd</b>');
	const marker = new google.maps.Marker({ map, position: cairo });
	marker.addListener('click', () => {
		infowindow.open(map, marker);
	});
}

function animas1(params) {
	params.style.background = '#f00';
	params.style.color = '#fff';
	setTimeout(function() {
		params.style.background = '#fff';
		params.style.color = '#000';
		setTimeout(function() {
			params.style.background = '#f00';
			params.style.color = '#fff';
			setTimeout(function() {
				params.style.background = '#fff';
				params.style.color = '#000';
			}, 300);
		}, 300);
	}, 300);
}

//slider kayan -----------------------------------------

function sliderkayan(id) {
	var swiper = new Swiper('.swiper' + id, {
		slidesPerView : 5,
		spaceBetween  : 5,
		loop          : true,
		breakpoints   : {
			1024 : { slidesPerView: 5 },
			820  : { slidesPerView: 4 },
			615  : { slidesPerView: 3 },
			410  : { slidesPerView: 2 },
			205  : { slidesPerView: 1 },
			0    : { slidesPerView: 1 }
		},
		navigation    : {
			nextEl : '.next' + id,
			prevEl : '.prev' + id
		}
	});
}

function sliderkayan3(id) {
	var swiper = new Swiper('.swiper' + id, {
		slidesPerView : 5,
		spaceBetween  : 5,
		loop          : true,
		breakpoints   : {
			615 : { slidesPerView: 3 },
			410 : { slidesPerView: 2 },
			205 : { slidesPerView: 1 },
			0   : { slidesPerView: 1 }
		},
		navigation    : {
			nextEl : '.next' + id,
			prevEl : '.prev' + id
		}
	});
}

function sliderust(id) {
	var swiper = new Swiper('.slider' + id, {
		autoplay      : {
			delay : 2000
		},
		slidesPerView : 1,
		spaceBetween  : 0,
		grabCursor    : true,
		pagination    : {
			el        : '.swiper-pagination',
			clickable : true
		}
	});
}

function signUp() {
	var mail = document.getElementById('mail');
	var password = document.getElementById('password');
	firebase.auth().createUserWithEmailAndPassword(mail.value, password.value).then((auth) => {
		console.log(auth);
		db.collection('user').doc(auth['user']['uid']).set({
			email : auth['user']['email'],
			uid   : auth['user']['uid']
		});
	});
}

// aaa = 'ssssssss';
// firebase.auth().onAuthStateChanged(function(user) {
// 	console.log('Signed in user!' + aaa);
// 	aaa = 'xxxxxx';
// });

function facebook() {
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			var credential = result.credential;
			var user = result.user;
			var accessToken = credential.accessToken;
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
}

function google() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			console.log('result.user');

			var token = result.credential.accessToken;
			var user = result.user;
			db.collection('user').doc(user['uid']).set({
				email    : user['email'],
				uid      : user['uid'],
				photoURL : user['photoURL'],
				token    : token
			});
			this.setState({ user: user });
			this.props.history.push('/add');
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
}

function cookingx(params) {
	document.getElementById('cooking').style.display = 'none';
}

function listpla(p1, p2, s) {
	var ppla = document.createElement('P');
	if (s == '2') {
		ppla.innerHTML = p2;
	}
	else {
		ppla.innerHTML = document.getElementById(p2).innerHTML;
	}
	document.getElementById(p1).appendChild(ppla);
}

db.collection('domain').where('proje', '==', projeid).get().then((snapshot) => {
	snapshot.docs.forEach((doc) => {
		veri = doc.data();
		for (devam in veri) {
			if (document.getElementById(devam)) {
				if (document.getElementById(devam).tagName == 'IMG') {
					document.getElementById(devam).src = '/img/' + veri[devam];
				}
				else {
					document.getElementById(devam).innerHTML = veri[devam];
				}
			}
		}
		document.title = veri['title'];
	});
});

setTimeout(function() {
	document.getElementById('loader').style.display = 'none';
}, 1000);
