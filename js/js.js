// JavaScript Document
window.onload=function(){	
	
  var swiper = new Swiper('.swiper-container',{
		spaceBetween: 20,
		nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination',  //生成小圆点
  		paginationClickable: true, //允许圆点点击
		loop:true,
		mousewheelControl: true,
		keyboardControl: true,
		effect: 'cube',
		direction: 'vertical'
	});
	
	
var oUl=document.getElementById('ul1');
	var aLi=oUl.children;
	var oBlock=document.getElementById('bl');
	var nowLeft=0;//记录一个激活位置
	var l=0;//记录blockLI	当前位置
	
	for(var i=0;i<aLi.length-1;i++){
		aLi[i].onmouseover=function(){
			move(oBlock,this.offsetLeft);	
		};	
		aLi[i].onmouseout=function(){
			move(oBlock,nowLeft);	
		};	
		aLi[i].onclick=function(){
			clearInterval(oBlock.timer);//点击后不要弹性
			oBlock.style.left=this.offsetLeft+'px';//点击后立马到位
			l=this.offsetLeft;//更新当前位置
			nowLeft=this.offsetLeft;//更新激活位置
		};
	}
	
	function move(obj,iTarget){
		var speed=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			speed+=(iTarget-obj.offsetLeft)/6;//加速度
			speed*=0.7;
			l= l + speed	//当前位置每次用l变量存起来
			obj.style.left=Math.round(l)+'px';
			
			
			if(iTarget==obj.offsetLeft && Math.abs(speed)<1){
				clearInterval(obj.timer);	
			}
			console.log(iTarget,obj.offsetLeft,speed);	
		},30);
	}	
	
	
//布局转换
var Ofadein_ol=document.getElementById('fadein_ol');
var aContent1=Ofadein_ol.children;
var aLi=document.getElementById('buju').children;
	var zIndex=1;
	//1.布局转换
	var aPos=[];
	for(var i=0;i<aLi.length;i++){
		aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aLi[i].offsetTop+'px';
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
		aLi[i].index=i;
	}
	//2.加事件,放大li
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			this.style.zIndex=zIndex++;	
			startMove(this,{width:150,height:150,lineHeight:150,marginLeft:-(150-120)/2,marginTop:-(150-120)/2});	
		};	
		aLi[i].onmouseout=function(){
			startMove(this,{width:120,height:120,lineHeight:120,marginLeft:0,marginTop:0});
			this.style.zIndex=0;				
		};
		
	
			
}

	
function moveOpacity(obj,attr,iTarget,time){
	var start=parseFloat(getStyle(obj,attr));
	var dis=iTarget-start;
	var count=time/30;
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var cur=start+n*dis/count;
		if(attr=='opacity'){
			obj.style.opacity=cur;
			obj.style.filter='alpha(opacity:'+cur*100+')';
		}else{
			obj.style[attr]=cur+'px';
		}
		if(n==count){
			clearInterval(obj.timer);
		}
	},30);
}
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}


//var aLi=document.getElementById('buju').children;
//alert(aContent.length)
var zIndex=1;

for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					moveOpacity(aContent1[i],'opacity',0,1000)	
				}
				moveOpacity(aContent1[index],'opacity',1,1000);	
			}
		})(i);
	}



};
