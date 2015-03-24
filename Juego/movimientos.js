function mover(pl,vel,colClass){
	//Variables de colision -- cols es el objeto que devuelve la función
	/*var cols = {
		colN : false,
		colNE : false,
		colE : false,
		colSE : false,
		colS : false,
		colSW : false,
		colW : false,
		colNW :false
	};*/
	var cols = buscaColisiones(null,vel,pl,colClass);
	//var pl = $("#player");
	var posPl = pl.position();
	var plLeft=posPl.left,
		plTop = posPl.top;
	
	/*if (keys[UPKEY] == true){
		plTop = plTop - vel;
	}
	if (keys[DOWNKEY] == true){
		plTop = plTop + vel;
	}*/
	if (keys[LEFTKEY] == true && cols.colW == false){
		plLeft = plLeft - vel;
	}
	if (keys[RIGHTKEY] == true && cols.colE == false){
		plLeft = plLeft + vel;
	}
	/*if (cols.colS == false){
		plTop = plTop + vel;
	}*/
	pl.css({"left":plLeft,
			"top":plTop});
	return cols;
}

function buscaColisiones(cols,dist,pl, colClass){
	if (cols == null) {
		var cols = {
		colN : false,
		colNE : false,
		colE : false,
		colSE : false,
		colS : false,
		colSW : false,
		colW : false,
		colNW :false
	};
	}
	var pant = $("#pantalla");
	var pantPos = pant.offset();
	//var pl = $("#player");
	var plPos = pl.offset();
	var objs = $(colClass);
	var objsLen = objs.length;
	var obj;
	for(var i = 0;i<objsLen;i++){
		obj = objs;
		obj[0] = objs[i];
		var objPos = obj.offset();
		
		var plRpos = plPos.left + pl.width();
		var objRpos = objPos.left + obj.width();
		var plDpos = plPos.top + pl.height();
		var objDpos = objPos.top + obj.height();
		//Algo a los lados?
		if(plPos.top >= objPos.top && plPos.top <= objDpos ||
			plDpos >= objPos.top && plDpos <= objDpos){
			//Algo a la derecha?
			if(plRpos + dist >= objPos.left && plPos.left < objPos.left ||
				plRpos + dist >= pantPos.left + pant.width()){
				cols.colE = true;
			}
			//Algo a la izquierda?
			if(plRpos > objRpos && plPos.left - dist <= objRpos ||
				plPos.left - dist <= pantPos.left){
				cols.colW = true;
			}
		}
		
		//Algo arriba o abajo?(EDITAR)
		if(plPos.left >= objPos.left && plPos.left <= objRpos ||
			plRpos >= objPos.left && plRpos <= objRpos){
			//Algo abajo?
			if(plDpos + dist >= objPos.top && plPos.top < objPos.top ||
				plDpos + dist >= pantPos.top + pant.height()){
				cols.colS = true;
				isFalling = false;
			}
			//Algo arriba?
			if(plDpos > objDpos && plPos.top - dist <= objDpos ||
				plPos.top - dist <= pantPos.top){
				cols.colN = true;
				pl.stop();
				//isJumping = false;
				if (cols.colS == false){
					isFalling = true;
				}
			}
		}
	}
	return cols;
}