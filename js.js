$(document).ready(function(){
newGame();


function newGame(){
    
    count = 200;
    inGame = true;
    countdown();
    var list=$(".side"),
        counter=0;

    for(var i=0;i<list.length;i++){
        
        var temp=0,
            str=[],
            inds=[];

        list[i].flag="ok";
        list[i].index=i;

        list[i].onclick=function(){

            if(this.flag===null){
                console.log("flagNULL");
                this.onclick=function(){};
            }
            else{

               temp++;
               str[temp]=this.innerHTML;
               inds[temp]=this.index;
               
               if(this.flag==="ok"){

                  $(this).css("transform"," rotateY(180deg)");
                   this.flag="error";

                }else if(this.flag==="error"){
                  $(this).css("transform"," rotateY(0deg)");
                  this.flag="ok";
                }

               
               if(temp===2){
                    //console.log("index1: "+inds[1]);
                    //console.log("index2: "+inds[2]);
                    //console.log(str[1]);
                    if(str[1]!==str[2] || inds[1]===inds[2]){
                        setTimeout(function(){
                               
                            $(list[inds[1]]).css("transform"," rotateY(0deg)");
                            $(list[inds[2]]).css("transform"," rotateY(0deg)");
                             temp=0;
                          
                        },500);
                    
                        list[inds[1]].flag="ok";
                        list[inds[2]].flag="ok";

                     }else{
                            counter+=2;
                            list[inds[1]].flag=null;
                            list[inds[2]].flag=null;

                            if(counter===list.length){
                                alert("congradulations！You win! And that's all for this Game!");
                                document.getElementById('time').innerHTML = "You won!";
                                inGame =false;
                            }
                            temp=0;
                    }
                
               }
             }
          };
      
    }
    }
    
    
 //Timer
    var count = 300;
    var inGame = true;
    
    
    function countdown(){
    displayTime(); 
    if (count === 0) {
      inGame = false;
    } else if (inGame) {
      setTimeout(countdown, 100);
      count--;
    } else {
      setTimeout(countdown, 100); 
    }
}
    
    function displayTime() {
  var tenths = count;  
  var timeLeft = Math.floor(tenths / 10);
  document.getElementById('time').innerHTML = "Time: " + timeLeft;
  if (timeLeft < 1 && inGame){
     alert("Time's up! Try again!");
     inGame =false;
     location.reload();
  }
}

 });