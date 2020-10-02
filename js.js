class Game {
	constructor(schwere, ctrlSenso1, ctrlSenso2, ctrlSenso3, ctrlSenso4, ctrlAudio1, ctrlAudio2, ctrlAudio3, ctrlAudio4, ctrlZug, ctrlPunkte) {
		this.schwere = schwere;
		this.ctrlSenso1 = ctrlSenso1;
		this.ctrlSenso2 = ctrlSenso2;
		this.ctrlSenso3 = ctrlSenso3;
		this.ctrlSenso4 = ctrlSenso4;
		this.ctrlAudio1 = ctrlAudio1;
		this.ctrlAudio2 = ctrlAudio2;
		this.ctrlAudio3 = ctrlAudio3;
		this.ctrlAudio4 = ctrlAudio4;
		this.ctrlZug = ctrlZug;
		this.ctrlPunkte = ctrlPunkte;
		this.punkte = 0;
		this.zug = 0;
		this.verloren = false;
		this.sensoListe = [];
		this.spielerListe = [];
		this.interval = 0;
		this.modus = 0;
		this.zugWir();
	}

	changeToModus(modus) {
		this.modus = modus;
        if (modus == 1) {
            this.ctrlZug.classList.remove('verloren');
            this.ctrlZug.classList.remove('zugPlayer');
            this.ctrlZug.classList.add('zugSenso');
            this.ctrlZug.innerHTML = "Senso's Zug";
        } else if (modus == 2) {
            this.zug = 0;
            this.ctrlZug.classList.remove('verloren');
            this.ctrlZug.classList.remove("zugSenso");
            this.ctrlZug.classList.add("zugPlayer");
            this.ctrlZug.innerHTML = "Dein Zug";
        } else if (modus == 0) {
            this.zug = 0;
            this.ctrlZug.classList.remove("zugPlayer");
            this.ctrlZug.classList.remove("zugSenso");
            this.ctrlZug.classList.add('verloren');
            this.ctrlZug.innerHTML = "Spiel verloren";
        } else {
            this.ctrlZug.classList.remove = "zugPlayer";
            this.ctrlZug.classList.remove = "zugSenso";
            this.ctrlZug.innerHTML = "Neues Spiel";
        }
	}

	clickSenso(senso) {
		if (this.modus != 2) {
			return;
		}
		if (senso == this.sensoListe[this.zug]) {
			console.log("Richtig geclickt");
			this.zug = this.zug + 1;
			this.punkte = this.punkte + this.zug;
            this.updatePunkte();
            this.playSenso_Start(senso);
            setTimeout(() => {this.playSenso_Stop(senso);}, 250);
			// Letzter Zug?
			if (this.zug == this.sensoListe.length) {
                setTimeout(() => {this.zugWir();}, 500);
				//this.zugWir();
			}
		} else {
			this.changeToModus(0);
		}
	}

	getSensoAnzeige(senso) {
		if (senso == 1) {
			return this.ctrlSenso1;
		}
		if (senso == 2) {
			return this.ctrlSenso2;
		}
		if (senso == 3) {
			return this.ctrlSenso3;
		}
		if (senso == 4) {
			return this.ctrlSenso4;
		}
		return undefined;
	}

	getSensoTon(senso) {
		if (senso == 1) {
			return this.ctrlAudio1;
		}
		if (senso == 2) {
			return this.ctrlAudio2;
		}
		if (senso == 3) {
			return this.ctrlAudio3;
		}
		if (senso == 4) {
			return this.ctrlAudio4;
		}
		return undefined;
	}

	playSenso_Start(senso) {
		var ctrlAnzeige = this.getSensoAnzeige(senso);
		var ctrlAudio = this.getSensoTon(senso);
		ctrlAnzeige.classList.add("active");
		ctrlAudio.play();
	}

	playSenso_Stop(senso) {
		var ctrlAnzeige = this.getSensoAnzeige(senso);
		var ctrlAudio = this.getSensoTon(senso);
		ctrlAnzeige.classList.remove("active");
		ctrlAudio.pause();
		ctrlAudio.currentTime = 0;
	}

	setGameInterval() {
		var div = Math.floor(this.sensoListe.length / 5);
        var interval = (4 - this.schwere) * 400 * 0.9 ** div;
        if (interval < 250) {interval = 250;}
		this.interval = interval;
	}

	updatePunkte() {
		this.ctrlPunkte.innerHTML = this.punkte;
	}

	// Wir sind am Zug
	zugWir() {
		this.changeToModus(1);
		this.setGameInterval();
		// Neuen Ton ausdenken, abspeichern
		var iNeu = Math.floor(Math.random() * 4) + 1;
		this.sensoListe.push(iNeu);
		console.log("Neu festgelegt: " + iNeu + " => " + this.sensoListe);
		// Unsere gesamten Töne abspielen
		this.zugWir_PlayList();
		// Zug übergeben an Spieler
		setTimeout(() => {
			this.zugWir_Finished();
		}, this.sensoListe.length * this.interval);
	}

	zugWir_Finished() {
		this.changeToModus(2);
	}

	zugWir_PlayList() {
		for (var i = 0; i < this.sensoListe.length; i++) {
			let merken = this.sensoListe[i];
			let interval1 = this.interval * i;
			let interval2 = this.interval * (i + 1);
			console.log("zugWir_PlayList(" + merken + "): Setze Start " + this.sensoListe[i] + " auf " + interval1 + " und Stop auf " + interval2);
			console.log(this);
			//setTimeout(() => {this.playSenso_Start(merken);}, this.interval);
			//setTimeout(() => {this.playSenso_Stop(merken);},  (this.interval * (i + 1)));
			setTimeout(() => {
				this.playSenso_Start(merken);
			}, interval1);
			setTimeout(() => {
				this.playSenso_Stop(merken);
			}, interval2);
		}
	}
}
