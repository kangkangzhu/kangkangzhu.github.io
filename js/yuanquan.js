	var oBigBall=document.getElementById('yuanquan');	
	var oBtn3=document.getElementById('yuan_btn');	
	var aSmallBall=document.getElementsByClassName('smallBall1');
		
	var r = oBigBall.offsetWidth/2;
	var bl=true;
	
	//创建多个小圆
	var count=5;
	for(var i=0;i<count;i++){
		var oSmallBall=document.createElement('div');
		oSmallBall.className='smallBall1';
		document.body.appendChild(oSmallBall);
		
		setPos3(oSmallBall,0);//i*(90/(count-1))	
		oSmallBall.rotate=0;
	}
	
	oBtn3.onclick=function(){
		alert(1)
		oBtn3.disabled=true;
		if(bl){
			//小圆去各自的角度上move.......
			for(var i=0;i<aSmallBall.length;i++){
				move3(aSmallBall[i],i*(90/(count-1)));	
			}
			oBtn3.value='-';
			bl=false;
		}else{
			//	小圆会到了0角度
			for(var i=0;i<aSmallBall.length;i++){
				move3(aSmallBall[i],0);	
			}
			oBtn3.value='+';
			bl=true;	
		}
	};
	
	function move3(obj,iTarget){
		var start=obj.rotate;
		var dis=iTarget-start;
		var count=300/30;
		var n=0;		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			//办事
			var a=1-n/count;
			var cur=start+dis*(1-a*a*a);
			
			setPos3(obj,cur);
			
			obj.rotate=cur;
			
			if(n==count){
				clearInterval(obj.timer);	
				oBtn3.disabled=false;
			}
		},30);
	}
	
	function setPos3(obj,ang){
		var a=Math.sin(a2r(ang))*r;
		var b=Math.cos(a2r(ang))*r;
		
		obj.style.left=oBigBall.offsetLeft+r+a+'px';
		obj.style.top=oBigBall.offsetTop+r-b+'px';	
	}
	
	function a2r(n){
		return n*Math.PI/180	
	}// JavaScript Document