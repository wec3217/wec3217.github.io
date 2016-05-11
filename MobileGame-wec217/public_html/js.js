$(document).ready(function(){
    var availablePic=[1, 2, 3, 4, 5, 6, 7, 8, 9];

$("#restartButton").click(function () {
    newGame();
    document.getElementById('restartButton').disabled = true;
    document.getElementById('restartButton').style.backgroundColor="#92C7C7";
    });


function loadGrid(){
    //console.log(availablePic);
    var newArray=[];
    var randNum=Math.floor((Math.random() * 8) + 0);
    var counter=0;
    //popoulate the array
    for(var i=0;i<16;i++){
        newArray[i]=0;
    }
    //choose 8 from 9 pic
    for(var i=0;i<8;i++){
        if(counter!==randNum){
            newArray[i]=availablePic[counter];
            newArray[i+8]=availablePic[counter];
            
            counter++;
        }else{
            counter++;
            newArray[i]=availablePic[counter];
            newArray[i+8]=availablePic[counter];
        }
    }  
    console.log(newArray);  
    //shuffle the array
    for(var i=0;i<100;i++){
      var rand1= Math.floor((Math.random() * 7) + 0);
      var rand2= Math.floor((Math.random() * 7) + 0);
      var temp=newArray[rand1];
      if(temp===0){
          console.log("rand1: "+rand1+" rand2: "+rand2+" temp "+temp);
            
      }
       //console.log("temp"+temp);
      //console.log("first"+newArray[rand1]);
      //console.log("second"+newArray[rand2]);
      newArray[rand1]=newArray[rand2];
      newArray[rand2]=temp;
    }
    console.log(newArray);
    
    $("#container").empty();
    var tempString="";
    for(var i=0;i<16;i++){
    tempString+="<div class=\"side\">";
    tempString+="<div class=\"front\"><img src=\"images/unfinished.png\"></div>";
    tempString+="<div class=\"back\"><img src=\"images/"+newArray[i]+".png\"></div>"
    tempString+="</div>";
    }
    //console.log(tempString);
    $("#container").append(tempString);
    //console.log("\nfinished\n");
    tempString="";
    
}


function newGame(){
    loadGrid();
    count = 600;
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
                                alert("congradulations！You win!");
                                inGame =false;
                                location.reload();
                            }
                            temp=0;
                    }
                
               }
             }
          };
      
    }
    }
    
    
 //Timer
    var count = 600;
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