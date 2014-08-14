
    var stage = new PIXI.Stage(0x00000000, true);
    //height and width of the canvas 
	var h = 650;
	var w = 420;
	//background picture height ( to scroll it !)
	var backgroundHeight = 799;
	var MusicOn = true;
    var Play=true;
    var Level2 = false;
	var renderer = PIXI.autoDetectRenderer(w, h, null);
    document.body.appendChild(renderer.view);
	requestAnimFrame( animate );
	
	//Photos of the main characters 
	var On = PIXI.Texture.fromImage("img/pause.png");
	var Off = PIXI.Texture.fromImage("img/play.png");

	var tmusicOn = PIXI.Texture.fromImage("img/soundon.png");
    var tmusicOff = PIXI.Texture.fromImage("img/soundoff.png");

	var tfighter = PIXI.Texture.fromImage("img/fighter.png");
	var tenemy   = PIXI.Texture.fromImage("img/alian.png");
	var tenemy2   = PIXI.Texture.fromImage("img/Level2Enemy.png");

   
    var tfloor   = [ PIXI.Texture.fromImage("img/floor/shmupBG_top.jpg"),
                     PIXI.Texture.fromImage("img/floor/shmupBG_mid.jpg"),
	                 PIXI.Texture.fromImage("img/floor/shmupBG_bot.jpg")			
				   ];
	


				   
	
    var tsky =  [    PIXI.Texture.fromImage("img/sky/cloudsFORE_bot.png"),
		             PIXI.Texture.fromImage("img/sky/cloudsFORE_top.png")];

    var tpewpew = PIXI.Texture.fromImage("img/PewPew.png");
    var texplode = PIXI.Texture.fromImage("img/EXPLODE.png");
    var Bom=[];
    for (var i = 1; i < 28; i++) {
	    	Bom.push(PIXI.Texture.fromImage("img/BOM/Bom("+i+").png"));
	    };
	var tevil = PIXI.Texture.fromImage("img/EvilPew.png");
    //Global Variables for the Sprite  (initialized in their functions)
    var floor =[];
    var Enemies=[];
    var Enemies2=[];
	var sky   =[];
	var PewPew=[];
	var ArrOfLives = [];
	var ship;
	var explodeEn=false;
	var exp = [];
	var EvilPew=[];
	var Lives = 3 ; 
    
    // Pew Enable flag ( changed in ship's mouse)
    var PewEn=false;
    var enableEnemies =true;

	createbackground();

	var scoreText = new PIXI.Text("0", "60px Arial", "white");
	scoreText.alpha=0.5;
	scoreText.position.x = w-10;
	scoreText.position.y = 15;
	scoreText.anchor.x=1;
	var loopingfloor = true;
	var loopingsky=true;

	stage.addChild(scoreText);
	createLives(380,100);
	createLives(380,130);
	createLives(380,160);
	createShip(230,300);
	createmusic(w-25,h-15);
		PlayandPauseGame(w-60,h-15);

	

    var TimerEnemy = 0 ; 
    var TimerEnemy2= 0 ; 
    var TimerEvil = 0 ; 
    var TimerPewPew = 0 ; 
    var TimerExplode = 0 ; 


    function killenemy (index){
                                score=score+10;
                                createBOM(Enemies[index].position.x,Enemies[index].position.y);

								stage.removeChild(Enemies[index]);
			                	Enemies.splice(index, 1);
    };
    function killenemy2 (index){
            if(Level2){
                                score=score+15;
                                createBOM(Enemies2[index].position.x,Enemies2[index].position.y);

								stage.removeChild(Enemies2[index]);
			                	Enemies2.splice(index, 1);
   } };
    

    function killevil (index){
								stage.removeChild(EvilPew[index]);
			                	EvilPew.splice(index, 1);
    };


    function createBOM(x,y){
    	var BomAnimie = new PIXI.MovieClip(Bom); 
    BomAnimie.position.x=x;
    BomAnimie.position.y=y;
    BomAnimie.scale.x=BomAnimie.scale.y=0.5;
    BomAnimie.anchor.x=BomAnimie.anchor.y=0.5;
    stage.addChild(BomAnimie);
    BomAnimie.loop=false;
    BomAnimie.play();
    BomAnimie.onComplete=function(){
    	stage.removeChild(BomAnimie);
    }

    }; 

    function createPewPew(x,y){
	    if(PewEn==true){

        PewPew.push(new PIXI.Sprite(tpewpew));

        PewPew[PewPew.length-1].anchor.x = 0.5;
	    PewPew[PewPew.length-1].anchor.y = 0.1;
	
	    PewPew[PewPew.length-1].position.x = x;
	    PewPew[PewPew.length-1].position.y = y-80;

		PewPew[PewPew.length-1].scale.x = PewPew[PewPew.length-1].scale.y = 0.5;
	    stage.addChild(PewPew[PewPew.length-1]);
        }}

        function createEnemy(x,y){
        	if(enableEnemies){
        Enemies.push(new PIXI.Sprite(tenemy));

        Enemies[Enemies.length-1].anchor.x = 0.9;
	    Enemies[Enemies.length-1].anchor.y = 0.9;
	
	    Enemies[Enemies.length-1].position.x = x;
	    Enemies[Enemies.length-1].position.y = y;

		Enemies[Enemies.length-1].scale.x = Enemies[Enemies.length-1].scale.y = 0.7;
	    stage.addChild(Enemies[Enemies.length-1]);
       }  

    }

        function createEnemy2(x,y){
        	        if(Level2){

        	if(enableEnemies){
        Enemies2.push(new PIXI.Sprite(tenemy2));

        Enemies2[Enemies2.length-1].anchor.x = 0.9;
	    Enemies2[Enemies2.length-1].anchor.y = 0.9;
	
	    Enemies2[Enemies2.length-1].position.x = x;
	    Enemies2[Enemies2.length-1].position.y = y;

		Enemies2[Enemies2.length-1].scale.x = Enemies2[Enemies2.length-1].scale.y = 0.7;
	    stage.addChild(Enemies2[Enemies2.length-1]);
       }  }

    }

	function createbackground () {
	
        for (var i=0; i < tfloor.length; i++){floor[i] = new PIXI.Sprite(tfloor[i]);
        	floor[i].position.y=backgroundHeight*i};	
	
	    for (var i=0; i < tsky.length; i++) {sky[i] = new PIXI.Sprite(tsky[i]);
	    	sky[i].position.y=(backgroundHeight+1)*i};
        
        for (var i=0; i < floor.length; i++) {stage.addChild(floor[i]);};	
	
	    for (var i=0; i < sky.length; i++) {stage.addChild(sky[i]);};	 }
        
	function createShip(x, y)
	{
		ship = new PIXI.Sprite(tfighter);

	    ship.setInteractive(true);		
		ship.anchor.x = 0.5;
		ship.anchor.y = 0.5;
		ship.scale.x = ship.scale.y = 0.75;
		ship.alpha = 0.9;
		ship.dragging=true;
        
	
		ship.mousedown = ship.touchstart = function(data)
		{
			PewEn=true;
		};
		
		// set the events for when the mouse is released or a touch is released
		ship.mouseup = ship.mouseupoutside = ship.touchend = ship.touchendoutside = function(data)
		{
			PewEn=false;
		};
        
        ship.mousemove = ship.touchmove = function(data)
        {   

        	if(Play){
            this.data = data;
			if(this.dragging)
			{   
                var newPosition = this.data.getLocalPosition(this.parent);
				this.position.x = newPosition.x;
				this.position.y = newPosition.y;
				
			}}
		}

		ship.position.x = x;
		ship.position.y = y;
		
		stage.addChild(ship);}
	
	function ShipHitsEnemy(){
	
				for (var j = 0; j < Enemies.length; j++) 
					{
						
						var distX =  Math.abs(ship.position.x - Enemies[j].position.x);
						var distY =  Math.abs(ship.position.y - Enemies[j].position.y);
						
						if(distX < 50 && distY < 50)	
						{

						   //do this createBOM(Enemies[j].position.x , Enemies.position.y);
							var position1 = Enemies[j].position.x;
							var position2  = Enemies[j].position.y;
							for (var i = Enemies.length - 1; i >= 0; i--){
                            killenemy(i); 							
                            };
                            for (var i = EvilPew.length - 1; i >= 0; i--){
                            killevil(i); 							
                            };
                            for (var i = Enemies2.length - 1; i >= 0; i--){
                            killenemy2(i); 							
                            };
                            EXPLODE(position1,position2);
                            Lives--;
                            stage.removeChild(ArrOfLives[Lives]);
                           
							break;
						}
					}

					        if(Level2){

					for (var j = 0; j < Enemies2.length; j++) 
					{
						
						var distX =  Math.abs(ship.position.x - Enemies2[j].position.x);
						var distY =  Math.abs(ship.position.y - Enemies2[j].position.y);
						
						if(distX < 50 && distY < 50)	
						{

						   //do this createBOM(Enemies[j].position.x , Enemies.position.y);
							var position1 = Enemies2[j].position.x;
							var position2  = Enemies2[j].position.y;
							for (var i = Enemies.length - 1; i >= 0; i--){
                            killenemy(i); 							
                            };
                            for (var i = EvilPew.length - 1; i >= 0; i--){
                            killevil(i); 							
                            };
							for (var i = Enemies2.length - 1; i >= 0; i--){
                            killenemy2(i); 							
                            };
    
                            
                            EXPLODE(position1,position2);
                            Lives--;
                            stage.removeChild(ArrOfLives[Lives]);
                           
							break;
						}
					}
				
}
for (var j = 0; j < EvilPew.length; j++) 
					{
						
						var distX =  Math.abs(ship.position.x - EvilPew[j].position.x);
						var distY =  Math.abs(ship.position.y - EvilPew[j].position.y);
						
						if(distX < 50 && distY < 50)	
						{

						   //do this createBOM(Enemies[j].position.x , Enemies.position.y);
							var position1 = EvilPew[j].position.x;
							var position2  = EvilPew[j].position.y;
							for (var i = Enemies.length - 1; i >= 0; i--){
                            killenemy(i); 							
                            };
                            for (var i = EvilPew.length - 1; i >= 0; i--){
                            killevil(i); 							
                            };
                            for (var i = Enemies2.length - 1; i >= 0; i--){
                            killenemy2(i); 							
                            };
                            EXPLODE(position1,position2);
                            Lives--;
                            stage.removeChild(ArrOfLives[Lives]);
                            
                          
							break;
						}
					}
				

	}
    function PewPewHitsEnemy(){

			for (var i = 0; i < PewPew.length; i++) 
				{
				for (var j = 0; j < Enemies.length; j++) 
					{
						
						var distX =  Math.abs(PewPew[i].position.x - Enemies[j].position.x);
						var distY =  Math.abs(PewPew[i].position.y - Enemies[j].position.y);
						
						if(distX < 50 && distY < 50 )	
						{

						   //do this createBOM(Enemies[j].position.x , Enemies.position.y);
							 stage.removeChild(PewPew[i]);
			                	PewPew.splice(i, 1);
			                	killenemy(j);
							
							i--;
							break;
						}
					}
				}

				        if(Level2){

				for (var i = 0; i < PewPew.length; i++) 
				{
				for (var j = 0; j < Enemies2.length; j++) 
					{
						
						var distX =  Math.abs(PewPew[i].position.x - Enemies2[j].position.x);
						var distY =  Math.abs(PewPew[i].position.y - Enemies2[j].position.y);
						
						if(distX < 50 && distY < 50 )	
						{

						   //do this createBOM(Enemies2[j].position.x , Enemies2.position.y);
							 stage.removeChild(PewPew[i]);
			                	PewPew.splice(i, 1);
			                	killenemy2(j);
							
							i--;
							break;
						}
					}
				}
			}}

			    function moveEnemies(){


				    for (var i = Enemies.length - 1; i >= 0; i--) {
				            Enemies[i].position.y =  Enemies[i].position.y+2;
				            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				            Enemies[i].position.x =  Enemies[i].position.x+ plusOrMinus*0.8;
			                if(Enemies[i].position.y >h+100){
			                	stage.removeChild(Enemies[i]);
			                	Enemies.splice(i, 1);
			                }
				            }; 

    }

     function moveEnemies2(){

        if(Level2){

				    for (var i = Enemies2.length - 1; i >= 0; i--) {
				            Enemies2[i].position.y =  Enemies2[i].position.y+2;
				            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				            Enemies2[i].position.x =  Enemies2[i].position.x+ plusOrMinus*0.8;
			                if(Enemies2[i].position.y >h+100){
			                	stage.removeChild(Enemies2[i]);
			                	Enemies2.splice(i, 1);
			                }}
				            } 

    }

 function moveEvilPew(){
                  for (var i = EvilPew.length - 1; i >= 0; i--) {
				            EvilPew[i].position.y =  EvilPew[i].position.y+1;
				            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				            EvilPew[i].position.x =  EvilPew[i].position.x+ plusOrMinus*0.8;
			                EvilPew[i].scale.x = EvilPew[i].scale.y = 1 +plusOrMinus*Math.random()*0.1;

			                if(EvilPew[i].position.y >h+100){
			                	stage.removeChild(EvilPew[i]);
			                	EvilPew.splice(i, 1);
			                }
				            };    	
    }

    function movePewPew(){for (var i = PewPew.length - 1; i >= 0; i--) {
	            PewPew[i].position.y =  PewPew[i].position.y-10;
	             if(PewPew[i].position.y <-50){
                	stage.removeChild(PewPew[i]);
                	PewPew.splice(i, 1);
                }};
    };



        function createEvilPew(x,y){
        	if(enableEnemies){
        EvilPew.push(new PIXI.Sprite(tevil));

        EvilPew[EvilPew.length-1].anchor.x = 0.5;
	    EvilPew[EvilPew.length-1].anchor.y = 0.5;
	
	    EvilPew[EvilPew.length-1].position.x = x;
	    EvilPew[EvilPew.length-1].position.y = y;

		EvilPew[EvilPew.length-1].scale.x = EvilPew[EvilPew.length-1].scale.y = 0.4;
	    stage.addChild(EvilPew[EvilPew.length-1]);
       
       }  

    }


function updateBackground(){
for (var i = floor.length-1; i >=0; i--) {
	             floor[i].position.y =  floor[i].position.y-5;
	             if(loopingfloor==true){
	             if((floor[floor.length-1].position.y <= -(backgroundHeight-h)) ){
	             	for (var i = 0; i < floor.length-1; i++) {
                     floor[i].position.y=backgroundHeight*i+h;
                      loopingfloor=false;
	             	}}}
	            if(floor[floor.length-1].position.y<= -backgroundHeight){
	             	floor[floor.length-1].position.y = floor[0].position.y+(floor.length-1)*(backgroundHeight)-10;
	             	loopingfloor=true;
	             }
	             
	            }

for (var i = sky.length-1; i >=0; i--) {
	             sky[i].position.y =  sky[i].position.y-2;
	             if(loopingsky==true){
	             if((sky[sky.length-1].position.y <= -((backgroundHeight+1)-h)) ){
	             	for (var i = 0; i < sky.length-1; i++) {
                     sky[i].position.y=(backgroundHeight+1)*i+h;
                      loopingsky=false;
	             	}}}
	            if(sky[sky.length-1].position.y<= -(backgroundHeight+1)){
	             	sky[sky.length-1].position.y = sky[0].position.y+(sky.length-1)*(backgroundHeight+1)-5;
	             	loopingsky=true;
	             }
	             
	            }
};
    
	     
    function EXPLODE(x,y){
    	exp.push(new PIXI.Sprite(texplode));

		exp[exp.length-1].anchor.x = 0.5;
		exp[exp.length-1].anchor.y =  0.5;
		exp[exp.length-1].scale.x = 0;
		exp[exp.length-1].scale.y =  0;
		exp[exp.length-1].position.x = x ;
		exp[exp.length-1].position.y = y ; 
		exp[exp.length-1].alpha = 0.9;
		stage.addChild(exp[exp.length-1]);
     	enableEnemies = false;

	 


    }

    function ExplodeSpread(){
     for (var i = exp.length - 1; i >= 0; i--) {
     	exp[i].scale.x+=0.25;
     	exp[i].scale.y+=0.25;
        exp[i].alpha-=0.05;

     if ( exp[i].scale.x >= 6){
     	stage.removeChild(exp[i]);
     	exp.splice(i,1);
     	enableEnemies = true;
     	 if(Lives== 0 ){ 
     	 	Play=false;
     	 	stage.removeChild(ship);
     	 Creategameover();

     	   }
     }
     }
    };

    function Creategameover(){
        var gameoverPhoto = new PIXI.Sprite(PIXI.Texture.fromImage("img/gameover.jpg"));

        gameoverPhoto.anchor.x = 0.5;
	    gameoverPhoto.anchor.y = 0.5;
	
	    gameoverPhoto.position.x = w/2;
	    gameoverPhoto.position.y = h/2;
         
		gameoverPhoto.scale.x = gameoverPhoto.scale.y = 0.75;
		gameoverPhoto.setInteractive(true);

		gameoverPhoto.mousedown = gameoverPhoto.touchstart = function(data)
		{  stage.removeChild(gameoverPhoto);

			          window.location.reload();

		};
	    stage.addChild(gameoverPhoto);
        }

    function createLives(x,y){

        ArrOfLives.push(new PIXI.Sprite(tevil));

        ArrOfLives[ArrOfLives.length-1].anchor.x = 0.5;
	    ArrOfLives[ArrOfLives.length-1].anchor.y = 0.5;
	
	    ArrOfLives[ArrOfLives.length-1].position.x = x;
	    ArrOfLives[ArrOfLives.length-1].position.y = y;

		ArrOfLives[ArrOfLives.length-1].scale.x = ArrOfLives[ArrOfLives.length-1].scale.y = 1;
	    stage.addChild(ArrOfLives[ArrOfLives.length-1]);
        }
      

      function createmusic(x,y){

        var musicpress = new PIXI.Sprite(tmusicOff);

        musicpress.anchor.x = 0.5;
	    musicpress.anchor.y = 0.5;
	
	    musicpress.position.x = x;
	    musicpress.position.y = y;
         
		musicpress.scale.x = musicpress.scale.y = 0.2;
		musicpress.setInteractive(true);

		musicpress.mousedown = musicpress.touchstart = function(data)
		{   if(MusicOn){
				this.setTexture(tmusicOn);
				music.pause();
							MusicOn=false;
}
				else{
this.setTexture(tmusicOff);
				music.play();
				MusicOn=true;

				}
		};
	    stage.addChild(musicpress);
        }


            function PlayandPauseGame(x,y){

        var pressHere = new PIXI.Sprite(On);

        pressHere.anchor.x = 0.5;
	    pressHere.anchor.y = 0.5;
	
	    pressHere.position.x = x;
	    pressHere.position.y = y;
         
		pressHere.scale.x = pressHere.scale.y = 0.2;
		pressHere.setInteractive(true);

		pressHere.mousedown = pressHere.touchstart = function(data)
		{   if(Play){
				this.setTexture(Off);
				Play=false;
}
				else{
this.setTexture(On);
				Play=true;

				}
		};
	    stage.addChild(pressHere);
        }
	      

	       function CreateLevel2(){
         var L2 = new PIXI.Sprite(PIXI.Texture.fromImage("img/newlevel.png"));

        L2.anchor.x = 0.5;
	    L2.anchor.y = 0.5;
	
	    L2.position.x = w/2;
	    L2.position.y = h/2;
         
		L2.scale.x = L2.scale.y = 0.75;
		L2.setInteractive(true);
           L2.mousedown = L2.touchstart = function(data){
	           stage.removeChild(L2);
              for (var i = floor.length - 1; i >= 0; i--) {
	            	floor[i].setTexture(new PIXI.Texture.fromImage("img/bg.jpg"));
	                                                     };
	                Play=true;


}
	    stage.addChild(L2);
        }

	function animate() {
	    requestAnimFrame( animate );
	    	    updateBackground();

	   if(Play){
	    PewPewHitsEnemy();
	    ShipHitsEnemy();
        movePewPew();
	    moveEnemies();
	    moveEnemies2();
	    moveEvilPew();
        TimerEnemy++;
        TimerEnemy2++;

        TimerExplode++;
        TimerEvil++;
        TimerPewPew++;

        if(TimerEnemy == 100){
        	createEnemy(Math.random()*(w+1),0);
        	TimerEnemy=0;
        }

        if(TimerEnemy2 == 80){
        	createEnemy2(Math.random()*(w+1),0);
        	TimerEnemy2=0;
        }

        
        if(TimerEvil == 200){
        	createEvilPew(Math.random()*(w+1),0);
        	TimerEvil=0;
        }
         if(TimerPewPew == 5){
          createPewPew(ship.position.x,ship.position.y); 
          TimerPewPew=0;   
              }
        if(TimerExplode == 3){
          ExplodeSpread(); 
          TimerExplode=0; 
              }

	}
	if(Level2==false){
	if(score >=1000){
		Level2=true;
		Play=false;
        CreateLevel2();

             
		

	}}
        scoreText.setText(" "+score+" ");    
	    renderer.render(stage);}
